import { useEffect, useState } from "react";
import { sendMessage, listenToMessages } from "./firebase/firestore";
import { useAuth } from "./context/AuthContext";
import { signInWithGoogle, logout } from "./firebase/auth";

function App() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToMessages(user.uid, setMessages);
    return () => unsubscribe();
  }, [user]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(user.uid, "user", text);
    setText("");
  };

  // 🔹 Loading state
  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  // 🔹 NOT logged in → show login
  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>MindCare</h2>
        <p>A real-time mental health support chatbot</p>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    );
  }

  // 🔹 Logged in → show chat
  return (
    <div style={{ padding: "2rem" }}>
      <h2>MindCare Chat</h2>
      <p>Welcome, {user.displayName}</p>
      <button onClick={logout}>Logout</button>

      <div style={{ marginTop: "1rem" }}>
        {messages.map((msg) => (
          <p key={msg.id}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
