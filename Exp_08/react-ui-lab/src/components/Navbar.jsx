function Navbar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-icon">🎓</span>
        <div className="brand-text">
          <h2>EduDashboard</h2>
          <span className="badge-react">React 19</span>
        </div>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#tasks">Tasks</a>
        <a href="../../index.html" className="portfolio-link" title="Back to Lab Portfolio">
          ← Portfolio Hub
        </a>
      </div>

      <button
        className="profile-btn"
        onClick={onToggleTheme}
        aria-label="Toggle theme mode"
      >
        <span>{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
      </button>
    </nav>
  );
}

export default Navbar;