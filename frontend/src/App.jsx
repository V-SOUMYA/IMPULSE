import { useState } from "react";
import CanvasRenderer from "./CanvasRenderer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulatePhysics = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5174/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>SeeTheForce ⚡</h1>

      <textarea
        rows={3}
        style={{ width: "100%" }}
        placeholder="Enter a physics question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={simulatePhysics} disabled={loading}>
        {loading ? "Simulating..." : "Animate"}
      </button>

      {result && (
        <>
          <CanvasRenderer simulation={result} />
          <p style={{ marginTop: 12 }}>{result.explanation}</p>
        </>
      )}
    </div>
  );
}

export default App;
