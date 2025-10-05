import {
  elContainer,
  elErrorText,
  elForm,
  elLoader,
  elTemplateCard,
} from "./html-elements.js";
import { toast } from "./toast.js";

function ui(cars) {
  elContainer.innerHTML = "";

  cars.forEach((element) => {
    const clone = elTemplateCard.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elDeleteButton = clone.querySelector(".js-delete");

    elTitle.innerText = element.name;

    elDescription.innerText = `
Trim: ${element.trim}
Avlod: ${element.generation}
Yili: ${element.year}
Rangi: ${element.colorName} (${element.color})
Kategoriya: ${element.category}
Eshik soni: ${element.doorCount}
O‘rindiqlar soni: ${element.seatCount}
Maksimal tezlik: ${element.maxSpeed}
Tezlanish: ${element.acceleration}
Dvigatel: ${element.engine}
Ot kuchi: ${element.horsepower}
Yoqilg‘i turi: ${element.fuelType}
Yoqilg‘i sarfi:
   - Shahar: ${element.fuelConsumption?.city || "-"}
   - Trassa: ${element.fuelConsumption?.highway || "-"}
   - O‘rtacha: ${element.fuelConsumption?.combined || "-"}
Mamlakat: ${element.country}
Izoh: ${element.description}
ID: ${element.id}
`;

    elDeleteButton.id = element.id;

    elContainer.appendChild(clone);
  });
}

function init() {
  elLoader.classList.remove("hidden");
  fetch("https://json-api.uz/api/project/fn44/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .catch(() => {
      elErrorText.textContent = "Xatolik chiqdi!";
    })
    .finally(() => {
      elLoader.classList.add("hidden");
    });
}
init();

function deleteCar(id) {
  fetch(`https://json-api.uz/api/project/fn44/cars/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      elContainer.innerHTML = "";
      toast(res);
      init();
    })
    .catch((err) => {});
  // .finally(() => {
  //   elLoader.classList.add("hidden");
  // });
}

function addCar(car) {
  fetch("https://json-api.uz/api/project/fn44/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((res) => res.json())
    .then((res) => {
      elContainer.innerHTML = "";
      toast("Yangi mashina qo'shildi!");
      init();
    })
    .catch((err) => {
      toast("Xatolik yuz berdi!");
      console.error(err);
    });
}

// CRUD
elContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete")) {
    if (confirm("Ochirsangiz qaytib topa olmaysiz")) {
      e.target.innerText = "Loading . . .";
      deleteCar(e.target.id);
    }
  }
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = {};
  const formData = new FormData(elForm);
  formData.forEach((value, key) => {
    result[key] = value;
  });

  addCar(result);
});
