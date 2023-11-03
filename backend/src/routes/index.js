const bodyParser = require('body-parser');
const user = require("./UserRoutes")

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false })
  );
  app.use("/api/users", user)
};