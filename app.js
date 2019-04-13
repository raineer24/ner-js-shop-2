//variables

const cartBTN = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const clearCart = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');


//cart
let cart = [];

// buttons
let buttonsDOM = [];

//getting the products 
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {
                    title,
                    price
                } = item.fields;
                const {
                    id
                } = item.sys;
                const image = item.fields.image.fields.file.url;
                return {
                    title,
                    price,
                    id,
                    image
                };

            });

            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
//display the products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result +=
                `
            <!-- single product -->
            <article class="product">
              <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                  <i class="fas fa-shoppig-cart"></i>
                  Add to bag
                </button>
              </div>
              <h3>${product.title}</h3>
              <h4>$${product.price}</h4>
            </article>
            <!-- end of single proudct -->
            `;

        });
        productsDOM.innerHTML = result;
    };
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        //buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = 'In Cart';
                button.disabled = true;
            }
            button.addEventListener("click", event => {
                event.target.innerText = 'In Cart';
                event.target.disabled = true;
                //get product from products
                //let cartItem = Storage.getProduct(id);
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount: 1
                }
                // add product to the cart
                cart = [...cart, cartItem]
                // save cart in localStorage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
                // display cart Items
                //shw the cart                    
            });


        });
    }
    setCartValues() {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;

        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    };
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = 
        `
        <img src="./images/product-1.jpeg" alt="product">
        <div>
          <h4>queen bed</h4>
          <h5>$24.00</h5>
          <span class="remove-item">remove</span>
        </div>
        <div>
          <i class="fas fa-chevron-up"></i>
          <p class="item-amount">1</p>
          <i class="fas fa-chevron-down"></i>
        </div>
        `
    }
} // end display products

//local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    Storage.saveProducts(products);


    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });

});