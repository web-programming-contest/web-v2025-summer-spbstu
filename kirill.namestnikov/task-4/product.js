class Product{
    id;
    name;
    categories;
    price;
    constructor(id, name, price, categories = []){
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.price = price;
    }

    addCategory(category){
        this.categories.push(category);
    }

    removeCategory(category){
        this.categories = this.categories.filter(c => c !== category);
    }
    get categoryCount(){
        return this.categories.length;
    }
}

let product = new Product(0, "Apple", [], 100);
console.log(product.categoryCount);
product.addCategory("Fruits");
console.log(product.categoryCount);