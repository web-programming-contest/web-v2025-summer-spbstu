class ClothingItem {
    constructor(id, name, size, colors = []) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.colors = colors;        
    }

    get colorsCount() {
        return this.colors.length;
    }

    addColor(color) {
        this.colors.push(color);
    }

    removeColor(color) {
        let idx = this.colors.indexOf(color);

        if (idx > -1) {
            this.colors.splice(idx, 1);
        }
    }
}

function getAllUniqueColors(items) {
    let result = new Set();

    for (let item of items) {
        for (let color of item.colors) {
            result.add(color);
        }
    }
    return result;
}

function getItemsByColor(items, color) {
    return items.filter((item) => item.colors.indexOf(color) > -1);
}

function getItemsWithNColors(items, n) {
    return items.filter((item) => item.colorsCount > n);
}

function groupBySize(items) {
    items.sort((itemA, itemB) => {
        let sizeMap = {
            "S": 1,
            "M": 2,
            "L": 3,
            "XL": 4,
        };

        return sizeMap[itemA.size] < sizeMap[itemB.size] ? -1 : 1;
    });
}

function groupByColorsNum(items) {
    items.sort((itemA, itemB) => {
        return itemA.colorsCount < itemB.colorsCount ? -1 : 1;
    });
}

let a = new ClothingItem(1, "a", "S", [1, 2, 3]);
let b = new ClothingItem(3, "b", "S", [1, 2]);
let c = new ClothingItem(4, "c", "M", [1]);
let d = new ClothingItem(5, "d", "S", [1, 2, 3]);
let e = new ClothingItem(6, "e", "L", [1, 2]);
let f = new ClothingItem(7, "f", "XL", [1, 2, 3, 4]);
let g = new ClothingItem(8, "g", "M", [1]);
let items = [a, b, c, d, e, f, g];
groupBySize(items);
groupByColorsNum(items);
console.log("");
