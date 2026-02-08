import { useEffect, useState } from "react";
import { editProfile } from "../services/backEndServices";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const WelcomeModal = ({
    show,
    onClose,
}) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate()

    useEffect(() => {
        if (show) {
            setUsername("");
            setError("");
            setSaving(false);
        }
    }, [show]);

    if (!show) return null;

    const handleSave = async () => {
        setError("");

        const clean = username.trim();
        if (!clean) {
            setError("Please choose a username.");
            return;
        }

        setSaving(true);
        const response = await editProfile({ username })
        if (response.error) {
            setError(response.error)
            setSaving(false)
            return
        }
        dispatch({ type: "auth_set_user", payload: response });
        navigate("/")
        onClose()


    };

    const handleClose = () => {
        console.log("cierra");
        dispatch({ type: "auth_logout" })
        onClose();
    };

    return (
        <>
            <div
                className="modal fade show"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title">
                                <i className="fa-solid fa-hand-sparkles me-2 text-primary"></i>
                                Welcome!
                            </h5>


                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleClose}
                                disabled={saving}
                            />

                        </div>

                        <div className="modal-body pt-2">
                            <p className="text-muted mb-3">
                                Since this is your first time logging in, please choose a{" "}
                                <strong>username</strong> so we can identify you in the app.
                            </p>

                            {error && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {error}
                                </div>
                            )}

                            <label className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-at"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. juanperez"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    disabled={saving}
                                />
                            </div>
                        </div>

                        <div className="modal-footer border-0 pt-0">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <span className="d-inline-flex align-items-center gap-2">
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Saving...
                                    </span>
                                ) : (
                                    "Save username"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
