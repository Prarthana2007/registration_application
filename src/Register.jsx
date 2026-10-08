import { useState } from 'react';
import { findUser, hashPassword, saveUser } from './auth';

const initialForm = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState(initialForm);
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
    const fullName = formData.fullName.trim();
    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();

    if (!fullName) {
      nextErrors.fullName = 'Full name is required.';
    }

    if (!username) {
      nextErrors.username = 'Username is required.';
    } else if (username.length < 3 || username.length > 20) {
      nextErrors.username = 'Username must be 3 to 20 characters long.';
    }

    if (!email) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must contain at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    const existingUserByEmail = findUser(email);
    if (email && existingUserByEmail && existingUserByEmail.email?.toLowerCase() === email) {
      nextErrors.email = 'This email is already registered.';
    }

    const existingUserByUsername = findUser(username);
    if (username && existingUserByUsername && existingUserByUsername.username?.toLowerCase() === username.toLowerCase()) {
      nextErrors.username = 'This username is already taken.';
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

    const newUser = {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      passwordHash: hashPassword(formData.password),
    };

    saveUser(newUser);
    setIsSubmitting(false);
    setFormData(initialForm);
    onRegisterSuccess(`Registration successful for ${newUser.fullName}. Please log in.`);
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <span className="eyebrow">New student</span>
        <h2>Create account</h2>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="register-full-name">Full Name</label>
          <input
            id="register-full-name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && (
            <p className="field-error" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            aria-invalid={Boolean(errors.username)}
          />
          {errors.username && (
            <p className="field-error" role="alert">
              {errors.username}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
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
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <p className="field-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="register-confirm-password">Confirm Password</label>
          <input
            id="register-confirm-password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <p className="field-error" role="alert">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="switch-copy">
        Already have an account?{' '}
        <button type="button" className="text-button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
