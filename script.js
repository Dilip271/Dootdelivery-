const products=[
 {name:"Fresh Grocery Pack",price:299,icon:"🥦"},
 {name:"Kitchen Essentials",price:249,icon:"🍳"},
 {name:"Daily Cleaning Pack",price:199,icon:"🧽"},
 {name:"Snacks & Beverages",price:149,icon:"🛒"},
 {name:"Personal Care",price:299,icon:"🧴"},
 {name:"Home Essentials",price:349,icon:"🏠"},
 {name:"Fresh Fruits",price:199,icon:"🍎"},
 {name:"Quick Breakfast Pack",price:179,icon:"🥣"}
];
let cart=0;
function render(list=products){
 const box=document.getElementById("products");
 box.innerHTML=list.map((p,i)=>`<article class="product"><div class="pic">${p.icon}</div><h3>${p.name}</h3><div class="price">₹${p.price}</div><button onclick="addToCart()">Add to Cart</button></article>`).join("");
}
function addToCart(){cart++;document.getElementById("cartCount").textContent=cart;alert("Product added to cart.");}
function showCart(){alert(cart?`You have ${cart} item(s) in your cart.`:"Your cart is empty.");}
function filterProducts(){
 const q=document.getElementById("searchInput").value.toLowerCase().trim();
 render(products.filter(p=>p.name.toLowerCase().includes(q)));
}
render();
