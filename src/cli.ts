const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
app.use(express.json());
const cors = require("cors");
const {PORT} = require("./utils/config");
const {connectToDatabase} = require("./utils/db");
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

   

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();

