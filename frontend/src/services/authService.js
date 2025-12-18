const API_URL = "http://192.168.38.34:3000/api/auth";

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`http://192.168.38.34:3000/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const updateProfile = async (token, data) => {
  const res = await fetch(`http://192.168.38.34:3000/profile`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const logout = () => {
  localStorage.removeItem("token");
};
