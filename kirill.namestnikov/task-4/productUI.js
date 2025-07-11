class ProductUI {
    productManager;
    
    constructor(productManager) {
        this.productManager = productManager;
        this.initElements();
        this.bindEvents();
        this.render();
    }
    
    initElements() {
        this.productIdInput = document.getElementById('productId');
        this.productNameInput = document.getElementById('productName');
        this.productPriceInput = document.getElementById('productPrice');
        this.productSelect = document.getElementById('productSelect');
        this.categoryNameInput = document.getElementById('categoryName');
        this.addProductBtn = document.getElementById('addProductBtn');
        this.addCategoryBtn = document.getElementById('addCategoryBtn');
        this.removeCategoryBtn = document.getElementById('removeCategoryBtn');
        this.productsContainer = document.getElementById('productsContainer');
        this.totalProductsSpan = document.getElementById('totalProducts');
        this.totalCategoriesSpan = document.getElementById('totalCategories');
    }
    
    bindEvents() {
        this.addProductBtn.addEventListener('click', () => this.handleAddProduct());
        this.addCategoryBtn.addEventListener('click', () => this.handleAddCategory());
        this.removeCategoryBtn.addEventListener('click', () => this.handleRemoveCategory());
    }
    
    async handleAddProduct() {
        const id = parseInt(this.productIdInput.value);
        const name = this.productNameInput.value.trim();
        const price = parseFloat(this.productPriceInput.value);
        
        if (isNaN(id) || name === '' || isNaN(price)) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }
        
        const product = new Product(id, name, price);
        const success = await this.productManager.addProduct(product);
        
        if (success) {
            this.productIdInput.value = '';
            this.productNameInput.value = '';
            this.productPriceInput.value = '';
            this.render();
        } else {
            alert('Товар с таким ID уже существует');
        }
    }
    
    async handleAddCategory() {
        const productId = parseInt(this.productSelect.value);
        const category = this.categoryNameInput.value.trim();
        
        if (isNaN(productId) || category === '') {
            alert('Пожалуйста, выберите товар и введите категорию');
            return;
        }
        
        const success = await this.productManager.addCategoryToProduct(productId, category);
        
        if (success) {
            this.categoryNameInput.value = '';
            this.render();
        } else {
            alert('Не удалось добавить категорию');
        }
    }
    
    async handleRemoveCategory() {
        const productId = parseInt(this.productSelect.value);
        const category = this.categoryNameInput.value.trim();
        
        if (isNaN(productId) || category === '') {
            alert('Пожалуйста, выберите товар и введите категорию');
            return;
        }
        
        const success = await this.productManager.removeCategoryFromProduct(productId, category);
        
        if (success) {
            this.categoryNameInput.value = '';
            this.render();
        } else {
            alert('Не удалось удалить категорию');
        }
    }
    
    render() {
        this.renderProductSelect();
        this.renderProducts();
        this.renderStats();
    }
    
    renderProductSelect() {
        this.productSelect.innerHTML = '';
        this.productManager.products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.id} - ${product.name}`;
            this.productSelect.appendChild(option);
        });
    }
    
    renderProducts() {
        this.productsContainer.innerHTML = '';
        
        if (this.productManager.products.length === 0) {
            this.productsContainer.innerHTML = '<p>Нет товаров для отображения</p>';
            return;
        }
        
        this.productManager.products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'product-name';
            nameEl.textContent = product.name;
            
            const priceEl = document.createElement('div');
            priceEl.className = 'product-price';
            priceEl.textContent = `Цена: ${product.price.toFixed(2)}`;
            
            const categoriesEl = document.createElement('div');
            categoriesEl.className = 'categories';
            
            if (product.categories.length === 0) {
                categoriesEl.textContent = 'Нет категорий';
            } else {
                product.categories.forEach(category => {
                    const categoryEl = document.createElement('span');
                    categoryEl.className = 'category';
                    categoryEl.textContent = category;
                    categoriesEl.appendChild(categoryEl);
                });
            }
            
            const buttonsEl = document.createElement('div');
            buttonsEl.className = 'buttons';
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Удалить товар';
            removeBtn.addEventListener('click', async () => {
                const success = await this.productManager.removeProduct(product.id);
                if (success) {
                    this.render();
                } else {
                    alert('Не удалось удалить товар');
                }
            });
            
            buttonsEl.appendChild(removeBtn);
            
            card.appendChild(nameEl);
            card.appendChild(priceEl);
            card.appendChild(categoriesEl);
            card.appendChild(buttonsEl);
            
            this.productsContainer.appendChild(card);
        });
    }
    
    renderStats() {
        this.totalProductsSpan.textContent = this.productManager.products.length;
        
        const uniqueCategories = this.productManager.getUniqueCategories();
        this.totalCategoriesSpan.textContent = uniqueCategories.length;
    }
}