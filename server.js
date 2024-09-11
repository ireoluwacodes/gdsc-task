const app = require("./config/app.config");
const { PORT } = require("./config/constants.config");
const { ConnectDb } = require("./config/db.config");

const startApp = async () => {
  console.log("Attempting db connection...");
  await ConnectDb();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startApp();
