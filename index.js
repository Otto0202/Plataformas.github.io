document.addEventListener("DOMContentLoaded", ()=>{

const productos = [
{
nombre:"Netflix",
img:"https://imgur.com/qWeIeJQ.jpg",
pantalla:["26 días - 15000"],
cuenta:[]
},
{
nombre:"Win Play",
img:"https://imgur.com/Po4LLSW.jpg",
pantalla:["30 días - 15000"],
cuenta:[]
},
{
nombre:"Disney+",
img:"https://imgur.com/rw8oSWW.jpg",
pantalla:[
"Con ESPN - 10000",
"Sin ESPN SIN ANUNCIOS - 8000",
"Sin ESPN CON ANUNCIOS - 6000"
],
cuenta:[
"7 Pantallas con ESPN - 28000",
"7 Pantallas sin ESPN - 22000"
]
},
{
nombre:"HBO Max",
img:"https://imgur.com/MEQjJ5o.jpg",
pantalla:[
"Estandar - 6500",
"Platino pantalla - 9000"
],
cuenta:[
"Max 5 Pantallas - 15000",
"Platino 5 Pantallas - 20000"
]
},
{
nombre:"Crunchyroll",
img:"https://imgur.com/nG42eev.jpg",
pantalla:["Mega Fan - 9000"],
cuenta:["5 Pantallas - 15500"]
},
{
nombre:"Prime Video",
img:"https://imgur.com/lIL02hn.jpg",
pantalla:["Pantalla - 7500"],
cuenta:["Original 6 Pantallas - 22000"]
},
{
nombre:"Paramount+",
img:"https://imgur.com/A9OoDDR.jpg",
pantalla:["Pantalla - 6500"],
cuenta:["6 Pantallas - 16000"]
},
{
nombre:"Vix",
img:"https://imgur.com/xk7TleC.jpg",
pantalla:["Pantalla - 8000"],
cuenta:["5 Pantallas - 16000"]
},
{
nombre:"Plex",
img:"https://imgur.com/uH3mttW.jpg",
pantalla:[
"1 Mes (Roku/IOS) - 8000",
"1 Mes (NO Roku/IOS) - 6500",
"3 Meses (NO Roku/IOS) - 15000"
],
cuenta:[
"4 Pantallas 1 Mes (Roku/IOS) - 20000",
"4 Pantallas 1 Mes (NO Roku/IOS) - 15000",
"3 Meses (NO Roku/IOS) - 25000",
"6 Meses (NO Roku/IOS) - 45000"
]
},
{
nombre:"Magis TV",
img:"https://imgur.com/Y6wj3CT.jpg",
pantalla:["PRO pantalla - 9500"],
cuenta:["Cuenta completa - 16000"]
},
{
nombre:"YouTube",
img:"https://imgur.com/89YQK3J.jpg",
pantalla:["1 mes - 10000"],
cuenta:[]
},
{
nombre:"Spotify",
img:"https://imgur.com/rv3NfbX.jpg",
pantalla:["1 mes - 10000","3 meses - 25000"],
cuenta:[]
},
{
nombre:"Deezer",
img:"https://imgur.com/ggsjka3.jpg",
pantalla:["1 mes - 10000"],
cuenta:[]
},
{
nombre:"Canva",
img:"https://imgur.com/i0OC1VF.jpg",
pantalla:["1 Mes (estudiantil) - 12000"],
cuenta:[]
},
{
nombre:"Apple TV",
img:"https://imgur.com/7bhEfFG.jpg",
pantalla:["1 Mes (sin MLS) - 8000"],
cuenta:[]
},
{
nombre:"Office 365",
img:"https://imgur.com/Ys14gGe.jpg",
pantalla:["1 año - 45000"],
cuenta:[]
},
{
nombre:"Chat GPT",
img:"https://imgur.com/JYNI7nF.jpg",
pantalla:["Correo personal - 17000"],
cuenta:[]
},
{
nombre:"Capcut Pro",
img:"https://imgur.com/y48RpoH.jpg",
pantalla:["1 dispositivo - 14000"],
cuenta:["3 dispositivos - 20000"]
},
{
nombre:"Directv Go",
img:"https://imgur.com/k8r44fZ.jpg",
pantalla:["Plan oro sin Win+ - 14000"],
cuenta:[]
}
];

let cart=[];

const cont=document.getElementById("productos");

/******** RENDER ********/
productos.forEach((p,i)=>{

const radios = `
<label><input type="radio" name="tipo-${i}" value="pantalla" checked> Pantalla</label>
${p.cuenta.length ? `<label><input type="radio" name="tipo-${i}" value="cuenta"> Cuenta completa</label>`:""}
`;

cont.innerHTML += `
<div class="card">
<img src="${p.img}" class="product-img">
<h2 class="font-bold mt-2">${p.nombre}</h2>

<div class="mt-2">${radios}</div>

<select id="select-${i}" class="w-full text-black mt-2 p-2 rounded"></select>

<button onclick="addToCart(${i})" class="btn">Agregar</button>
</div>
`;

updateSelect(i);

document.querySelectorAll(`input[name="tipo-${i}"]`).forEach(r=>{
r.addEventListener("change", ()=>updateSelect(i));
});

});

/******** FIX REAL ********/
window.updateSelect = function(i){

const tipo = document.querySelector(`input[name="tipo-${i}"]:checked`).value;
const select = document.getElementById(`select-${i}`);

let lista = tipo === "pantalla" ? productos[i].pantalla : productos[i].cuenta;

select.innerHTML = "";

if(lista.length === 0){
select.innerHTML = `<option>No disponible</option>`;
return;
}

lista.forEach(op=>{
const option = document.createElement("option");
option.value = op;
option.textContent = op;
select.appendChild(option);
});

select.selectedIndex = 0;
};

/******** CARRITO ********/
window.addToCart = function(i){

const val = document.getElementById(`select-${i}`).value;

if(val === "No disponible") return;

const precio = parseInt(val.split(" - ")[1]);

let item = cart.find(p=>p.name===productos[i].nombre && p.opcion===val);

if(item){item.qty++;}
else{
cart.push({name:productos[i].nombre, opcion:val, precio, qty:1});
}

updateCounter();
};

function updateCounter(){
document.getElementById("contador").innerText =
cart.reduce((s,p)=>s+p.qty,0);
}

window.openCart = function(){

const div=document.getElementById("cartItems");
div.innerHTML="";
let total=0;

cart.forEach((p,i)=>{
let sub=p.qty*p.precio;
total+=sub;

div.innerHTML+=`
<div>
<b>${p.name}</b><br>
${p.opcion}<br>
${p.qty} x $${p.precio}<br>
<b>$${sub.toLocaleString("es-CO")}</b><br>

<button onclick="addOne(${i})">+</button>
<button onclick="removeOne(${i})">-</button>
<button onclick="deleteItem(${i})">Eliminar</button>
<hr>
</div>
`;
});

div.innerHTML+=`<b>Total: $${total.toLocaleString("es-CO")}</b>`;

document.getElementById("cartModal").style.display="flex";
};

window.closeCart = ()=>document.getElementById("cartModal").style.display="none";

window.addOne = i=>{cart[i].qty++;updateCounter();openCart();}
window.removeOne = i=>{
cart[i].qty--;
if(cart[i].qty<=0) cart.splice(i,1);
updateCounter();openCart();
}
window.deleteItem = i=>{
cart.splice(i,1);
updateCounter();openCart();
}

window.checkout = function(){
let total=0;
let msg="Hola, quiero realizar un pedido:%0A%0A";

cart.forEach(p=>{
let sub=p.qty*p.precio;
total+=sub;
msg+=`- ${p.name} (${p.opcion}) x${p.qty} → $${sub.toLocaleString("es-CO")}%0A`;
});

msg+=`%0A💵 Total: $${total.toLocaleString("es-CO")}`;

window.open(`https://wa.me/573239618378?text=${msg}`);
};

});
