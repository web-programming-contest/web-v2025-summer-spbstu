class Product {
    id;
    name;
    price;
    categories;
    
    constructor(id, name, price, categories = []) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categories = Array.isArray(categories) ? categories : [];
    }
    
    addCategory(category) {
        if (!this.categories.includes(category)) {
            this.categories.push(category);
        }
    }
    
    removeCategory(category) {
        this.categories = this.categories.filter(c => c !== category);
    }
    
    get categoryCount() {
        return this.categories.length;
    }
}