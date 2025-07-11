export class Order {
    constructor(orderId, status = "created") {
        this.orderId = orderId;
        this.status = status;
        this.items = [];
    }

    addItem(item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (item?.name && typeof item.price === 'number') {
                    this.items.push({...item});
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 300);
        });
    }

    removeItem(name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items = this.items.filter(item => item.name !== name);
                resolve(true);
            }, 300);
        });
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    setStatus(newStatus) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.status = newStatus;
                resolve(true);
            }, 300);
        });
    }
}