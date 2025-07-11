export class StorageService {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.orders = this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];
        
        try {
            return JSON.parse(data).map(orderData => ({
                orderId: orderData.orderId,
                status: orderData.status || 'created',
                items: orderData.items || []
            }));
        } catch (e) {
            console.error('Failed to parse orders from localStorage', e);
            return [];
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.orders));
    }

    addOrder(order) {
        this.orders.push({
            orderId: order.orderId,
            status: order.status,
            items: [...order.items]
        });
        this.saveToLocalStorage();
    }

    deleteOrder(orderId) {
        this.orders = this.orders.filter(o => o.orderId !== orderId);
        this.saveToLocalStorage();
    }

    updateOrder(updatedOrder) {
        const index = this.orders.findIndex(o => o.orderId === updatedOrder.orderId);
        if (index !== -1) {
            this.orders[index] = {
                orderId: updatedOrder.orderId,
                status: updatedOrder.status,
                items: [...updatedOrder.items]
            };
            this.saveToLocalStorage();
        }
    }

    getAllOrders() {
        return [...this.orders];
    }

    getOrderById(orderId) {
        return this.orders.find(o => o.orderId === orderId);
    }

    orderExists(orderId) {
        return this.orders.some(o => o.orderId === orderId);
    }
}
