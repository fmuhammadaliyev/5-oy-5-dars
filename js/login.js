const elForm = document.getElementById("loginForm");
const elLoader = document.getElementById("loader");
const elError = document.getElementById("error");

const API_URL = "https://json-api.uz/api/project/fn44/auth/login";

elForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  elError.textContent = "";
  elLoader.classList.remove("hidden");

  const formData = new FormData(elForm);
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      elError.textContent = data?.message || "Login xatolik!";
      return;
    }

    localStorage.setItem("token", data.data.token);
    window.location.href = "../index.html";
  } catch {
    elError.textContent = "Tarmoqda xatolik!";
  } finally {
    elLoader.classList.add("hidden");
  }
});
