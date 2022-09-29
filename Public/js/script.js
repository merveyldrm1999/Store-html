const products = [
  {
    id: 0,
    name: "Bilgisayar",
    price: 12000,
    detail: "Bu bir bilgisayardır.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 1,
    name: "Telefon",
    price: 2000,
    detail: "Bu bir Telefondur.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 2,
    name: "Masa",
    price: 1000,
    detail: "Bu bir Masadır.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 3,
    name: "Sandalye",
    price: 1750,
    detail: "Bu bir Sandalyedir.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 4,
    name: "Koltuk",
    price: 10000,
    detail: "Bu bir Koltuktur.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 5,
    name: "Klavye",
    price: 700,
    detail: "Bu bir Klavyedir.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 6,
    name: "Kahve Makinesi",
    price: 9000,
    detail: "Bu bir kahve makinesidir.",
    img: "empty.png",
    piece: 0,
  },
  {
    id: 7,
    name: "kalem",
    price: 3000,
    detail: "Bu bir Kalemdir.",
    img: "empty.png",
    piece: 0,
  },
];
let idd = 2;
let toplamfiyat = 0;
let toplamtutar = 0;
let price = 0;
//sayfa ilk tamamen yuklendıgınde acıldıgında calısan funk.
document.addEventListener("DOMContentLoaded", function () {
  //ürünlerimi dönücem
  products.forEach((val) => {
    //yeni bi değişken oluşturdum
    let newDiv = `
    <div class="col-4 "id="pro-${val.id}">
    <div class="card w-100">
        <img src="../Public/img/product/${val.img}"
            class="card-img-top"
            alt="...">
        <div class="card-body">
            <h5 class="card-title">${val.name}</h5>
            <p class="card-text">${val.detail}</p>
            <span>Fiyat: <span class="product-price">${val.price}</span>₺</span>
            <a onclick="addBasket(event,${val.id})" href="#" class="btn btn-primary p0 m0 ">Buy</a>
            <a onclick="addEdit(event,${val.id})" href="#" class="btn btn-primary p0 m0">Edit</a>
        </div>
    </div>
</div>`;

    document
      .getElementById("product-div")
      .insertAdjacentHTML("beforeend", newDiv);
  });
});
//acıldıgında calısan funk bıtısı
function addBasket(event, id) {
  products.forEach((val) => {
    if (val.id == id) {
      val.piece++;
      toplamtutar = parseInt(toplamtutar) + parseInt(price);
      document.getElementsByClassName("total-price")[0].innerHTML = toplamtutar;

      let varMi = document.getElementById(`basket-${val.id}`);

      if (varMi == null) {
        let newTable = `<tr id="basket-${val.id}">
                            <td class="adi">${val.name}</td>
                            <td class="adet">${val.piece}</td>
                            <td class="para">${val.price}</td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(event,${id})">Sepetten Çıkar</button><button class="btn btn-danger" onclick="deletePiece(event,${id})">Adet Çıkar</button></td>
                         </tr>`;
        document
          .getElementById("add-basket")
          .insertAdjacentHTML("beforeend", newTable);
      } else {
        varMi.getElementsByClassName("adet")[0].innerHTML =
          parseInt(varMi.getElementsByClassName("adet")[0].innerHTML) + 1;
        varMi.getElementsByClassName("para")[0].innerHTML =
          val.piece * val.price;
      }
    }
  });
}
function addProduct(e) {
  let proName = document.getElementById("product-name").value;
  let proDetail = document.getElementById("product-detail").value;
  let proPrice = document.getElementById("product-price").value;
  idd++;
  let newProduct = {
    id: idd,
    name: proName,
    price: proPrice,
    detail: proDetail,
    img: "empty.png",
    piece: 0,
  };

  products.push(newProduct);
  let newDiv = `
    <div class="col-4 ">
    <div class="card w-100">
        <img src="../Public/img/product/${newProduct.img}"
            class="card-img-top"
            alt="...">
        <div class="card-body">
            <h5 class="card-title">${newProduct.name}</h5>
            <p class="card-text">${newProduct.detail}</p>
            <span>Fiyat: <span class="product-price">${newProduct.price}</span>₺</span>
            <a onclick="addBasket(event,${newProduct.id})" href="#" class="btn btn-primary">Buy</a>
        </div>
    </div>
</div>`;

  document
    .getElementById("product-div")
    .insertAdjacentHTML("beforeend", newDiv);
}
function addEdit(event, id) {
  let upPro = products.filter((product) => product.id == id);

  document.getElementById("product-name").value = upPro[0].name;
  document.getElementById("product-detail").value = upPro[0].detail;
  document.getElementById("product-price").value = upPro[0].price;
  document.getElementById("islemler").innerHTML = "Edit";
  document
    .getElementById("islemler")
    .setAttribute("onclick", "update(event," + id + ");");

  var modalproductekle = new bootstrap.Modal(
    document.getElementById("modal-product-ekle"),
    {
      keyboard: false,
    }
  );
  modalproductekle.show();
}
function update(event, id) {
  products.forEach((product) => {
    if (product.id == id) {
      product.name = document.getElementById("product-name").value;
      product.detail = document.getElementById("product-detail").value;
      product.price = document.getElementById("product-price").value;
      let tr = document.getElementById(`basket-${id}`);
      if (tr != undefined) {
        tr.getElementsByClassName("adi")[0].innerHTML = product.name;
        tr.getElementsByClassName("para")[0].innerHTML =
          parseInt(product.price) *
          parseInt(tr.getElementsByClassName("adet")[0].innerHTML);
      }

      let cardurun = document.getElementById(`pro-${product.id}`);
      console.log(cardurun);
      cardurun.getElementsByClassName("card-title")[0].innerHTML = product.name;
      cardurun.getElementsByClassName("card-text")[0].innerHTML =
        product.detail;
      cardurun.getElementsByClassName("product-price")[0].innerHTML =
        product.price;
    }
  });
}
function deleteProduct(event, id) {
  const tr = event.target.closest("tr");

  tr.remove();

  products.forEach((val) => {
    if (val.id == id) {
      val.piece = 0;
    }
  });
}
function deletePiece(event, id) {
  let adet = event.target
    .closest("tr")
    .getElementsByClassName("adet")[0].textContent;
  console.log(adet);
  const getPRoduct = products.filter((product) => product.id == id);

  if (adet > 1) {
    adet--;
    event.target.closest("tr").getElementsByClassName("adet")[0].innerHTML =
      adet;
    getPRoduct[0].count--;
  } else {
    event.target.closest("tr").remove();
  }

  toplamfiyat = document.getElementsByClassName("para")[0].innerHTML;
  toplamfiyat = parseInt(toplamfiyat) - parseInt(getPRoduct[0].price);

  document.getElementsByClassName("para")[0].innerHTML = toplamfiyat;

  const tr = event.target.closest("tr");
  tr.getElementsByClassName("price")[0].innerHTML =
    getPRoduct[0].count * getPRoduct[0].price;
}

//Duzenleye tıkladım Modal acıldı urun bilgileri inputa doldu buton duzenle oldu degıstırıp basınca urun bilgileri degisti.
//Sepetten cıakr butonu eklenecek.
//sepetten cıkara basınca urun adetı 0 a dusurulup tablodan silinecek.
