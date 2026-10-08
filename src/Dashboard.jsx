function Dashboard({ user, onLogout }) {
  const metrics = [
    { label: 'Courses', value: '6 Active', icon: '📚' },
    { label: 'Assignments', value: '3 Due', icon: '📝' },
    { label: 'Attendance', value: '92%', icon: '✅' },
    { label: 'Notifications', value: '7 New', icon: '🔔' },
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow dashboard-eyebrow">Student portal</p>
          <h1>Welcome back, {user?.fullName || 'Student'}!</h1>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="profile-summary card">
        <div>
          <p className="summary-label">Student profile</p>
          <h2>{user?.fullName || 'Student Name'}</h2>
        </div>
        <div className="profile-meta">
          <div>
            <span>Email</span>
            <strong>{user?.email || 'student@college.edu'}</strong>
          </div>
          <div>
            <span>Username</span>
            <strong>{user?.username || 'student-name'}</strong>
          </div>
          <div>
            <span>Account status</span>
            <strong className="status-badge">Active</strong>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Student overview cards">
        {metrics.map((item) => (
          <article className="stat-card card" key={item.label}>
            <div className="stat-icon" aria-hidden="true">
              {item.icon}
            </div>
            <div>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </div>
          </article>
        ))}
      </section>

      <section className="activity-panel card">
        <div className="panel-heading">
          <h3>Recent activity</h3>
          <span>Today</span>
        </div>

        <ul className="activity-list">
          <li>
            <span className="dot dot-blue" aria-hidden="true"></span>
            Web Development lab submitted successfully.
          </li>
          <li>
            <span className="dot dot-purple" aria-hidden="true"></span>
            Seminar registration reminder for Friday.
          </li>
          <li>
            <span className="dot dot-green" aria-hidden="true"></span>
            Attendance marked for Computer Graphics class.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Dashboard;
