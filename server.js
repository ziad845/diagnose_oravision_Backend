import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "Diagnosis Backend Online ",
  });
});

/* ================= Predict ================= */
app.post("/predict", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const form = new FormData();

    const blob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    form.append("file", blob, req.file.originalname);

    const response = await fetch(
      "https://ahmedshaker230-tooth-api.hf.space/predict-gradcam",
      {
        method: "POST",
        body: form,
      },
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log("Predict Error:", error);

    res.status(500).json({
      error: "Predict Error",
      details: error.message,
    });
  }
});

/* ================= GradCAM ================= */
app.post("/predict-gradcam", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const form = new FormData();

    const blob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    form.append("file", blob, req.file.originalname);

    const response = await fetch(
      "https://ahmedshaker230-tooth-api.hf.space/predict-gradcam",
      {
        method: "POST",
        body: form,
      },
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log("GradCAM Error:", error);

    res.status(500).json({
      error: "GradCAM Error",
      details: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found",
  });
});

/* ================= Start ================= */
app.listen(PORT, () => {
  console.log(` Running on http://localhost:${PORT}`);
});
