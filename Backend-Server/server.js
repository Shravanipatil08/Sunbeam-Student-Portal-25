const express = require("express"); //imported express
const app = express(); //This line creates an Express application object.

//This line imports the public routes module and stores it in publicRouter.
const publicRouter = require("./Routes/Public");

app.use(express.json());

app.use("/public", publicRouter);

app.listen(4000, () => {
  console.log("Server started on port 4000 .......");
});
