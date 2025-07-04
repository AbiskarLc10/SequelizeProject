const {
  createMongoAbility,
  AbilityBuilder,
  Abilities,
  buildMongoQueryMatcher,
} = require("@casl/ability");
const { $lte, lte } = require("@ucast/mongo2js");

const conditionsMatcher = buildMongoQueryMatcher({ $lte }, { lte });

const defineAbilityFor = (permissions) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  can(permissions.action, permissions.subject, {
    amount: { $lte: permissions.conditions.amount },
    days: { $lte: permissions.conditions.days },
  });
  return build({ conditionsMatcher });
};

const checkTransactionPermission = async (req, res, next) => {
  try {
    // 1. Define permissions (usually fetched from a database)
    const permissions = {
      action: "read",
      subject: "Transaction", // Subject type (e.g., matches Mongoose model name)
      conditions: {
        amount: { $lte: 10000 },
        days: { $lte: 3 },
      },
    };

    // 2. Parse request parameters
    const amount = parseFloat(req.query.amount);
    const days = parseInt(req.query.days, 10);

    if (isNaN(amount) || isNaN(days)) {
      return res.status(400).json({
        message: "Invalid 'amount' or 'days' parameter.",
      });
    }

    // 3. Create the subject object
    const transactionSubject = {
      type: "Transaction", // Must match permission's subject type
      amount, // Directly included (not nested)
      days,
    };

    // 4. Initialize ability and check permission
    const ability = defineAbilityFor(permissions);
    const isAllowed = ability.can("read", transactionSubject);

    console.log("CASL Rules:", ability.rules); // Debug: Check loaded rules
    console.log("Subject:", transactionSubject); // Debug: Verify subject

    if (isAllowed) {
      next();
    } else {
      res.status(403).json({
        message: "Forbidden: Transaction exceeds allowed limits.",
      });
    }
  } catch (error) {
    console.error("Permission check error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = checkTransactionPermission;
