import React, {useState} from "react"
import ReactDOM from "react-dom"
import "./LoginModal.css"
import { useAuth } from "../../context/AuthContext";


function LoginModal({onClose}){
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page reload
    setLoading(true);
    setError(null);

     try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
    console.log("Login success:", data);
    login({ name: data.name || email, email });
    setLoading(false);
    onClose(); // close modal on success
      // You can also set auth tokens here or update app state
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };


    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(event)=> event.stopPropagation()}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="button" onClick={onClose} style={{ marginTop: "1rem" }}>
            Close
          </button>
        </form>
        </div>
    </div>,
    document.body
    );
}

export default LoginModal;