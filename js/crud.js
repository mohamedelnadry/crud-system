var nameInp = document.getElementById("ProductName");
var categoryInp = document.getElementById("ProductCategory");
var priceInp = document.getElementById("ProductPrice");
var descInp = document.getElementById("ProductDescription");

if (localStorage.getItem("productData") == null) {
    var productList = [];
} else {
    var productList = JSON.parse(localStorage.getItem("productData"));
}

function addProduct() {
    if (
        validateProductname() == true &&
        categoryInp.value != "" &&
        priceInp.value != "" &&
        descInp.value != ""
    ) {
        var product = {
            name: nameInp.value,
            category: categoryInp.value,
            price: priceInp.value,
            desc: descInp.value,
        };

        productList.push(product);


        localStorage.setItem("productData", JSON.stringify(productList));

        console.log(productList);
        dispalyProducts();

        //  console.log(nameInp.value);
    }
}

function dispalyProducts() {
    var trs = "";
    for (var i = 0; i < productList.length; i++) {
        trs += `<tr><td>${i}</td><td>${productList[i].name}</td><td>${productList[i].category}</td><td>${productList[i].price}</td><td>${productList[i].desc}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
</td>
<td>
    <button onclick="retriveData(${i})" class="btn btn-warning">update</button>
</td>


    </tr>`;
    }
    document.getElementById("tbody").innerHTML = trs;
}

dispalyProducts();

function deleteProduct(x) {
    productList.splice(x, 1);

    localStorage.setItem("productData", JSON.stringify(productList));
    dispalyProducts();
}

var searchInp = document.getElementById("search");

function search() {
    console.log(searchInp.value);

    var trs = "";
    for (var i = 0; i < productList.length; i++) {
        if (
            productList[i].name.toUpperCase().includes(searchInp.value.toUpperCase())
        ) {
            trs += `<tr><td>${i}</td><td>${productList[i].name.replace(
        searchInp.value,
        `<span style="background-color: yellow;">${searchInp.value}</span>`
      )}</td><td>${productList[i].category}</td><td>${
        productList[i].price
      }</td><td>${productList[i].desc}</td>
      <td>
      <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
  </td>
  <td>
      <button class="btn btn-warning">update</button>
  </td>
  
  
      </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = trs;
}

var addBtn = document.getElementById("addProduct");

function retriveData(x) {
  nameInp.value = productList[x].name;
  categoryInp.value = productList[x].category;
  priceInp.value = productList[x].price;
  descInp.value = productList[x].desc;
  addBtn.innerHTML = "update product";

  addBtn.onclick = function () {
    productList[x].name = nameInp.value;
    productList[x].category = categoryInp.value;
    productList[x].price = priceInp.value;
    productList[x].desc = descInp.value;

    localStorage.setItem("productData", JSON.stringify(productList));

    dispalyProducts();

    addBtn.innerHTML = "add product";

    addBtn.onclick = addProduct;

  };
}

var alert = document.getElementById("nameAlert");

function validateProductname() {
  var nameRegex = /^[A-Z][a-z 0-9]{3,15}$/;
  var nameValue = nameInp.value;

  if (nameRegex.test(nameValue)) {
    console.log("matching");
    nameInp.classList.remove("is-invalid");
    nameInp.classList.add("is-valid");
    alert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;
  } else {
    nameInp.classList.add("is-invalid");
    alert.classList.remove("d-none");
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}

nameInp.addEventListener("keyup", validateProductname);