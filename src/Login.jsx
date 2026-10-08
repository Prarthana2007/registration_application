import { useState } from 'react';
import { findUser, hashPassword, saveSession } from './auth';

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const storedUser = findUser(formData.email.trim().toLowerCase());

    if (!storedUser) {
      setErrors({ email: 'No account found for this email.' });
      setIsSubmitting(false);
      return;
    }

    const enteredPasswordHash = hashPassword(formData.password);

    if (storedUser.passwordHash !== enteredPasswordHash) {
      setErrors({ password: 'Incorrect password. Please try again.' });
      setIsSubmitting(false);
      return;
    }

    const sessionSaved = saveSession({
      fullName: storedUser.fullName,
      username: storedUser.username,
      email: storedUser.email,
    });

    if (!sessionSaved) {
      setErrors({ password: 'Unable to start your session. Please try again.' });
      setIsSubmitting(false);
      return;
    }

    onLoginSuccess({
      fullName: storedUser.fullName,
      username: storedUser.username,
      email: storedUser.email,
      accountStatus: 'Active',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <span className="eyebrow">Welcome back</span>
        <h2>Student login</h2>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <p className="field-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="switch-copy">
        Don&apos;t have an account?{' '}
        <button type="button" className="text-button" onClick={onSwitchToRegister}>
          Create one
        </button>
      </p>
    </div>
  );
}

export default Login;
