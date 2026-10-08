import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import { clearSession, getSession } from './auth';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const sessionUser = getSession();

    if (sessionUser) {
      setCurrentUser({
        fullName: sessionUser.fullName || 'Student',
        username: sessionUser.username || '',
        email: sessionUser.email || '',
        accountStatus: 'Active',
      });
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    setNotification('');
  };

  const handleRegisterSuccess = (message) => {
    setCurrentPage('login');
    setCurrentUser(null);
    setNotification(message);
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    setCurrentPage('login');
    setNotification('');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup" aria-label="StudentConnect brand">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-name">StudentConnect</p>
            <span>Campus portal</span>
          </div>
        </div>

        {currentPage === 'dashboard' ? (
          <button type="button" className="nav-pill active" aria-label="Dashboard page">
            Dashboard
          </button>
        ) : (
          <button type="button" className="nav-pill" onClick={() => setCurrentPage('login')}>
            Login
          </button>
        )}
      </header>

      {currentPage === 'dashboard' ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <main className="auth-page">
          <div className="auth-layout">
            <section className="feature-panel" aria-label="Student connect overview">
              <div className="feature-badge">StudentSuccess</div>
              <h1>Stay connected to your academic life.</h1>
              <p>
                Track courses, assignments, and campus updates from one clear student dashboard.
              </p>

              <div className="feature-list" aria-label="Student portal advantages">
                <div>
                  <span>📘</span>
                  <p>Course access</p>
                </div>
                <div>
                  <span>🧠</span>
                  <p>Smart planning</p>
                </div>
                <div>
                  <span>🎓</span>
                  <p>Academic support</p>
                </div>
              </div>
            </section>

            <section className="form-panel" aria-label="Authentication section">
              {notification && (
                <div className="global-success" role="status">
                  {notification}
                </div>
              )}

              {currentPage === 'login' ? (
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => {
                    setCurrentPage('register');
                    setNotification('');
                  }}
                />
              ) : (
                <Register
                  onRegisterSuccess={handleRegisterSuccess}
                  onSwitchToLogin={() => {
                    setCurrentPage('login');
                    setNotification('');
                  }}
                />
              )}
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
