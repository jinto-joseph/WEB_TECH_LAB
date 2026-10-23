# Experiment 12 — Full Stack Student Management

## Aim

To build a full-stack student management application using ReactJS, NodeJS,
ExpressJS, MongoDB, Mongoose, and Axios, with complete CRUD functionality.

## Project structure

```text
Exp_12/
├── index.html
└── FullStackStudentApp/
    ├── backend/
    │   ├── package.json
    │   └── server.js
    └── frontend/
        ├── package.json
        ├── index.html
        └── src/
            ├── App.jsx
            └── App.css
```

## Requirements

- Node.js and npm
- MongoDB running at `mongodb://127.0.0.1:27017`
- A web browser

## Run the application

Open two terminals.

### Backend

```bash
cd Exp_12/FullStackStudentApp/backend
npm install
npm start
```

The API runs at `http://localhost:5000`.

### Frontend

```bash
cd Exp_12/FullStackStudentApp/frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally
`http://localhost:5173`.

The application stores records in the `studentdb.students` MongoDB collection.

## CRUD mapping

| Operation | Method | Endpoint |
| --- | --- | --- |
| Create | POST | `/students` |
| Read | GET | `/students` |
| Update | PUT | `/students/:id` |
| Delete | DELETE | `/students/:id` |

## Result

A full-stack student management application was developed successfully. It
supports adding, viewing, editing, and deleting student records stored in
MongoDB.
