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
"Sin ESPN (sin anuncios) - 8000",
"Sin ESPN (con anuncios) - 6000"
],
cuenta:[
"7 pantallas con ESPN - 28000",
"7 pantallas sin ESPN - 22000"
]
},
{
nombre:"HBO Max",
img:"https://imgur.com/MEQjJ5o.jpg",
pantalla:[
"Estandar - 6500",
"Platino - 9000"
],
cuenta:[
"Max (5 pantallas) - 15000",
"Platino (5 pantallas) - 20000"
]
},
{
nombre:"Crunchyroll",
img:"https://imgur.com/nG42eev.jpg",
pantalla:["Mega Fan - 9000"],
cuenta:["5 pantallas - 15500"]
},
{
nombre:"Prime Video",
img:"https://imgur.com/lIL02hn.jpg",
pantalla:["Pantalla - 7500"],
cuenta:["6 pantallas - 22000"]
},
{
nombre:"Paramount+",
img:"https://imgur.com/A9OoDDR.jpg",
pantalla:["Pantalla - 6500"],
cuenta:["6 pantallas - 16000"]
},
{
nombre:"Vix",
img:"https://imgur.com/xk7TleC.jpg",
pantalla:["Pantalla - 8000"],
cuenta:["5 pantallas - 16000"]
},
{
nombre:"Plex",
img:"https://imgur.com/uH3mttW.jpg",
pantalla:[
"1 mes Roku/IOS - 8000",
"1 mes sin Roku - 6500",
"3 meses - 15000"
],
cuenta:[
"4 pantallas 1 mes Roku - 20000",
"4 pantallas 1 mes - 15000",
"3 meses - 25000",
"6 meses - 45000"
]
},
{
nombre:"Magis TV",
img:"https://imgur.com/Y6wj3CT.jpg",
pantalla:["PRO - 9500"],
cuenta:["Cuenta completa - 16000"]
},
{
nombre:"Spotify",
img:"https://imgur.com/rv3NfbX.jpg",
pantalla:[
"1 mes - 10000",
"3 meses - 25000"
],
cuenta:[]
},
{
nombre:"YouTube Premium",
img:"https://imgur.com/89YQK3J.jpg",
pantalla:["1 mes - 10000"],
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
pantalla:["Estudiantil 1 mes - 12000"],
cuenta:[]
},
{
nombre:"Apple TV",
img:"https://imgur.com/7bhEfFG.jpg",
pantalla:["1 mes sin MLS - 8000"],
cuenta:[]
},
{
nombre:"Office 365",
img:"https://imgur.com/Ys14gGe.jpg",
pantalla:["1 año - 45000"],
cuenta:[]
},
{
nombre:"ChatGPT",
img:"https://imgur.com/JYNI7nF.jpg",
pantalla:["Correo personal - 17000"],
cuenta:[]
},
{
nombre:"CapCut Pro",
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

/******** RENDER ********/
const cont=document.getElementById("productos");

productos.forEach(p=>{
let pantalla = p.pantalla.length ? `
<label>Pantalla</label>
<select id="${p.nombre}-p">
${p.pantalla.map(o=>`<option>${o}</option>`).join("")}
</select>` : "";

let cuenta = p.cuenta.length ? `
<label>Cuenta completa</label>
<select id="${p.nombre}-c">
${p.cuenta.map(o=>`<option>${o}</option>`).join("")}
</select>` : "";

cont.innerHTML+=`
<div class="card">
<img src="${p.img}" class="product-img">
<h2 class="font-bold mt-2">${p.nombre}</h2>

${cuenta}
${pantalla}

<button class="btn" onclick="addToCart('${p.nombre}')">Agregar</button>
</div>
`;
});

/******** AGREGAR ********/
function addToCart(name){

let opcion="";
let precio=0;

const pSel=document.getElementById(name+"-p");
const cSel=document.getElementById(name+"-c");

if(cSel){
opcion="Cuenta completa - "+cSel.value;
precio=parseInt(cSel.value.split(" - ")[1]);
}
else if(pSel){
opcion="Pantalla - "+pSel.value;
precio=parseInt(pSel.value.split(" - ")[1]);
}

let item=cart.find(i=>i.name===name && i.opcion===opcion);

if(item){item.qty++;}
else{cart.push({name,opcion,precio,qty:1});}

updateCounter();
}

/******** CONTADOR ********/
function updateCounter(){
let t=cart.reduce((s,i)=>s+i.qty,0);
document.getElementById("contador").innerText=t;
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
