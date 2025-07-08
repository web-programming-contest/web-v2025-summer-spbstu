import { Order } from "./order.js";

export function groupOrdersByStatus(orders) {
    return orders.reduce((acc, order) => {
        if (!acc[order.status]) {
            acc[order.status] = [];
        }
        acc[order.status].push(order);
        return acc;
    }, {});
}

export function getUniqueProducts(orders) {
    const products = new Set();
    orders.forEach(order => {
        order.items.forEach(item => products.add(item.name));
    });
    return Array.from(products);
}

export function groupOrdersByPriceRange(orders) {
    const ranges = {
        '0-1000': [],
        '1001-5000': [],
        '5001+': []
    };
    
    orders.forEach(order => {
        const total = order.getTotal();
        if (total <= 1000) ranges['0-1000'].push(order);
        else if (total <= 5000) ranges['1001-5000'].push(order);
        else ranges['5001+'].push(order);
    });
    
    return ranges;
}

export function filterOrdersByProduct(orders, productName) {
    return orders.filter(order => 
        order.items.some(item => item.name === productName)
    );
}

export function filterOrdersByStatus(orders, status) {
    return orders.filter(order => order.status === status);
}