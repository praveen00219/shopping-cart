const products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

let cart = [];

function renderProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
                            <div class="bg-gray-400 text-white font-semibold flex justify-between gap-10 mt-5 py-2 px-3 items-center">
                                  <span>${product.name}</span>
                                  <span>$${product.price}</span>
                                  <div class="bg-[#3b93a9] border border-black flex rounded-full px-2 gap-3 items-center">
                                        <button onclick="addToCart(${product.id})" class="hover:text-red-500 cursor-pointer">+</button>
                                        <span id="quantity-${product.id}">0</span>
                                        <button onclick="removeFromCart(${product.id})" class="hover:text-red-500 cursor-pointer">-</button>
                                  </div>
                            </div>
    `;
    productsContainer.appendChild(productDiv);
  });
}

function renderCart() {
  const cartContainer = document.getElementById("cart-products");
  const totalPriceElement = document.getElementById("total-price");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "No Product added to the cart";
    totalPriceElement.textContent = "0";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "product";
    cartItemDiv.innerHTML = `
                        <div class="bg-gray-400 text-white font-semibold flex justify-between gap-10 py-2 px-3 items-center">
                           <span>${item.name}</span>
                             <div class="">
                                <span>${item.quantity}</span> x <span>$${item.price}</span>
                             </div>
                        </div>
    `;
    cartContainer.appendChild(cartItemDiv);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  document.getElementById(`quantity-${productId}`).textContent = cartItem
    ? cartItem.quantity
    : 1;
  renderCart();
}

function removeFromCart(productId) {
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity === 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
  }

  document.getElementById(`quantity-${productId}`).textContent = cartItem
    ? cartItem.quantity
    : 0;
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
