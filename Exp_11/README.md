# 🧪 Experiment 11 — Database Integration in NodeJS Application using MongoDB

> **Course:** Web Technology Lab  
> **Experiment No.:** 11  

---

## 📌 Objective

To develop a Node.js web application that connects to a MongoDB database using the Mongoose ODM library and performs Create, Read, Update, and Delete (CRUD) operations on student records via an Express.js REST API.

---

## 🌐 Live Demo

🔗 **[Open Live Student CRUD & REST API Client](https://abin-shaji-thomas.github.io/Web-Technology-Lab/Experiment-11/Ex-11.html)**

---

## 📝 Exercises

| # | Exercise | Topic | File |
|---|----------|-------|------|
| 1 | Student Database CRUD & REST Explorer | Express.js REST API, Mongoose Schema/Model, CRUD endpoints (`POST`, `GET`, `PUT`, `DELETE`), HTTP status codes | [Ex-11.html](./Ex-11.html) |

---

## 🛠️ REST API Endpoints

| Method | Endpoint | Description | Expected Status |
|--------|----------|-------------|-----------------|
| `POST` | `/students` | Create and insert a new student document | `201 Created` |
| `GET` | `/students` | Retrieve and display all student documents | `200 OK` |
| `GET` | `/students/:regNo` | Retrieve a single student by register number | `200 OK` / `404 Not Found` |
| `PUT` | `/students/:regNo` | Update existing student details | `200 OK` / `404 Not Found` |
| `DELETE` | `/students/:regNo` | Remove student record from collection | `200 OK` / `404 Not Found` |

---

## 📁 Folder Structure

```
Experiment-11/
│
├── README.md                                          ← This file
├── Ex-11.html                                         ← Interactive Student CRUD & API Client UI
├── index.html                                         ← Mirror of Ex-11.html
├── app.js                                             ← Express.js REST API server with Mongoose
├── package.json                                       ← Project metadata & dependencies
└── Experiment_11_NodeJS_MongoDB 23cs2049.docx         ← Lab manual
```

---

## 🚀 How to Run Locally

1. **Navigate to the experiment directory:**
   ```bash
   cd Experiment-11
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local MongoDB instance:**
   ```bash
   sudo systemctl start mongod
   ```

4. **Launch the Express REST API server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000/
   ```

---

## ➕ How to Add a New File

See the guide in [Experiment 1 README](../Experiment-1/README.md#-how-to-add-a-new-file) — same steps apply (just change `1` → `11` in filenames and commit messages).

---

## 🔗 Back to Main Lab

[← Return to Main README](../README.md)
