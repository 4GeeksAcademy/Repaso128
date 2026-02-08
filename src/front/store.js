export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    token: localStorage.getItem("token") || null,
    user: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };
    case "auth_login": {
      const { token } = action.payload;
      localStorage.setItem("token", token);
      return { ...store, token };
    }

    case "auth_set_user":
      return { ...store, user: action.payload };


    case "auth_logout":
      localStorage.removeItem("token");
      return { ...store, token: null, user: null, authReady: true };
      
    default:
      throw Error("Unknown action.");
  }
}
