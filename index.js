const express = require("express");
const app = express();
const connectDB = require("./dbconnect/db.connect");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const projectRoute = require("./routes/project.route");
const assignmentRoute = require("./routes/assignment.route");

require("dotenv").config();
app.use(cors());
app.use(express.json());
connectDB();

const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/users", userRoute);
app.use("/api", projectRoute);
app.use("/api", assignmentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
