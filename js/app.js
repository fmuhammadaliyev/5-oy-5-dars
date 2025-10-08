import { toast } from "./toast.js";
import {
  elContainer,
  elErrorText,
  elForm,
  elLoader,
  elTemplateCard,
} from "./html-elements.js";

const API_URL = "https://json-api.uz/api/project/fn44";

init();

function init() {
  elLoader.classList.remove("hidden");
  elErrorText.innerText = "";

  fetch(`${API_URL}/cars`)
    .then((res) => res.json())
    .then((data) => ui(data.data))
    .catch(() => (elErrorText.innerText = "Ma'lumotlarni olishda xatolik!"))
    .finally(() => elLoader.classList.add("hidden"));
}

function ui(cars) {
  elContainer.innerHTML = "";

  if (!cars.length) {
    elContainer.innerHTML =
      "<h2 class='col-span-full text-center text-gray-500 text-xl font-semibold'>Mashinalar mavjud emas 😔</h2>";
    return;
  }

  cars.forEach((car) => {
    const clone = elTemplateCard.cloneNode(true).content;
    const title = clone.querySelector("h2");
    const desc = clone.querySelector("p");
    const btnDelete = clone.querySelector(".js-delete");
    const btnEdit = clone.querySelector(".js-edit");

    title.textContent = car.name;
    desc.innerHTML = `
      <b>Trim:</b> ${car.trim || "-"}<br>
      <b>Avlod:</b> ${car.generation || "-"}<br>
      <b>Yili:</b> ${car.year || "-"}<br>
      <b>Rangi:</b> ${car.colorName || "-"} (${car.color || "-"})<br>
      <b>Kategoriya:</b> ${car.category || "-"}<br>
      <b>Izoh:</b> ${car.description || "-"}
    `;

    btnDelete.addEventListener("click", () => {
      if (confirm("Rostdan o‘chirmoqchimisiz?")) {
        deleteCar(car.id);
      }
    });

    btnEdit.addEventListener("click", () => openEditModal(car));

    elContainer.appendChild(clone);
  });
}

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(elForm);
  const newCar = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  })
    .then((res) => res.json())
    .then(() => {
      toast("Mashina qo‘shildi!");
      elForm.reset();
      init();
    })
    .catch(() => toast("Qo‘shishda xatolik!"));
});

function deleteCar(id) {
  fetch(`${API_URL}/cars/${id}`, { method: "DELETE" })
    .then(() => {
      toast("Mashina o‘chirildi!");

      setTimeout(() => {
        window.location.href = "./pages/login.html";
      });
    })
    .catch(() => toast("O‘chirishda xatolik!"));
}

const modalBg = document.getElementById("modalBg");
const closeModal = document.getElementById("closeModal");
const saveBtn = modalBg.querySelector("button.bg-red-600");
const inputTitle = modalBg.querySelector("input");
const inputDesc = modalBg.querySelector("textarea");

let editingId = null;

function openEditModal(car) {
  editingId = car.id;
  inputTitle.value = car.name;
  inputDesc.value = car.description || "";
  modalBg.classList.remove("hidden");
  modalBg.classList.add("flex");
}

closeModal.addEventListener("click", () => {
  modalBg.classList.add("hidden");
  modalBg.classList.remove("flex");
});

saveBtn.addEventListener("click", () => {
  if (!editingId) return;

  const updatedCar = {
    name: inputTitle.value.trim(),
    description: inputDesc.value.trim(),
  };

  fetch(`${API_URL}/cars/${editingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCar),
  })
    .then((res) => res.json())
    .then(() => {
      toast("Tahrirlandi!");
      modalBg.classList.add("hidden");
      modalBg.classList.remove("flex");
      init();
    })
    .catch(() => toast("Tahrirlashda xatolik!"));
});

// dark
const elBtn = document.getElementById("btn");

if (localStorage.getItem("mode") === "darkk") {
  document.body.classList.add("darkk");
} else {
  document.body.classList.remove("darkk");
}

elBtn.addEventListener("click", () => {
  if (document.body.classList.contains("darkk")) {
    document.body.classList.remove("darkk");
    localStorage.setItem("mode", "light");
  } else {
    document.body.classList.add("darkk");
    localStorage.setItem("mode", "darkk");
  }
});
