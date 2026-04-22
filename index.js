let cart = [];

/******** AGREGAR ********/
function addToCart(name) {

  const select = document.getElementById(name);
  const value = select.value;

  const [opcion, precio] = value.split(" - ");
  const price = parseInt(precio);

  let item = cart.find(p => p.name === name && p.option === opcion);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, option: opcion, price, qty: 1 });
  }

  alert("Agregado al carrito ✅");
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

    msg += `- ${p.name} (${p.option}) x${p.qty} → $${subtotal.toLocaleString("es-CO")}%0A`;
  });

  msg += `%0A💵 Total: $${total.toLocaleString("es-CO")}`;

  window.open(`https://wa.me/573239618378?text=${msg}`, "_blank");
}
