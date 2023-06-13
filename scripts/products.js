"use strict";
let imageFiles = [
  { name: "../images/1.jpg", description: "beverages background" },
  { name: "../images/2.jpg", description: "condiments background" },
  { name: "../images/3.jpg", description: "confections background" },
  { name: "../images/4.jpg", description: "dairy products background" },
  { name: "../images/5.jpg", description: "dairy background" },
  { name: "../images/6.jpg", description: "grains background" },
  { name: "../images/7.jpg", description: "meat background" },
  { name: "../images/8.jpg", description: "seafood background" },
  { name: "../images/viewAll.jpg", description: "background" },
  { name: "../images/select.jpg", description: "background" },
];
// const tbody = document.querySelector("#table tbody");
const optionsEl = document.getElementById("option");
const tbody = document.querySelector("#table tbody");

const img = imageFiles.find((img) => img.name.includes(optionsEl.value));

document.body.style.background = `url('${img.name}')`;

fetch(`http://localhost:8081/api/categories`)
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((option) => {
      const optionsName = new Option(option.name, option.categoryId);
      optionsEl.appendChild(optionsName);
    });

    optionsEl.addEventListener("change", () => {
      const selectedOption = optionsEl.value;
      console.log(optionsEl);
      const tableRows = document.querySelectorAll("#table tr");

      Array.from(tableRows).forEach((option) => {
        tbody.removeChild(option);
      });

      const img = imageFiles.find((img) => img.name.includes(optionsEl.value));
      console.log(img);
      document.body.style.background = `url('${img.name}')`;

      fetch(`http://localhost:8081/api/products`)
        .then((response) => response.json())
        .then((products) => {
          products.forEach((product) => {
            let anchor = `<a href="./details.html?productId=${product.productId}">See Details</a>`;

            if (product.categoryId == selectedOption) {
              const row = tbody.insertRow(-1);

              const cell1 = row.insertCell(0);
              cell1.innerHTML = product.productName;

              const cell2 = row.insertCell(1);
              cell2.innerHTML = anchor;
            } else if (selectedOption == "viewAll") {
              const row = tbody.insertRow();

              const nameCell = row.insertCell();
              nameCell.innerHTML = product.productName;

              const categoryOfProduct = categories.find(
                (category) => category.categoryId == product.categoryId
              );

              const categoryCell = row.insertCell();
              categoryCell.innerHTML = categoryOfProduct.name;

              const linkCell = row.insertCell();
              linkCell.innerHTML = anchor;
            }
          });
        });
    });
  });
// function backgroundPic(img) {
//   const img = imageFiles.find((img) => img.name.includes(optionsEl.value));
//   console.log(img);
//   document.body.style.background = `url('${img.name}')`;
// }
