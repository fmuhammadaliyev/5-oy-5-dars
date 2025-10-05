const elToastContainer = document.getElementById("toastContainer");

export function toast(text) {
  const li = document.createElement("li");
  li.className =
    "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md transition-opacity animate-fade-in";
  li.textContent = text;

  elToastContainer.appendChild(li);
  setTimeout(() => li.remove(), 3000);
}
