const jwt = require("jsonwebtoken");

module.exports = (request,response,next) => {
  try{
    const token = request.headers.authorization;
    jwt.verify(token , "TO_YEET_OR_TO_YEEHAW");

    next();
  } catch (error){
    response.send({
      message : "not authorized"
    });
  }
}
