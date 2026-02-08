import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/backEndServices";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
            setError("Email and passwords are required");
            return;
        }

        if (user.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        const response = await signUp(user, dispatch)
        if (response.error) {
            setError(response.error)
            setLoading(false)
            return
        }
        navigate("/login")


    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-7 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-gradient"
                                    style={{ width: 56, height: 56 }}
                                >
                                    <i className="fa-solid fa-user-plus text-white fs-4" />
                                </div>
                                <h1 className="h4 mt-3 mb-1">Create account</h1>
                                <p className="text-muted mb-0">Register with your email and password</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-envelope" />
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="tu@email.com"
                                            value={user.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            name="email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-key" />
                                        </span>
                                        <input
                                            type={showPass ? "text" : "password"}
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={user.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            required
                                            name="password"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPass((s) => !s)}
                                            aria-label={showPass ? "Hide password" : "Show password"}
                                        >
                                            <i className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`} />
                                        </button>
                                    </div>
                                    <div className="form-text">Use at least 6 characters.</div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">
                                    <label className="form-label">Confirm password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-lock" />
                                        </span>
                                        <input
                                            type={showConfirmPass ? "text" : "password"}
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={user.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            required
                                            name="confirmPassword"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowConfirmPass((s) => !s)}
                                            aria-label={showConfirmPass ? "Hide password" : "Show password"}
                                        >
                                            <i
                                                className={`fa-solid ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2 fw-semibold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="d-inline-flex align-items-center gap-2">
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Creating...
                                        </span>
                                    ) : (
                                        "Create account"
                                    )}
                                </button>

                                <div className="d-flex justify-content-between mt-3 small">
                                    <Link to="/login" className="link-secondary text-decoration-none">
                                        Already have an account?
                                    </Link>
                                    <a href="/" className="link-secondary text-decoration-none">
                                        Back to home
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
