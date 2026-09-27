import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./AuthPage.css";
import { UserRole } from "../enums/user-role";
import type { RegisterRequest } from "../models/auth-user";

function getStrength(pw: string): 0 | 1 | 2 | 3 | 4 {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as 0 | 1 | 2 | 3 | 4;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_CLASS: Record<number, string> = {
  1: "auth-strength__bar--weak",
  2: "auth-strength__bar--fair",
  3: "auth-strength__bar--good",
  4: "auth-strength__bar--strong",
};

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = getStrength(password);
  const isValid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 6;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true);
    setError(null);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role: UserRole.USER,
      } as RegisterRequest);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <span className="auth-brand__mark" aria-hidden="true" />
          <span className="auth-brand__name">ShopSphere</span>
        </div>

        <h1 className="auth-heading">Create an account</h1>
        <p className="auth-subheading">
          Join ShopSphere — discover, collect, and shop with ease.
        </p>

        {error && (
          <div className="auth-error" role="alert">
            <span aria-hidden="true">⚠</span>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="auth-field">
            <label htmlFor="reg-name">Full name</label>
            <div className="auth-field-input-wrap">
              <span className="auth-field-icon" aria-hidden="true">
                👤
              </span>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                placeholder="Jordan Ruiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="reg-email">Email address</label>
            <div className="auth-field-input-wrap">
              <span className="auth-field-icon" aria-hidden="true">
                ✉
              </span>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="reg-password">Password</label>
            <div className="auth-field-input-wrap">
              <span className="auth-field-icon" aria-hidden="true">
                🔒
              </span>
              <input
                id="reg-password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="auth-field-eye"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
            {password && (
              <>
                <div className="auth-strength" aria-hidden="true">
                  {[1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className={`auth-strength__bar${strength >= lvl ? ` ${STRENGTH_CLASS[strength]}` : ""}`}
                    />
                  ))}
                </div>
                <span className="auth-strength__label">
                  {STRENGTH_LABELS[strength]}
                </span>
              </>
            )}
          </div>

          <button
            id="register-submit"
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={!isValid || loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
