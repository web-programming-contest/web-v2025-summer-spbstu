let filteredProducts = products;

function showError(message) {
  const messageContainer = document.getElementById("filterMessage");
  messageContainer.innerHTML = `<p class="error">${message}</p>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
}

function renderProducts(prods = filteredProducts) {
  const container = document.getElementById("productList");
  const messageContainer = document.getElementById("filterMessage");
  container.innerHTML = "";
  if (prods.length === 0 && messageContainer.innerHTML === "") {
    messageContainer.innerHTML = "<p>Нет товаров, соответствующих фильтру</p>";
  }

  prods.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const content = document.createElement("div");
    content.className = "product-card-content";

    const title = document.createElement("h4");
    title.textContent = product.name;

    const count = document.createElement("p");
    count.textContent = `Поставщиков: ${product.supplierCount}`;

    const list = document.createElement("ul");
    product.suppliers.forEach((supplier) => {
      const li = document.createElement("li");
      li.textContent = supplier;
      list.appendChild(li);
    });

    content.append(title, count, list);

    const forms = document.createElement("div");
    forms.className = "product-card-forms";

    const addSupplierForm = document.createElement("div");
    addSupplierForm.className = "supplier-form";

    const addInput = document.createElement("input");
    addInput.placeholder = "Добавить поставщика";

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.onclick = async () => {
      const name = addInput.value.trim();
      if (!name) return;
      try {
        await simulateAsync(() => {
          const success = product.addSupplier(name);
          if (!success) {
            throw new Error("Поставщик уже существует");
          }
        });
        saveToStorage(products);
        updateSupplierDropdown();
        applyFilter();
        addInput.value = "";
      } catch (error) {
        showError(error.message);
      }
    };

    addSupplierForm.append(addInput, addBtn);

    const delSupplierForm = document.createElement("div");
    delSupplierForm.className = "supplier-form";

    const delInput = document.createElement("input");
    delInput.placeholder = "Удалить поставщика";

    const delBtn = document.createElement("button");
    delBtn.textContent = "–";
    delBtn.onclick = async () => {
      const name = delInput.value.trim();
      if (!name) return;
      try {
        await simulateAsync(() => {
          const success = product.removeSupplier(name);
          if (!success) {
            throw new Error("Поставщик не найден");
          }
        });
        saveToStorage(products);
        updateSupplierDropdown();
        applyFilter();
        delInput.value = "";
      } catch (error) {
        showError(error.message);
      }
    };

    delSupplierForm.append(delInput, delBtn);

    const removeProductBtn = document.createElement("button");
    removeProductBtn.className = "remove-product-btn";
    removeProductBtn.textContent = "Удалить товар";
    removeProductBtn.onclick = async () => {
      try {
        await simulateAsync(() => {
          products = products.filter((p) => p.id !== product.id);
        });
        saveToStorage(products);
        updateSupplierDropdown();
        applyFilter();
      } catch (error) {
        showError(error.message);
      }
    };

    forms.append(addSupplierForm, delSupplierForm);
    card.append(content, forms, removeProductBtn);
    container.appendChild(card);
  });
}

async function handleAddProduct() {
  const input = document.getElementById("productNameInput");
  const name = input.value.trim();
  if (!name) return;

  try {
    await simulateAsync(() => {
      const id = Date.now();
      const newProduct = new Product(id, name);
      products.push(newProduct);
    });
    saveToStorage(products);
    input.value = "";
    updateSupplierDropdown();
    applyFilter();
  } catch (error) {
    showError(error.message);
  }
}

function updateSupplierDropdown() {
  const supplierSelect = document.getElementById("supplierFilterInput");
  const currentValue = supplierSelect.value;
  supplierSelect.innerHTML = '<option value="">Выберите поставщика</option>';
  const suppliers = getUniqueSuppliers(products);
  suppliers.forEach((supplier) => {
    const option = document.createElement("option");
    option.value = supplier;
    option.textContent = supplier;
    supplierSelect.appendChild(option);
  });
  if (suppliers.includes(currentValue)) {
    supplierSelect.value = currentValue;
  }
}

function updateFilterInput() {
  const filterType = document.getElementById("filterType").value;
  const supplierSelect = document.getElementById("supplierFilterInput");
  const countInput = document.getElementById("supplierCountInput");

  supplierSelect.style.display =
    filterType === "productsBySupplier" ? "inline-block" : "none";
  countInput.style.display =
    filterType === "groupBySupplierCount" ? "inline-block" : "none";

  if (filterType === "productsBySupplier") {
    updateSupplierDropdown();
  }

  updateApplyButtonState(filterType, supplierSelect.value, countInput.value);
}

function updateApplyButtonState(filterType, supplierValue, countValue) {
  const applyBtn = document.getElementById("applyFilterBtn");
  if (filterType === "productsBySupplier" && !supplierValue) {
    applyBtn.disabled = true;
    applyBtn.classList.add("disabled");
  } else if (filterType === "groupBySupplierCount" && !countValue) {
    applyBtn.disabled = true;
    applyBtn.classList.add("disabled");
  } else {
    applyBtn.disabled = false;
    applyBtn.classList.remove("disabled");
  }
}

function applyFilter() {
  const filterType = document.getElementById("filterType").value;
  const supplierSelect = document.getElementById("supplierFilterInput").value;
  const countInput = document.getElementById("supplierCountInput").value;
  const messageContainer = document.getElementById("filterMessage");

  messageContainer.innerHTML = "";

  try {
    switch (filterType) {
      case "all":
        filteredProducts = products;
        break;
      case "productsBySupplier":
        if (!supplierSelect) {
          throw new Error("Выберите поставщика");
        }
        filteredProducts = getProductsBySupplier(products, supplierSelect);
        break;
      case "groupBySupplierCount":
        if (!countInput) {
          throw new Error("Введите количество поставщиков");
        }
        const count = parseInt(countInput);
        if (isNaN(count) || count < 0) {
          throw new Error(
            "Количество поставщиков должно быть неотрицательным числом"
          );
        }
        const byCount = groupBySupplierCount(products);
        filteredProducts = byCount[count] || [];
        break;
      case "maxSuppliers":
        filteredProducts = getWithMaxSuppliers(products);
        break;
    }
    renderProducts();
  } catch (error) {
    showError(error.message);
  }
}

function clearFilter() {
  filteredProducts = products;
  document.getElementById("filterType").value = "all";
  document.getElementById("supplierFilterInput").value = "";
  document.getElementById("supplierCountInput").value = "";
  document.getElementById("supplierFilterInput").style.display = "none";
  document.getElementById("supplierCountInput").style.display = "none";
  document.getElementById("filterMessage").innerHTML = "";
  const applyBtn = document.getElementById("applyFilterBtn");
  applyBtn.disabled = false;
  applyBtn.classList.remove("disabled");
  renderProducts();
}

document.addEventListener("DOMContentLoaded", () => {
  updateFilterInput();
  document
    .getElementById("supplierFilterInput")
    .addEventListener("change", () => {
      const filterType = document.getElementById("filterType").value;
      updateApplyButtonState(
        filterType,
        document.getElementById("supplierFilterInput").value,
        document.getElementById("supplierCountInput").value
      );
    });
  document
    .getElementById("supplierCountInput")
    .addEventListener("input", () => {
      const filterType = document.getElementById("filterType").value;
      updateApplyButtonState(
        filterType,
        document.getElementById("supplierFilterInput").value,
        document.getElementById("supplierCountInput").value
      );
    });
});

renderProducts();
