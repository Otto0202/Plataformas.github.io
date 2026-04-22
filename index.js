const productos = [
{
nombre:"Plex",
img:"https://imgur.com/uH3mttW.jpg",
opciones:[
{tipo:"Pantalla", lista:[
"1 mes (Roku/IOS) - 8000",
"1 mes (NO Roku/IOS) - 6500",
"3 meses (NO Roku/IOS) - 15000"
]},
{tipo:"Cuenta completa", lista:[
"4 pantallas 1 mes (Roku/IOS) - 20000",
"4 pantallas 1 mes (NO Roku/IOS) - 15000",
"3 meses (NO Roku/IOS) - 25000",
"6 meses (NO Roku/IOS) - 45000"
]}
]
},

{
nombre:"Disney+",
img:"https://imgur.com/rw8oSWW.jpg",
opciones:[
{tipo:"Pantalla", lista:[
"Con ESPN - 10000",
"Sin ESPN (sin anuncios) - 8000",
"Con anuncios - 6000"
]},
{tipo:"Cuenta completa", lista:[
"7 pantallas con ESPN - 28000",
"7 pantallas sin ESPN - 22000"
]}
]
},

{
nombre:"Netflix",
img:"https://imgur.com/qWeIeJQ.jpg",
opciones:[
{tipo:"Pantalla", lista:["26 días - 15000"]}
]
}
];

let cart=[];

/******** RENDER ********/
const cont=document.getElementById("productos");

productos.forEach((p,index)=>{

let radios = p.opciones.map((o,i)=>`
<label>
<input type="radio" name="tipo-${index}" value="${i}" ${i===0?'checked':''}>
${o.tipo}
</label>
`).join("<br>");

cont.innerHTML+=`
<div class="card">
<img src="${p.img}" class="product-img">
<h2 class="font-bold mt-2">${p.nombre}</h2>

<div>${radios}</div>

<select id="select-${index}" class="w-full text-black mt-2 p-2 rounded"></select>

<button onclick="addToCart(${index})" class="btn">Agregar</button>
</div>
`;

/* actualizar select */
updateSelect(index);
document.querySelectorAll(`input[name="tipo-${index}"]`).forEach(r=>{
r.addEventListener("change",()=>updateSelect(index));
});
});

/******** ACTUALIZAR OPCIONES ********/
function updateSelect(i){
const tipo=document.querySelector(`input[name="tipo-${i}"]:checked`).value;
const select=document.getElementById(`select-${i}`);

select.innerHTML=productos[i].opciones[tipo].lista
.map(o=>`<option>${o}</option>`).join("");
}

/******** AGREGAR ********/
function addToCart(i){

const select=document.getElementById(`select-${i}`);
const value=select.value;

const [opcion,precio]=value.split(" - ");
const price=parseInt(precio);

let item=cart.find(p=>p.name===productos[i].nombre && p.opcion===value);

if(item){item.qty++;}
else{
cart.push({
name:productos[i].nombre,
opcion:value,
precio:price,
qty:1
});
}

updateCounter();
}

/******** CONTADOR ********/
function updateCounter(){
let total=cart.reduce((s,p)=>s+p.qty,0);
document.getElementById("contador").innerText=total;
}

/******** MODAL ********/
function openCart(){
const div=document.getElementById("cartItems");
div.innerHTML="";

let total=0;

cart.forEach((p,i)=>{
let sub=p.qty*p.precio;
total+=sub;

div.innerHTML+=`
<div class="mb-2 border-b pb-2">
<b>${p.name}</b><br>
${p.opcion}<br>
${p.qty} x $${p.precio}
<br>
<b>$${sub.toLocaleString("es-CO")}</b>
<br>
<button onclick="removeItem(${i})" class="text-red-500">Eliminar</button>
</div>
`;
});

div.innerHTML+=`<h3 class="mt-3 font-bold">Total: $${total.toLocaleString("es-CO")}</h3>`;

document.getElementById("cartModal").style.display="flex";
}

function closeCart(){
document.getElementById("cartModal").style.display="none";
}

/******** ELIMINAR ********/
function removeItem(i){
cart.splice(i,1);
updateCounter();
openCart();
}

/******** WHATSAPP ********/
function checkout(){

if(cart.length===0){
alert("Agrega productos primero");
return;
}

let total=0;
let msg="Hola, quiero realizar un pedido:%0A%0A";

cart.forEach(p=>{
let sub=p.qty*p.precio;
total+=sub;
msg+=`- ${p.name} (${p.opcion}) x${p.qty} → $${sub.toLocaleString("es-CO")}%0A`;
});

msg+=`%0A💵 Total: $${total.toLocaleString("es-CO")}`;

window.open(`https://wa.me/573239618378?text=${msg}`);
}
