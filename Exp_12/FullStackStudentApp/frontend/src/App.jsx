import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/students";
const emptyStudent = { regNo: "", name: "", department: "", email: "", cgpa: "" };

function App() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(emptyStudent);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadStudents() {
        try {
            setLoading(true);
            const response = await axios.get(API);
            setStudents(response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not load student records.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadStudents(); }, []);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API}/${editingId}`, form);
                setMessage("Student updated successfully.");
            } else {
                await axios.post(API, { ...form, cgpa: Number(form.cgpa) });
                setMessage("Student added successfully.");
            }
            setForm(emptyStudent);
            setEditingId(null);
            await loadStudents();
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not save the student.");
        }
    }

    function editStudent(student) {
        setForm({
            regNo: student.regNo,
            name: student.name,
            department: student.department,
            email: student.email || "",
            cgpa: student.cgpa ?? ""
        });
        setEditingId(student._id);
        setMessage("Editing selected student.");
    }

    async function deleteStudent(id) {
        if (!window.confirm("Delete this student record?")) return;
        try {
            await axios.delete(`${API}/${id}`);
            setMessage("Student deleted successfully.");
            await loadStudents();
        } catch (error) {
            setMessage(error.response?.data?.message || "Could not delete the student.");
        }
    }

    return (
        <main className="page">
            <header className="hero">
                <p className="eyebrow">EXPERIMENT 12 · FULL STACK CRUD</p>
                <h1>Student Management System</h1>
                <p>ReactJS frontend · Express REST API · MongoDB database</p>
            </header>

            <section className="panel">
                <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
                <form onSubmit={handleSubmit} className="student-form">
                    {[
                        ["regNo", "Register number", "text"],
                        ["name", "Student name", "text"],
                        ["department", "Department", "text"],
                        ["email", "Email", "email"],
                        ["cgpa", "CGPA", "number"]
                    ].map(([name, label, type]) => (
                        <label key={name}>
                            {label}
                            <input name={name} type={type} step={name === "cgpa" ? "0.01" : undefined}
                                min={name === "cgpa" ? "0" : undefined} max={name === "cgpa" ? "10" : undefined}
                                value={form[name]} onChange={handleChange} required={name !== "email"} />
                        </label>
                    ))}
                    <div className="form-actions">
                        <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
                        {editingId && <button type="button" className="muted" onClick={() => { setForm(emptyStudent); setEditingId(null); }}>Cancel</button>}
                    </div>
                </form>
                {message && <p className="message" role="status">{message}</p>}
            </section>

            <section className="panel">
                <div className="list-heading"><h2>Student Records</h2><button className="muted" onClick={loadStudents}>Refresh</button></div>
                {loading ? <p>Loading records...</p> : students.length === 0 ? <p>No student records found.</p> : (
                    <div className="table-wrap">
                        <table>
                            <thead><tr><th>Register No.</th><th>Name</th><th>Department</th><th>Email</th><th>CGPA</th><th>Actions</th></tr></thead>
                            <tbody>{students.map(student => (
                                <tr key={student._id}>
                                    <td>{student.regNo}</td><td>{student.name}</td><td>{student.department}</td>
                                    <td>{student.email || "—"}</td><td>{student.cgpa}</td>
                                    <td className="actions"><button onClick={() => editStudent(student)}>Edit</button><button className="danger" onClick={() => deleteStudent(student._id)}>Delete</button></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default App;
