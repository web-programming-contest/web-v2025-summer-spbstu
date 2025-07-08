class ProductManager{
    products;
    constructor(){
        this.products = [];
        this.load();
    }

    addProduct(product){
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!this.products.some(p => p.id === product.id)){
                    this.products.push(product);
                    this.save();
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }, 500);
        });
    }

    removeProduct(product){
        return new Promise((resolve) => {
            setTimeout(() => {
                const initialSize = this.products.length;
                this.products = this.products.filter(p => p.id !== product.id);
                if (this.products.length < initialSize){
                    this.save();
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }, 500);
        });
    }

    addCategoryToProduct(productId, category) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    product.addCategory(category);
                    this.save();
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 500);
        });
    }
            
    removeCategoryFromProduct(productId, category) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    product.removeCategory(category);
                    this.save();
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 500);
        });
    }

    getProductsByCategory(category){
        let result = [];
        for (product of this.products){
            if (product.categories.includes(category)){
                result.push(product);
            }
        }
        return result;
    }

    getProductsAbovePrice(price){
        let result = [];
        for (product of this.products){
            if (product.price > price){
                result.push(product);
            }
        }
        return result;
    }
    getGroupedByCategories() {
        const grouped = {};
        this.products.forEach(product => {
            product.categories.forEach(category => {
                if (!grouped[category]) {
                    grouped[category] = [];
                }
                grouped[category].push(product);
            });
        });
        return grouped;
    }

    getUniqueCategories() {
        const categories = new Set();
        this.products.forEach(product => {
            product.categories.forEach(category => {
                categories.add(category);
            });
        });
        return Array.from(categories);
    }

    getGroupedByPriceRanges() {
        const ranges = {
            '0-100': [],
            '101-500': [],
            '501-1000': [],
            '1001+': []
        };        
        this.products.forEach(product => {
            if (product.price <= 100) {
                ranges['0-100'].push(product);
            } else if (product.price <= 500) {
                ranges['101-500'].push(product);
            } else if (product.price <= 1000) {
                ranges['501-1000'].push(product);
            } else {
                ranges['1001+'].push(product);
            }
        });            
        return ranges;
    }

    save(){
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    load(){
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            const parsed = JSON.parse(savedProducts);
            this.products = parsed.map(p => new Product(p.id, p.name, p.price, p.categories));
        }
    }
}