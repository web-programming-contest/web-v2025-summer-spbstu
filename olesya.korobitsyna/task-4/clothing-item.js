class ClothingItem {
  constructor(id, name, sizes = [], colors = []) {
    this.id = id;
    this.name = name;
    this.sizes = [...new Set(sizes)];
    this.colors = [...new Set(colors)];
  }

  addSize(size) {
    if (!['S', 'M', 'L', 'XL'].includes(size)) {
      throw new Error('Invalid size. Must be S, M, L or XL');
    }
    if (!this.sizes.includes(size)) {
      this.sizes.push(size);
    }
    return this;
  }

  removeSize(size) {
    this.sizes = this.sizes.filter(s => s !== size);
    return this;
  }

  addColor(color) {
    if (!color || typeof color !== 'string') {
      throw new Error('Color must be a non-empty string');
    }
    const normalizedColor = color.trim().toLowerCase();
    if (!this.colors.some(c => c.toLowerCase() === normalizedColor)) {
      this.colors.push(color.trim());
    }
    return this;
  }

  removeColor(color) {
    const normalizedColor = color.trim().toLowerCase();
    this.colors = this.colors.filter(c => 
      c.toLowerCase() !== normalizedColor
    );
    return this;
  }

  get colorsCount() {
    return this.colors.length;
  }

  get sizesCount() {
    return this.sizes.length;
  }
}

function groupBySize(items) {
  const result = {};
  items.forEach(item => {
    item.sizes.forEach(size => {
      if (!result[size]) result[size] = [];
      result[size].push(item);
    });
  });
  return result;
}

function groupByColorCount(items) {
  return items.reduce((acc, item) => {
    const count = item.colorsCount;
    if (!acc[count]) acc[count] = [];
    acc[count].push(item);
    return acc;
  }, {});
}

function getAllUniqueColors(items) {
  const colorSet = new Set();
  items.forEach(item => {
    item.colors.forEach(color => colorSet.add(color));
  });
  return Array.from(colorSet).sort();
}

function filterByColor(items, color) {
  if (!color) return items;
  const normalizedColor = color.trim().toLowerCase();
  return items.filter(item => 
    item.colors.some(c => c.toLowerCase() === normalizedColor)
  );
}

function filterBySize(items, size) {
  if (!size) return items;
  return items.filter(item => item.sizes.includes(size));
}

function filterByMinColors(items, minColors) {
  return items.filter(item => item.colorsCount > minColors);
}
