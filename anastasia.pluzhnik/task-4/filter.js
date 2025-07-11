export function groupOrdersByStatus(orders) {
    return orders.reduce((groups, order) => {
        const status = order.status || 'created';
        groups[status] = groups[status] || [];
        groups[status].push(order);
        return groups;
    }, {});
}

export function getUniqueProducts(orders) {
    const products = new Set();
    orders.forEach(order => {
        order.items.forEach(item => products.add(item.name));
    });
    return [...products];
}

export function groupOrdersByPriceRange(orders) {
    return orders.reduce((ranges, order) => {
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        if (total <= 1000) ranges['0-1000'].push(order);
        else if (total <= 5000) ranges['1001-5000'].push(order);
        else ranges['5001+'].push(order);
        return ranges;
    }, {'0-1000': [], '1001-5000': [], '5001+': []});
}

export function filterOrdersByProduct(orders, productName) {
    return orders.filter(order => 
        order.items.some(item => 
            item.name.toLowerCase().includes(productName.toLowerCase())
        )
    );
}

export function filterOrdersByStatus(orders, status) {
    return orders.filter(order => 
        order.status.toLowerCase() === status.toLowerCase()
    );
}