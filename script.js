const products=[
{name:"Rice 5 kg",price:299,cat:"Grocery",icon:"🍚"},
{name:"Atta 5 kg",price:249,cat:"Grocery",icon:"🌾"},
{name:"Cooking Oil 1 L",price:149,cat:"Grocery",icon:"🫗"},
{name:"Fresh Vegetables Pack",price:199,cat:"Fruits & Vegetables",icon:"🥦"},
{name:"Fresh Fruits Pack",price:199,cat:"Fruits & Vegetables",icon:"🍎"},
{name:"Kitchen Essentials",price:249,cat:"Kitchen",icon:"🍳"},
{name:"Dishwash Liquid",price:99,cat:"Kitchen",icon:"🧽"},
{name:"Biscuits & Snacks",price:149,cat:"Snacks",icon:"🍪"},
{name:"Cold Drinks",price:99,cat:"Snacks",icon:"🥤"},
{name:"Personal Care Pack",price:299,cat:"Personal Care",icon:"🧴"},
{name:"Cleaning Essentials",price:199,cat:"Home",icon:"🧹"},
{name:"Home Essentials",price:349,cat:"Home",icon:"🏠"}
];

let cartItems=[];
let activeCategory="All";

function render(list=products){
 const box=document.getElementById("products");
 document.getElementById("resultCount").textContent=list.length+" products";
 box.innerHTML=list.length?list.map((p,i)=>`
 <article class="product">
  <div class="pic">${p.icon}</div>
  <small>${p.cat}</small><h3>${p.name}</h3>
  <div class="price">₹${p.price}</div>
  <button onclick="addToCart(${products.indexOf(p)})">Add to Cart</button>
 </article>`).join(""):"<p>No products found.</p>";
}

function addToCart(i){
 const p=products[i];
 const found=cartItems.find(x=>x.name===p.name);
 if(found) found.qty++; else cartItems.push({...p,qty:1});
 updateCart();
}

function updateCart(){
 const count=cartItems.reduce((s,p)=>s+p.qty,0);
 document.getElementById("cartCount").textContent=count;
 const box=document.getElementById("cartItems");
 if(!cartItems.length){box.innerHTML="<p>Your cart is empty.</p>";}
 else box.innerHTML=cartItems.map((p,i)=>`
 <div class="cart-row"><span>${p.icon} ${p.name}</span>
 <div><button onclick="changeQty(${i},-1)">−</button><b>${p.qty}</b><button onclick="changeQty(${i},1)">+</button>
 ₹${p.price*p.qty}</div></div>`).join("");
 document.getElementById("cartTotal").textContent="₹"+cartItems.reduce((s,p)=>s+p.price*p.qty,0);
}

function changeQty(i,d){
 cartItems[i].qty+=d;
 if(cartItems[i].qty<=0) cartItems.splice(i,1);
 updateCart();
}

function showCart(){
 document.getElementById("cartModal").classList.add("show");
 document.getElementById("cartModal").setAttribute("aria-hidden","false");
 updateCart();
}
function closeCart(){
 document.getElementById("cartModal").classList.remove("show");
 document.getElementById("cartModal").setAttribute("aria-hidden","true");
}

function filterCategory(cat,btn){
 activeCategory=cat;
 document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active");
 filterProducts();
}

function filterProducts(){
 const q=document.getElementById("searchInput").value.toLowerCase().trim();
 const list=products.filter(p=>
   (activeCategory==="All"||p.cat===activeCategory) &&
   p.name.toLowerCase().includes(q)
 );
 render(list);
}

function placeOrder(){
 if(!cartItems.length){alert("Your cart is empty.");return;}
 const name=document.getElementById("customerName").value.trim();
 const phone=document.getElementById("customerPhone").value.trim();
 const address=document.getElementById("customerAddress").value.trim();
 if(!name||!phone||!address){alert("Please enter your name, mobile number and delivery address.");return;}
 const total=cartItems.reduce((s,p)=>s+p.price*p.qty,0);
 const items=cartItems.map(p=>`${p.name} x${p.qty}`).join(", ");
 const message=`DootDelivery Order%0AName: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(address)}%0AItems: ${encodeURIComponent(items)}%0ATotal: ₹${total}`;
 window.location.href=`https://wa.me/?text=${message}`;
}

render();
