export class Order {
    static allOrders = [];

    constructor(orderId, status = "created") {
        this.orderId = orderId;
        this.status = status;
        this.items = [];
        Order.allOrders.push(this);
        this.saveToLocalStorage();
    }

    addItem(item) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (typeof item?.name === 'string' && typeof item?.price === 'number') {
                    this.items.push(item);
                    this.saveToLocalStorage();
                    resolve(true);
                } else {
                    console.error('Invalid item format');
                    resolve(false);
                }
            }, 300);
        });
    }

    removeItem(name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items = this.items.filter(item => item.name !== name);
                this.saveToLocalStorage();
                resolve(true);
            }, 300);
        });
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    setStatus(newStatus) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.status = newStatus;
                this.saveToLocalStorage();
                resolve(true);
            }, 300);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('orders', JSON.stringify(Order.allOrders));
    }

    static loadFromLocalStorage() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        Order.allOrders = orders.map(orderData => {
            const order = new Order(orderData.orderId, orderData.status);
            order.items = orderData.items;
            return order;
        });
        return Order.allOrders;
    }

    static deleteOrder(orderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                Order.allOrders = Order.allOrders.filter(order => order.orderId !== orderId);
                localStorage.setItem('orders', JSON.stringify(Order.allOrders));
                resolve(true);
            }, 300);
        });
    }
}

