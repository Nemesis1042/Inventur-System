const BASE_URL = "http://localhost:8000/products";

function getTokenOrRedirect() {
  const token = localStorage.getItem("token");
  if (!token) {
    redirectToLogin();
    throw new Error("Kein Token vorhanden");
  }
  return token;
}

function redirectToLogin() {
  window.location.href = "/"; // oder dein echter Login-Pfad
}

async function handleResponse(res) {
  if (res.status === 401) {
    redirectToLogin();
    throw new Error("Nicht autorisiert");
  }
  if (!res.ok) {
    throw new Error("Serverfehler");
  }
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(BASE_URL + "/", {
    headers: {
      Authorization: `Bearer ${getTokenOrRedirect()}`,
    },
  });
  return handleResponse(res);
}

export async function createProduct(product) {
  const res = await fetch(BASE_URL + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenOrRedirect()}`,
    },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
}

export async function updateProduct(id, update) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenOrRedirect()}`,
    },
    body: JSON.stringify(update),
  });
  return handleResponse(res);
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getTokenOrRedirect()}`,
    },
  });
  if (res.status === 401) redirectToLogin();
  if (!res.ok) throw new Error("Fehler beim Löschen");
}

