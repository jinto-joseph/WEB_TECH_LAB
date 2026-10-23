const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdb";

app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema(
    {
        regNo: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        email: { type: String, trim: true, lowercase: true },
        cgpa: { type: Number, min: 0, max: 10 }
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

app.get("/", (_req, res) => {
    res.json({ message: "Experiment 12 student API is running" });
});

app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/students", async (_req, res) => {
    try {
        res.json(await Student.find().sort({ createdAt: -1 }));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function start() {
    try {
        await mongoose.connect(mongoUri);
        app.listen(port, () => {
            console.log(`Student API running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exitCode = 1;
    }
}

start();
