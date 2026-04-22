document.addEventListener("DOMContentLoaded", () => {

/******** MODAL ********/
window.closeAlertModal = () =>
document.getElementById("welcomeModal").style.display = "none";

/******** PRODUCTOS ********/
const productos = [
{
nombre:"Netflix",
img:"https://i.imgur.com/qWeIeJQ.jpg",
pantalla:["26 días - 15000"],
cuenta:[]
},
{
nombre:"Disney+",
img:"https://i.imgur.com/rw8oSWW.jpg",
pantalla:["Con ESPN - 10000","Sin ESPN - 8000"],
cuenta:["7 Pantallas - 28000"]
},
{
nombre:"HBO Max",
img:"https://i.imgur.com/MEQjJ5o.jpg",
pantalla:["Estandar - 6500"],
cuenta:["5 Pantallas - 15000"]
}
];

let cart=[];
const cont=document.getElementById("productos");

/******** FORMATO PRECIO ********/
function format(n){
return "$"+n.toLocaleString("es-CO");
}

/******** RENDER ********/
productos.forEach((p,i)=>{

let card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${p.img}" class="product-img">
<h2 class="mt-2 font-bold">${p.nombre}</h2>

<label><input type="radio" name="t${i}" value="pantalla" checked> Pantalla</label>
${p.cuenta.length?`<label class="ml-2"><input type="radio" name="t${i}" value="cuenta"> Cuenta completa</label>`:""}

<select id="s${i}" class="w-full text-black mt-2 p-1 rounded"></select>

<button class="btn">Agregar</button>
`;

cont.appendChild(card);

const select=card.querySelector("select");
const radios=card.querySelectorAll("input");
const btn=card.querySelector("button");

function update(){
let tipo=card.querySelector("input:checked").value;
let lista=tipo==="pantalla"?p.pantalla:p.cuenta;

select.innerHTML="";
lista.forEach(op=>{
let precio=parseInt(op.split(" - ")[1]);
select.innerHTML+=`<option value="${op}">${op.split(" - ")[0]} - ${format(precio)}</option>`;
});
}

radios.forEach(r=>r.addEventListener("change",update));

btn.onclick=()=>{
let val=select.value;
let precio=parseInt(val.split(" - ")[1]);

let item=cart.find(x=>x.name===p.nombre && x.opcion===val);
if(item)item.qty++;
else cart.push({name:p.nombre,opcion:val,precio,qty:1});

updateCounter();
};

update();

});

/******** CARRITO ********/
function updateCounter(){
document.getElementById("contador").innerText=
cart.reduce((s,p)=>s+p.qty,0);
}

window.openCart=()=>{
let div=document.getElementById("cartItems");
div.innerHTML="";
let total=0;

cart.forEach((p,i)=>{
let sub=p.qty*p.precio;
total+=sub;

div.innerHTML+=`
<div style="margin-bottom:10px;">
<b>${p.name}</b><br>
${p.opcion}<br>
${p.qty} x ${format(p.precio)}<br>
<b>${format(sub)}</b><br>

<button onclick="addOne(${i})">+</button>
<button onclick="removeOne(${i})">-</button>
<button onclick="deleteItem(${i})">❌</button>
<hr>
</div>
`;
});

div.innerHTML+=`<b>Total: ${format(total)}</b>`;
document.getElementById("cartModal").style.display="flex";
};

window.closeCart=()=>document.getElementById("cartModal").style.display="none";

window.addOne=i=>{cart[i].qty++;updateCounter();openCart();}
window.removeOne=i=>{cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1);updateCounter();openCart();}
window.deleteItem=i=>{cart.splice(i,1);updateCounter();openCart();}

window.checkout=()=>{
let total=0;
let msg="Hola, quiero pedir:%0A%0A";

cart.forEach(p=>{
let sub=p.qty*p.precio;
total+=sub;
msg+=`- ${p.name} (${p.opcion}) x${p.qty} → ${format(sub)}%0A`;
});

msg+=`%0ATotal: ${format(total)}`;

window.open(`https://wa.me/573239618378?text=${msg}`);
};

});
