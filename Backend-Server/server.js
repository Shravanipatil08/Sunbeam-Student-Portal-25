const express = require("express"); //imported express
const app = express(); //This line creates an Express application object.

//This line imports the public routes module and stores it in publicRouter.
const publicRouter = require("./Routes/Public");

//This line imports the Admin routes module and stores it in adminRouter.
const adminRouter = require("./Routes/Admin");

app.use(express.json());

app.use("/public", publicRouter);
app.use("/admin",  adminRouter);

app.listen(4000, () => {
  console.log("Server started on port 4000 .......");
});
