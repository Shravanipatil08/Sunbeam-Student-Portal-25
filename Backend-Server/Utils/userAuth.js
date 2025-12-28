const jwt = require("jsonwebtoken");
const SECRET = require("./secret");
function authenticationUser(req, res, next) {
  //at every request this func is called so to authorize by role we use request [headers]
  //next is used to called next middleware func
  let token = req.headers.token;
  if (token) {
    let payload = jwt.verify(token, SECRET); //decrypt token

    req.headers.email = payload.email;
    req.headers.role = payload.role;
    next();
  } else {
    res.send("token not found");
  }
}

function authorizedUser(req, res, next) {
  let role = req.headers.role;
  if (role == "admin") {
    return next();
  } else {
    return res.send("you are not have permission to do so");
  }

  console.log(role);
  next();
}

module.exports = { authenticationUser, authorizedUser };
//token-
//1] headers = token pass kartoy
//2] payload = data to put in token
//3] secret  = for key
