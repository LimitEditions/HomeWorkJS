let cartItems = [];
async function fetchData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('не удалось получть данные с json');
    }
    const data = await response.json();
    const productBox = document.querySelector('.cards');
    data.forEach(({ image, title, subtitle, prise }, index) => {
      const productEl = `
        <div class="card">
          <div class="img__Card">
            <img src="${image}" alt="${title}">
          </div>
          <div class="text__Card">
            <h4>"${title}"</h4>
            <h3>"${subtitle}"</h3>
            <p>"${prise}"</p>
            <button class="add-btn" id="${index}">Add</button>
          </div>
        </div>`;
      productBox.insertAdjacentHTML("beforeend", productEl);
    });


    const addButton = document.querySelectorAll('.add-btn');
    const hiden = document.querySelector('.hiden');

    addButton.forEach(element => {
      element.addEventListener('click', () => {
        if (cartItems.length === 0) {
          hiden.classList.add('hiden');
        } else {hiden.classList.remove('hiden');
      }
        element.textContent = 'OK';
        element.style.backgroundColor = "#ff6a6a";
        setTimeout(() => {
          element.textContent = 'Add';
          element.style.backgroundColor = "white";
        }, 1000);

        cartItems.push(data[element.id]);
        addCard(data[element.id]);
      })

      function addCard(object) {
        const itemBox = document.querySelector(".card-CartItems");
        const productItem = `
              <div class="product">
              <button class="btn__del">Удалить</button>
              <div class="content">
                <img class="product__img" src="${object.image}" alt="${object.title}" />
                <div class="product__desc">
                  <h2 class="product__name">${object.title}</h2>
                  <p class="product__price_label">
                    Price: <span class="product__price">${object.prise}</span>
                  </p>
                  <p class="product__color">Color:${object.color}</p>
                  <p class="product__size">Size:${object.size}</p>
                  <div class="product__qty">
                    <label class="input__label">Quantity:</label>
                    <input type="text" class="input__quantity" value="${object.quantity}" />
                  </div>
                </div>
              </div>
            </div>`;
        itemBox.insertAdjacentHTML("beforeend", productItem);

        const btns = document.querySelectorAll(".btn__del");
        btns.forEach((el) => {
          el.addEventListener("click", () => {
            const product = el.closest(".product");
            product.remove();
            cartItems.splice(cartItems.indexOf(el), 1);
          })
        })
        // if (cartItems.length === 0) {
        //   hiden.classList.add('hiden');
      }
    });
  } catch (error) {
    console.error(error);
  }
}
fetchData();