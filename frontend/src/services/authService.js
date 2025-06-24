const API_BASE = "http://localhost:8000";

export async function login(username, password) {
    console.log("📤 Login-Request Payload:", {
    	username,
    	password
    });
    const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    let errorMsg = "Login fehlgeschlagen";
    try {
      const error = await res.json(); // versucht JSON zu lesen
      errorMsg = error.detail || JSON.stringify(error);
    } catch {
      errorMsg = await res.text(); // Fallback, falls kein JSON
    }
    throw new Error(errorMsg);
  }

  return res.json(); // → { access_token, token_type }
}

