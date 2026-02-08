import storeReducer from "../store";

export const verifyToken = async (token, dispatch) => {
  if (!token) {
    dispatch({ type: "auth_set_user", payload: null });
    return;
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/get_user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    dispatch({ type: "auth_logout" });
    return;
  }
  const user = await response.json();
  dispatch({ type: "auth_set_user", payload: user });
};

export const login = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();

  return data;
};

export const signUp = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

export const editProfile = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
    {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    },
  );
  const data = await response.json();
  return data;
};
