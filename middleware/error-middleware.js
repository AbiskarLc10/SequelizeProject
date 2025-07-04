

const errorMiddleware = (err,_req,res,_next) =>{

  const message = err.msg || "Failed to complete the requested service";
  const statusCode = err.code || 500;
  const extraDetails = err.details || "Error Occurred";

  
  return res.status(statusCode).json({
    message,
    extraDetails,
    success:false 
  });
};

module.exports = errorMiddleware;