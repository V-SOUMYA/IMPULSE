export async function simulatePhysics(question) {
  const res = await fetch("http://localhost:5174/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  if (!res.ok) {
    throw new Error("Backend error");
  }

  return res.json();
}
