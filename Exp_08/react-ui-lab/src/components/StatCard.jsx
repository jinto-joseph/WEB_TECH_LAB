function StatCard({ title, value, icon, change, changeType }) {
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-icon">{icon || "📌"}</span>
        {change && (
          <span className={`card-badge ${changeType || "neutral"}`}>
            {change}
          </span>
        )}
      </div>
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
}

export default StatCard;