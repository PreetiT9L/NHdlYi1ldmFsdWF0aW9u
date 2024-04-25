/*
 * Shopping Cart Requirements:
 * - Before you start, please run `npm run start:api` to start mock API server
 * - data for mock APIs come from ./db/db.json
 * - There are 2 APIs you need to call:
 *     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
 *     - http://localhost:4002/products : this will provide a list of products with full details
 *
 * We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
 * product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
 * inside table#shopping-cart-tbl as below:
 * ID     Item
 * 1001   TV
 * 1002   iPad
 *
 * */
const View = {
  init: async () => {
    const tbodyElem = document
      .getElementById("shopping-cart-tbl")
      .querySelector("tbody");

    try {
      // Fetch the list of product IDs in the cart
      const cartResponse = await fetch("http://localhost:4002/cart");
      const cartData = await cartResponse.json();

      // Fetch the details of the products
      const productsResponse = await fetch("http://localhost:4002/products");
      const productsData = await productsResponse.json();
      // Map product IDs to their corresponding details
      const productDetails = {};
      productsData.forEach((product) => {
        productDetails[product.id] = product.name;
      });

      // Generate HTML for the table rows
      const rowsHTML = cartData
        .map((productId) => {
          console.log(productId, "pp");
          const itemName = productDetails[productId.id];
          console.log(itemName);
          return `<tr><td>${productId.id}</td><td>${itemName}</td></tr>`;
        })
        .join("");

      // Insert the rows into the table body
      tbodyElem.innerHTML = rowsHTML;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};

document.addEventListener("DOMContentLoaded", View.init);
