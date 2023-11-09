const bodyParser = require('body-parser');
const user = require("./UserRoutes")
const photo = require("./PhotoRoutes")

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false })
  );
  app.use("/api/users", user)
  app.use("/api/photos", photo)
};