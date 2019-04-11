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
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(products => {
            result += 
            `
            <!-- single product -->
            <article class="product">
              <div class="img-container">
                <img src="./images/product-1.jpeg" alt="product" class="product-img">
                <button class="bag-btn" data-id="1">
                  <i class="fas fa-shoppig-cart"></i>
                  Add to bag
                </button>
              </div>
              <h3>queen bed</h3>
              <h4>$1252</h4>
            </article>
            <!-- end of single proudct -->
            `;
            
        });
        productsDOM.innerHTML = result;
    }
}

class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products => ui.displayProducts(products));

});