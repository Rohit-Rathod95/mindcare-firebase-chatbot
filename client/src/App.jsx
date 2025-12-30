import { signInWithGoogle, logout } from "./firebase/auth";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h2>MindCare</h2>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}

export default App;
