import { elToastContainer } from "./html-elements.js";

function toast(text) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const button = document.createElement("button");

  li.append(p, button);

  button.addEventListener("click", () => li.remove());
  setTimeout(() => li.remove(), 3000);

  elToastContainer.appendChild(li);
}

export { toast };
