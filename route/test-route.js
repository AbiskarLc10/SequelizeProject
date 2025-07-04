const express = require("express");
const router = express.Router();
const checkTransactionPermission = require("../middleware/checkPermission");

router
  .route("/getTransactions")
  .get(
    checkTransactionPermission,
    async (req, res, next) => {
      return res.status(200).json({ message: "Hello guys" });
    }
  );

module.exports = router;
