function saveToStorage(products) {
  if (!Array.isArray(products)) {
    throw new Error("Продукты должны быть массивом");
  }
  if (!products.every((p) => p instanceof Product)) {
    throw new Error("Все элементы должны быть экземплярами Product");
  }

  localStorage.setItem("products", JSON.stringify(products));
}

function loadFromStorage() {
  const data = localStorage.getItem("products");
  if (!data) return [];

  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      throw new Error("Сохранённые данные должны быть массивом");
    }
    return parsed.map((p) => {
      if (!p.id || !p.name || !Array.isArray(p.suppliers)) {
        throw new Error("Некорректный формат данных продукта");
      }
      return new Product(p.id, p.name, p.suppliers);
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных из localStorage:", error.message);
    return [];
  }
}

function simulateAsync(fn, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

let products = loadFromStorage();
if (products.length === 0) {
  products = [
    new Product(1, "Ноутбук", ["TechCorp", "MegaSupply"]),
    new Product(2, "Монитор", ["DisplayWorld"]),
    new Product(3, "Клавиатура", ["MegaSupply", "InputPro"]),
    new Product(4, "Мышь", ["InputPro"]),
    new Product(5, "Системный блок", ["TechCorp", "MegaSupply", "HardCore"]),
  ];
  saveToStorage(products);
}
