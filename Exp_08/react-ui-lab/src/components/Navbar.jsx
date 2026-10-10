function Navbar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <h2>EduDashboard</h2>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#tasks">Tasks</a>
      </div>

      <button className="profile-btn" onClick={onToggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;