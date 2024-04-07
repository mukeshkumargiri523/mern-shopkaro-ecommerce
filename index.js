import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import authRouter from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import productRouter from "./router/productRouter.js";
import cors from "cors";
import multer from "multer";
import pdfFileModel from "./models/pdfFileModel.js";
import path from "path";
import { fileURLToPath } from "url";

//dotenv config
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database connection
connectDB();

//middleware
app.use(express.static(path.join(__dirname, "./ecomm_client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(morgan("dev"));
app.use(cors());
app.use("/files", express.static("files"));

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

//rest api
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./ecomm_client/build/index.html"));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-pdf", upload.single("file"), async (req, res) => {
  try {
    const pdfName = req.body.pdfName;
    const orderId = req.body.orderId;
    const fileName = req.file.filename;

    const pdfData = new pdfFileModel({
      pdfName,
      pdf: fileName,
      orderId,
    });
    let newPdfData = await pdfData.save();
    if (newPdfData) {
      res.status(200).send({
        success: true,
        pdfData: newPdfData,
        message: "Uploading Pdf Successfully",
      });
    } else {
      res.status(400).send("Only one pdf for one order");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error while uploading Pdf",
    });
  }
});
app.get("/get-pdf-file/:oid", async (req, res) => {
  try {
    const id = req.params.oid;
    if (!id) {
      return res.status(400).send("pdf id is required to get");
    }
    const pdfData = await pdfFileModel.findOne({
      orderId: id,
    });
    if (pdfData) {
      return res.status(200).send({
        success: true,
        pdfData,
        message: "Found Pdf Successfully",
      });
    } else {
      return res.status(400).send("No Pdf found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "Error while finding Pdf",
    });
  }
});

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce server",
  });
});

const PORT = process.env.PORT || 8080;

// authRouter;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
