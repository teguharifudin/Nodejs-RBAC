const { expressjwt } = require('express-jwt');
const config = require("../config.json");
const db = require("../helpers/db");
function jwt(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  const secret = config.secret;
  return [
    expressjwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      const user = await db.User.findById(req.auth.sub);
      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json({ message: "Only Admin is Authorized!" });
      }
      req.auth.role = user.role;
      next();
    },
  ];
}
module.exports = jwt;