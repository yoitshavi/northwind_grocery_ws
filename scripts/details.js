let imageFiles = [
  { name: "../images/1.jpg", description: "beverages background" },
  { name: "../images/2.jpg", description: "condiments background" },
  { name: "../images/3.jpg", description: "confections background" },
  { name: "../images/4.jpg", description: "dairy products background" },
  { name: "../images/5.jpg", description: "dairy background" },
  { name: "../images/6.jpg", description: "grains background" },
  { name: "../images/7.jpg", description: "meat background" },
  { name: "../images/8.jpg", description: "seafood background" },
  { name: "../images/viewallstuff.jpg", description: "background" },
];

const paragraphEl = document.getElementById("instructor");
const tbody = document.querySelector("#detailsTable tbody");

fetch(`http://localhost:8081/api/products`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const urlParams = new URLSearchParams(location.search);
      let id = -1;
      if (urlParams.has("productId") === true) {
        id = urlParams.get("productId");
        if (id == +product.productId) {
          const row = tbody.insertRow(-1);

          const cell1 = row.insertCell(0);
          cell1.innerHTML = product.productName;

          const cell2 = row.insertCell(1);
          cell2.innerHTML = `$${(+product.unitPrice).toFixed(2)}`;

          const cell3 = row.insertCell(2);
          cell3.innerHTML = product.unitsInStock;

          const cell4 = row.insertCell(3);
          cell4.innerHTML = product.supplier;

          const img = imageFiles.find((img) =>
            img.name.includes(product.categoryId)
          );
          document.body.style.background = `url('${img.name}')`;

          if (product.discontinued === "true") {
            const cell5 = row.insertCell(4);
            cell5.innerHTML = "Discontinued";
          } else {
            return false;
          }
        }
        // console.log(product.categoryId);
        // imageFiles.find((img) => {
        //   const imageNeeded = +product.categoryId;
        //   console.log(product.categoryId);

        //   if (img.name.includes(imageNeeded)) {
        //     // console.log(img);
        //     document.body.style.background = img;
        //   }
        // });
      }
    });
  });

//   });
//  for(let i = 0; i<imageFiles.length;i++){
//     const imageNeeded = product.categoryId
// if (product.categoryId) {
//    ;
// }

// const productIdent = product.productId;
// const selectedImageObj = imagesPathway.find(
//   (img) => productIdent == selectedImageValue
// );
// console.log(selectedImageObj);
// document.body.style.background = img;
// console.log(data);
// function changeBackground(img) {
//   const productIdent = product.productId;
//   const selectedImageObj = imageFiles.find(
//     (img) => productIdent == selectedImageValue
//   );
//   document.body.style.background = selectedImageObj;
//   }
//   function changeBackground(img) {
//     document.body.style.background = color;
//  }
//  addBtnEl.addEventListener("click", () => {
//  const selectedImageValue = pictureSelectEl.value;

//   if (selectedImageValue === "") {
//     alert("Nothing selected");
//   }
//   if (insertedImagePaths.includes(selectedImageValue)) {
//     return;
//   }

//   insertedImagePaths.push(selectedImageValue);
//   const selectedImageObj = imageFiles.find(
//     (img) => img.name == selectedImageValue
//   );

//   const imgEl = document.createElement("img");
//   imgEl.src = selectedImageObj.name;
//   imgEl.alt = selectedImageObj.description;
//   displayPictureDiv.appendChild(imgEl);
// });
// clearBtnEl.addEventListener("click", () => {
//   const images = displayPictureDiv.querySelectorAll("img");
//   insertedImagePaths.length = 0;
//   Array.from(images).forEach((img) => {
//     displayPictureDiv.removeChild(img);
//   });
// });
