import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulatePhysics = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5174/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      console.log("Simulation result:", data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to simulate physics");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>SeeTheForce ⚡</h1>

      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Enter a physics question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={simulatePhysics}
        disabled={loading}
        style={{
          marginTop: 12,
          padding: "8px 16px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? "Simulating..." : "Animate"}
      </button>

      {result && (
        <pre
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f5f5f5",
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
