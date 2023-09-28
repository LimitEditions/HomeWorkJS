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
    const basket = document.querySelector('.basket');

    addButton.forEach(element => {
      element.addEventListener('click', () => {
        basket.classList.remove('hidden');

        element.textContent = 'OK';
        element.style.backgroundColor = "#ff6a6a";
        setTimeout(() => {
          element.textContent = 'Add';
          element.style.backgroundColor = "white";
        }, 1000);

        setTimeout(() => {
          cartItems.push(data[element.id]);
          addCard(data[element.id], element.id);
        }, 100);
      })

      function addCard(object, id) {
        const itemBox = document.querySelector(".card-CartItems");
        const productItem = `
              <div class="product">
              <button class="btn__del" id="btn_del_${id}">Удалить</button>
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

        const btns = document.getElementById("btn_del_" + id);
          btns.addEventListener("click", () => {
            const product = btns.closest(".product");
            product.remove();
            cartItems.splice(cartItems.indexOf(btns), 1);
            if (cartItems.length === 0) {
              basket.classList.add('hidden');
            }
        })
      }
    });
  } catch (error) {
    console.error(error);
  }
}
fetchData();
