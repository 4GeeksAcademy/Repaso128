import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/backEndServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { WelcomeModal } from "../components/WelcomeModal";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showWelcomeModal, setShowWelcomeModal] = useState(false)
    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!user.email.trim() || !user.password.trim()) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        const response = await login(user, dispatch)
        if (response.error) {
            setError(response.error)
            setLoading(false)
            return
        }

        const hasUsername = response.user?.username;
       

        dispatch({ type: "auth_login", payload: { token: response.token } });

        if (!hasUsername) {
            setShowWelcomeModal(true)
            setLoading(false)
            return
        }
        dispatch({ type: "auth_set_user", payload: response.user });
        navigate("/")

    };

    return (
        <div className="container py-5">
            {showWelcomeModal &&
                <WelcomeModal show={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />
            }
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-7 col-lg-5">
                    <div className="card border-0 shadow-lg rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-gradient"
                                    style={{ width: 56, height: 56 }}
                                >
                                    <i className="fa-solid fa-user-lock text-white fs-4" />
                                </div>
                                <h1 className="h4 mt-3 mb-1">Login</h1>
                                <p className="text-muted mb-0">
                                    Login with your email and password
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                                            autoComplete="current-password"
                                            required
                                            name="password"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPass((s) => !s)}
                                            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        >
                                            <i className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`} />
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
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Entrando...
                                        </span>
                                    ) : (
                                        "Entrar"
                                    )}
                                </button>

                                <div className="d-flex justify-content-between mt-3 small">
                                    <Link to={"/signup"} className="link-secondary text-decoration-none">
                                        Create Account
                                    </Link>
                                    <a href="#" className="link-secondary text-decoration-none">
                                        Forgot your password?
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
