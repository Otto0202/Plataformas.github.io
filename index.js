let cart = [];

/******** AGREGAR ********/
function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

/******** MOSTRAR ********/
function updateCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";

  let total = 0;

  cart.forEach((p, i) => {
    const subtotal = p.qty * p.price;
    total += subtotal;

    div.innerHTML += `
      <div class="border p-3 mb-2 rounded">
        <b>${p.name}</b><br>
        ${p.qty} x $${p.price.toLocaleString("es-CO")}
        <br><b>Total: $${subtotal.toLocaleString("es-CO")}</b>
        <div class="mt-2">
          <button onclick="addOne(${i})">+</button>
          <button onclick="removeOne(${i})">-</button>
        </div>
      </div>
    `;
  });

  div.innerHTML += `<h3 class="text-center mt-4">Total: $${total.toLocaleString("es-CO")}</h3>`;
}

/******** SUMAR/RESTAR ********/
function addOne(i) {
  cart[i].qty++;
  updateCart();
}

function removeOne(i) {
  cart[i].qty--;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  updateCart();
}

/******** WHATSAPP ********/
function checkout() {
  if (cart.length === 0) {
    alert("Agrega productos primero");
    return;
  }

  let total = 0;
  let msg = "Hola, quiero realizar un pedido:%0A%0A";

  cart.forEach(p => {
    const subtotal = p.qty * p.price;
    total += subtotal;

    msg += `- ${p.name} x${p.qty} → $${subtotal.toLocaleString("es-CO")}%0A`;
  });

  msg += `%0A💵 Total: $${total.toLocaleString("es-CO")}`;

  const numero = "573239618378";

  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
}
