class Product {
  name;
  #id;
  #suppliers;

  constructor(id, name, suppliers = []) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("ID должен быть положительным целым числом");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Название товара должно быть непустой строкой");
    }
    if (name.length > 100) {
      throw new Error("Название товара не должно превышать 100 символов");
    }
    if (!Array.isArray(suppliers)) {
      throw new Error("Поставщики должны быть массивом");
    }

    this.name = name.trim();
    this.#id = id;
    this.#suppliers = [];
    suppliers.forEach((s) => this.addSupplier(s));
  }

  addSupplier(supplierName) {
    if (typeof supplierName !== "string" || supplierName.trim() === "") {
      throw new Error("Имя поставщика должно быть непустой строкой");
    }
    if (supplierName.length > 50) {
      throw new Error("Имя поставщика не должно превышать 50 символов");
    }

    const trimmedName = supplierName.trim();
    if (!this.#suppliers.includes(trimmedName)) {
      this.#suppliers.push(trimmedName);
      return true;
    }
    return false;
  }

  removeSupplier(supplierName) {
    if (typeof supplierName !== "string") {
      throw new Error("Имя поставщика должно быть строкой");
    }

    const initialLength = this.#suppliers.length;
    this.#suppliers = this.#suppliers.filter(
      (supplier) => supplier !== supplierName.trim()
    );
    return initialLength !== this.#suppliers.length;
  }

  get id() {
    return this.#id;
  }

  get suppliers() {
    return [...this.#suppliers];
  }

  get supplierCount() {
    return this.#suppliers.length;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.name,
      suppliers: this.suppliers,
    };
  }
}

function groupBySupplier(products) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }

  const supplier_products_map = {};
  for (const product of products) {
    if (!(product instanceof Product)) {
      throw new Error("Все элементы должны быть экземплярами Product");
    }
    for (const supplier of product.suppliers) {
      if (!supplier_products_map[supplier]) {
        supplier_products_map[supplier] = [];
      }
      supplier_products_map[supplier].push(product);
    }
  }
  return supplier_products_map;
}

function getUniqueSuppliers(products) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }

  const result = new Set();
  for (const product of products) {
    if (!(product instanceof Product)) {
      throw new Error("Все элементы должны быть экземплярами Product");
    }
    for (const supplier of product.suppliers) {
      result.add(supplier);
    }
  }
  return [...result];
}

function getProductsBySupplier(products, supplierName) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }
  if (typeof supplierName !== "string" || supplierName.trim() === "") {
    throw new Error("Имя поставщика должно быть непустой строкой");
  }

  return products.filter((product) => {
    if (!(product instanceof Product)) {
      throw new Error("Все элементы должны быть экземплярами Product");
    }
    return product.suppliers.includes(supplierName.trim());
  });
}

function groupBySupplierCount(products) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }

  const supplier_count_products_map = {};
  for (const product of products) {
    if (!(product instanceof Product)) {
      throw new Error("Все элементы должны быть экземплярами Product");
    }
    const count = product.supplierCount;
    if (!supplier_count_products_map[count]) {
      supplier_count_products_map[count] = [];
    }
    supplier_count_products_map[count].push(product);
  }
  return supplier_count_products_map;
}

function getWithMaxSuppliers(products) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }

  if (products.length === 0) return [];
  const max = Math.max(
    ...products.map((p) => {
      if (!(p instanceof Product)) {
        throw new Error("Все элементы должны быть экземплярами Product");
      }
      return p.supplierCount;
    })
  );
  return products.filter((p) => p.suppliers.length === max);
}
