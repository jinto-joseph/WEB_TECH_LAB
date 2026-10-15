import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Web Tech Exp 8 Record (React Components)", completed: true },
    { id: 2, text: "Explore React useState & Props hierarchy", completed: false },
    { id: 3, text: "Deploy updated portfolio to GitHub Pages", completed: false },
  ]);

  const courses = [
    {
      code: "23CS2049",
      name: "Web Technology Lab",
      credits: 2,
      instructor: "Faculty of CSE",
      progress: 90,
      badge: "In Progress",
    },
    {
      code: "23CS2031",
      name: "Database Management Systems",
      credits: 3,
      instructor: "Faculty of CSE",
      progress: 85,
      badge: "Core Subject",
    },
    {
      code: "23CS2055",
      name: "Machine Learning Foundations",
      credits: 4,
      instructor: "Faculty of AI/DS",
      progress: 75,
      badge: "Advanced",
    },
    {
      code: "23CS2042",
      name: "Computer Networks & Protocols",
      credits: 3,
      instructor: "Faculty of CSE",
      progress: 80,
      badge: "Core Subject",
    },
  ];

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="dashboard" id="home">
        {/* Welcome Section */}
        <section className="welcome">
          <div className="welcome-text">
            <h1>Welcome Back, Jinto! 👋</h1>
            <p>
              Register No: <strong>URK24CS1210</strong> &bull; Semester V &bull; Academic Overview &amp; Task Center
            </p>
          </div>
          <div className="welcome-badge">
            <span className="pulse-dot"></span>
            Semester V Active
          </div>
        </section>

        {/* Statistics Metric Cards */}
        <section className="cards">
          <StatCard
            icon="📚"
            title="Enrolled Courses"
            value="4"
            change="Semester V"
            changeType="neutral"
          />
          <StatCard
            icon="📝"
            title="Assignments"
            value="12"
            change="+3 Pending"
            changeType="warning"
          />
          <StatCard
            icon="📊"
            title="Attendance"
            value="92%"
            change="+2% This Month"
            changeType="positive"
          />
          <StatCard
            icon="🏆"
            title="Current CGPA"
            value="8.7"
            change="Top 10%"
            changeType="positive"
          />
        </section>

        {/* Courses Section */}
        <section className="course-section" id="courses">
          <div className="section-header">
            <div>
              <h2>My Registered Courses</h2>
              <p className="section-subtitle">Active subjects for the current semester cycle</p>
            </div>
            <span className="count-pill">{courses.length} Active Courses</span>
          </div>

          <div className="course-list">
            {courses.map((course) => (
              <div className="course-item" key={course.code}>
                <div className="course-item-header">
                  <span className="course-code">{course.code}</span>
                  <span className="course-badge">{course.badge}</span>
                </div>
                <h3>{course.name}</h3>
                <p className="course-instructor">👨‍🏫 {course.instructor}</p>
                <div className="course-footer">
                  <span className="course-credits">⚡ {course.credits} Credits</span>
                  <span className="course-progress-text">{course.progress}% Completed</span>
                </div>
                <div className="course-progress-bar">
                  <div
                    className="course-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Task Planner */}
        <section className="task-section" id="tasks">
          <div className="section-header">
            <div>
              <h2>Academic Task Planner</h2>
              <p className="section-subtitle">Manage daily assignments, viva preparations, and lab deadlines</p>
            </div>
            <span className="count-pill">
              {tasks.filter((t) => t.completed).length} / {tasks.length} Done
            </span>
          </div>

          <div className="task-form">
            <input
              type="text"
              placeholder="e.g. Prepare for Web Tech Lab Record submission..."
              value={task}
              onChange={(event) => setTask(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTask();
              }}
              aria-label="New task input"
            />
            <button onClick={addTask} className="add-task-btn">
              <span>+ Add Task</span>
            </button>
          </div>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <li className="task-empty">
                🎉 All tasks completed! Add a new task above.
              </li>
            ) : (
              tasks.map((item) => (
                <li
                  key={item.id}
                  className={item.completed ? "task-row completed" : "task-row"}
                >
                  <label className="task-checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTask(item.id)}
                    />
                    <span className="checkmark"></span>
                    <span className="task-title">{item.text}</span>
                  </label>
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="delete-task-btn"
                    title="Delete task"
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>
          23CS2049 Web Technology Lab &bull; Register No: <strong>URK24CS1210</strong> &bull; Karunya Institute of Technology and Sciences
        </p>
      </footer>
    </div>
  );
}

export default App;