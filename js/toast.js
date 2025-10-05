import { elToastContainer } from "./html-elements.js";

function toast(text) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const button = document.createElement("button");

  p.innerText = text = "O'chirish yakunlandi✅";
  button.innerText = "Yopish";

  li.classList.add(
    "bg-white",
    "border-black",
    "rounded-lg",
    "p-3",
    "flex",
    "items-center",
    "justify-between",
    "w-[250px]"
  );

  button.classList.add(
    "ml-3",
    "py-1",
    "px-2",
    "bg-black",
    "text-white",
    "rounded",
    "transition"
  );

  li.append(p, button);

  button.addEventListener("click", () => li.remove());

  setTimeout(() => li.remove(), 3000);

  elToastContainer.appendChild(li);
}

export { toast };
