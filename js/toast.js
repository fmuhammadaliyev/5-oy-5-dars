function toast(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className =
    "fixed bottom-5 right-5 bg-black text-white py-2 px-4 rounded-lg shadow-lg";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
export { toast };
