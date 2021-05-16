const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser")
swaggerDocument = require("./swaggerDocs.json");

const app = express();
// app.use(cors());

// PORT AND HOST
const PORT = process.env.PORT || 5000;
const HOST = "http://localhost";

// Connect to DB
connectDB();

// CORS handler
const corsOptions = {
        // origin: process.env.ALLOWED_CLIENTS.split(",")
        origin: [
            "http://localhost:3000/",
            "http://localhost:5500/",
            "http://127.0.0.1:5500/",
            "http://127.0.0.1:3000/",
        ]
    }
app.use(cors());

// body perser
// app.use(express.json());
app.use(bodyParser.json());

// file type MIME
app.use(express.static("public"));

// template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes

// upload file
app.use("/api/files", require("./routes/files"));

// viewFile
app.use("/files", require("./routes/viewFile"));

// donwloadFile
app.use("/files/download", require("./routes/downloadFile"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server Up and Running on ${HOST}:${PORT}`);
})