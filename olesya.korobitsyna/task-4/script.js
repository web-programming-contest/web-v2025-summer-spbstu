class ClothingManager {
  constructor() {
    this.items = this.loadItems();
    this.initUI();
    this.populateColorFilter();
    this.renderItems();
    this.setupBeforeUnload();
  }

  loadItems() {
    const savedItems = localStorage.getItem('clothingItems');
    if (savedItems) {
      const parsed = JSON.parse(savedItems);
      return parsed.map(item => new ClothingItem(
        item.id, 
        item.name, 
        item.sizes || [item.size].filter(Boolean),
        item.colors || []
      ));
    }
    return [
      new ClothingItem(1, 'Classic T-Shirt', ['S', 'M', 'L'], ['white', 'black']),
      new ClothingItem(2, 'Slim Fit Jeans', ['M', 'L'], ['blue', 'black']),
      new ClothingItem(3, 'Winter Jacket', ['L', 'XL'], ['black', 'gray']),
      new ClothingItem(4, 'Summer Dress', ['S', 'M'], ['red', 'pink', 'white']),
      new ClothingItem(5, 'Oversized Hoodie', ['M', 'L', 'XL'], ['black', 'white', 'gray'])
    ];
  }

  saveItems() {
    localStorage.setItem('clothingItems', JSON.stringify(this.items));
  }

  setupBeforeUnload() {
    window.addEventListener('beforeunload', () => {
      this.saveItems();
    });
  }

  populateColorFilter() {
    const colorSelect = document.getElementById('filterByColor');
    const uniqueColors = getAllUniqueColors(this.items);
    
    while (colorSelect.options.length > 1) {
      colorSelect.remove(1);
    }
    
    uniqueColors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
  }

  initUI() {
    ['addItem', 'addColor', 'addSize', 'removeColor', 'removeSize', 'removeItem'].forEach(action => {
      document.getElementById(`show${action.charAt(0).toUpperCase() + action.slice(1)}Form`)
        .addEventListener('click', () => this.toggleForm(`${action}Form`));
      document.getElementById(`cancel${action.charAt(0).toUpperCase() + action.slice(1)}`)
        .addEventListener('click', () => this.toggleForm(`${action}Form`));
    });
    
    document.getElementById('submitItem').addEventListener('click', () => this.handleAddItem());
    document.getElementById('submitColor').addEventListener('click', () => this.handleAddColor());
    document.getElementById('submitSize').addEventListener('click', () => this.handleAddSize());
    document.getElementById('submitRemoveColor').addEventListener('click', () => this.handleRemoveColor());
    document.getElementById('submitRemoveSize').addEventListener('click', () => this.handleRemoveSize());
    document.getElementById('submitRemoveItem').addEventListener('click', () => this.handleRemoveItem());
    
    document.getElementById('applyColorFilter').addEventListener('click', () => this.applyAllFilters());
    document.getElementById('clearColorFilter').addEventListener('click', () => {
      document.getElementById('filterByColor').value = '';
      this.applyAllFilters();
    });
    document.getElementById('applySizeFilter').addEventListener('click', () => this.applyAllFilters());
    document.getElementById('clearSizeFilter').addEventListener('click', () => {
      document.getElementById('filterBySize').value = '';
      this.applyAllFilters();
    });
    document.getElementById('applyMinColorsFilter').addEventListener('click', () => this.applyAllFilters());
    document.getElementById('clearMinColorsFilter').addEventListener('click', () => {
      document.getElementById('filterByMinColors').value = '';
      this.applyAllFilters();
    });
    document.getElementById('applyAllFilters').addEventListener('click', () => this.applyAllFilters());
    document.getElementById('clearAllFilters').addEventListener('click', () => {
      document.getElementById('filterByColor').value = '';
      document.getElementById('filterBySize').value = '';
      document.getElementById('filterByMinColors').value = '';
      this.renderItems();
    });
    
    document.getElementById('showGroupBySize').addEventListener('click', () => this.showGroupBySize());
    document.getElementById('closeGroupBySize').addEventListener('click', () => this.closeGroupBySize());
    document.getElementById('showGroupByColorCount').addEventListener('click', () => this.showGroupByColorCount());
    document.getElementById('closeGroupByColorCount').addEventListener('click', () => this.closeGroupByColorCount());
    document.getElementById('showUniqueColors').addEventListener('click', () => this.showUniqueColors());
    document.getElementById('closeUniqueColors').addEventListener('click', () => this.closeUniqueColors());
  }

  toggleForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }

  async handleAddItem() {
    try {
      const id = parseInt(document.getElementById('itemId').value);
      const name = document.getElementById('itemName').value.trim();
      const colorInput = document.getElementById('initialColors').value.trim();
      const colors = colorInput ? colorInput.split(',').map(c => c.trim()).filter(c => c) : [];
      
      const sizeCheckboxes = document.querySelectorAll('input[name="size"]:checked');
      const sizes = Array.from(sizeCheckboxes).map(cb => cb.value);
      
      if (!id || !name || sizes.length === 0) {
        throw new Error('Please fill all required fields');
      }
      
      if (this.items.some(item => item.id === id)) {
        throw new Error('Item with this ID already exists');
      }
      
      await this.delayOperation(() => {
        const newItem = new ClothingItem(id, name, sizes, colors);
        this.items.push(newItem);
        this.saveAndRender();
        this.resetForm('addItemForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async handleAddColor() {
    try {
      const itemId = parseInt(document.getElementById('colorItemId').value);
      const color = document.getElementById('newColor').value.trim();
      
      if (!itemId || !color) {
        throw new Error('Please fill all fields');
      }
      
      const item = this.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      
      await this.delayOperation(() => {
        item.addColor(color);
        this.saveAndRender();
        this.resetForm('addColorForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async handleAddSize() {
    try {
      const itemId = parseInt(document.getElementById('sizeItemId').value);
      const size = document.getElementById('newSize').value;
      
      if (!itemId || !size) {
        throw new Error('Please fill all fields');
      }
      
      const item = this.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      
      await this.delayOperation(() => {
        item.addSize(size);
        this.saveAndRender();
        this.resetForm('addSizeForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async handleRemoveColor() {
    try {
      const itemId = parseInt(document.getElementById('removeColorItemId').value);
      const color = document.getElementById('colorToRemove').value.trim();
      
      if (!itemId || !color) {
        throw new Error('Please fill all fields');
      }
      
      const item = this.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      
      if (!item.colors.some(c => c.toLowerCase() === color.toLowerCase())) {
        throw new Error('Color not found for this item');
      }
      
      await this.delayOperation(() => {
        item.removeColor(color);
        this.saveAndRender();
        this.resetForm('removeColorForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async handleRemoveSize() {
    try {
      const itemId = parseInt(document.getElementById('removeSizeItemId').value);
      const size = document.getElementById('sizeToRemove').value;
      
      if (!itemId || !size) {
        throw new Error('Please fill all fields');
      }
      
      const item = this.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found');
      }
      
      if (!item.sizes.includes(size)) {
        throw new Error('Size not found for this item');
      }
      
      await this.delayOperation(() => {
        item.removeSize(size);
        this.saveAndRender();
        this.resetForm('removeSizeForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  async handleRemoveItem() {
    try {
      const itemId = parseInt(document.getElementById('itemToRemove').value);
      
      if (!itemId) {
        throw new Error('Please enter item ID');
      }
      
      const index = this.items.findIndex(item => item.id === itemId);
      if (index === -1) {
        throw new Error('Item not found');
      }
      
      if (!confirm(`Are you sure you want to delete item ${itemId}?`)) {
        return;
      }
      
      await this.delayOperation(() => {
        this.items.splice(index, 1);
        this.saveAndRender();
        this.resetForm('removeItemForm');
      });
    } catch (error) {
      alert(error.message);
    }
  }

  applyAllFilters() {
    const color = document.getElementById('filterByColor').value.trim();
    const size = document.getElementById('filterBySize').value;
    const minColors = parseInt(document.getElementById('filterByMinColors').value) || 0;
    
    let filteredItems = [...this.items];
    
    if (color) {
      filteredItems = filterByColor(filteredItems, color);
    }
    
    if (size) {
      filteredItems = filterBySize(filteredItems, size);
    }
    
    if (minColors > 0) {
      filteredItems = filterByMinColors(filteredItems, minColors);
    }
    
    this.renderItems(filteredItems);
  }

  saveAndRender() {
    this.saveItems();
    this.populateColorFilter();
    this.renderItems();
  }

  resetForm(formId) {
    const form = document.getElementById(formId);
    form.querySelectorAll('input').forEach(input => {
      if (!['submit', 'button'].includes(input.type)) {
        input.value = '';
      }
    });
    
    if (formId === 'addItemForm') {
      document.querySelectorAll('input[name="size"]').forEach(cb => {
        cb.checked = false;
      });
    }
    
    this.toggleForm(formId);
  }

  delayOperation(operation) {
    return new Promise(resolve => {
      setTimeout(() => {
        operation();
        resolve();
      }, 500);
    });
  }

  renderItems(items = this.items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    
    if (items.length === 0) {
      container.innerHTML = '<p>No items found</p>';
      return;
    }
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      
      const title = document.createElement('h3');
      title.textContent = `${item.name} (ID: ${item.id})`;
      
      const sizes = document.createElement('p');
      sizes.innerHTML = `Sizes: ${item.sizes.map(s => `<span class="size-chip">${s}</span>`).join(' ')}`;
      
      const colorsTitle = document.createElement('p');
      colorsTitle.textContent = 'Colors:';
      
      const colorsContainer = document.createElement('div');
      colorsContainer.innerHTML = item.colors.map(c => `<span class="color-chip">${c}</span>`).join(' ');
      
      const counts = document.createElement('p');
      counts.textContent = `Sizes: ${item.sizesCount} | Colors: ${item.colorsCount}`;
      
      card.appendChild(title);
      card.appendChild(sizes);
      card.appendChild(colorsTitle);
      card.appendChild(colorsContainer);
      card.appendChild(counts);
      
      container.appendChild(card);
    });
  }

  showGroupBySize() {
    const container = document.getElementById('sizeGroups');
    container.innerHTML = '';
    
    const grouped = groupBySize(this.items);
    const sizeOrder = ['S', 'M', 'L', 'XL'];
    
    sizeOrder.forEach(size => {
      if (grouped[size]) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'size-group';
        
        const title = document.createElement('h3');
        title.textContent = `Size ${size} (${grouped[size].length} items)`;
        
        const itemsList = document.createElement('div');
        itemsList.innerHTML = grouped[size].map(item => 
          `<div class="card">${item.name} (ID: ${item.id}) - Colors: ${item.colors.join(', ')}</div>`
        ).join('');
        
        groupDiv.appendChild(title);
        groupDiv.appendChild(itemsList);
        container.appendChild(groupDiv);
      }
    });
    
    document.getElementById('groupBySizeContainer').style.display = 'block';
  }

  closeGroupBySize() {
    document.getElementById('groupBySizeContainer').style.display = 'none';
  }

  showGroupByColorCount() {
    const container = document.getElementById('colorCountGroups');
    container.innerHTML = '';
    
    const grouped = groupByColorCount(this.items);
    const sortedCounts = Object.keys(grouped).sort((a, b) => a - b);
    
    sortedCounts.forEach(count => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'color-count-group';
      
      const title = document.createElement('h3');
      title.textContent = `Items with ${count} color(s)`;
      
      const itemsList = document.createElement('div');
      itemsList.innerHTML = grouped[count].map(item => 
        `<div class="card">${item.name} (ID: ${item.id}) - Sizes: ${item.sizes.join(', ')}</div>`
      ).join('');
      
      groupDiv.appendChild(title);
      groupDiv.appendChild(itemsList);
      container.appendChild(groupDiv);
    });
    
    document.getElementById('groupByColorCountContainer').style.display = 'block';
  }

  closeGroupByColorCount() {
    document.getElementById('groupByColorCountContainer').style.display = 'none';
  }

  showUniqueColors() {
    const container = document.getElementById('uniqueColorsList');
    const colors = getAllUniqueColors(this.items);
    
    container.innerHTML = colors.length ? 
      colors.map(color => `<span class="color-chip">${color}</span>`).join(' ') : 
      '<p>No colors found</p>';
    
    document.getElementById('uniqueColorsContainer').style.display = 'block';
  }

  closeUniqueColors() {
    document.getElementById('uniqueColorsContainer').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => new ClothingManager());
