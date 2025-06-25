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