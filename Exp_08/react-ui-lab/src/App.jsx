import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const courses = [
    "Web Technology",
    "Database Management",
    "Machine Learning",
    "Computer Networks",
  ];

  function addTask() {
    if (task.trim() === "") return;

    setTasks([...tasks, task.trim()]);
    setTask("");
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="dashboard" id="home">
        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Here is your academic overview.</p>
        </section>

        <section className="cards">
          <StatCard title="Courses" value="6" />
          <StatCard title="Assignments" value="12" />
          <StatCard title="Attendance" value="92%" />
          <StatCard title="CGPA" value="8.7" />
        </section>

        <section className="course-section" id="courses">
          <h2>My Courses</h2>

          <div className="course-list">
            {courses.map((course) => (
              <div className="course-item" key={course}>
                {course}
              </div>
            ))}
          </div>
        </section>

        <section className="task-section" id="tasks">
          <h2>Add Task</h2>

          <div className="task-form">
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTask();
              }}
            />

            <button onClick={addTask}>Add</button>
          </div>

          <ul className="task-list">
            {tasks.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;