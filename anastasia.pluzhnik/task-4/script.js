import { Order } from './order.js';
import { StorageService } from './storage-service.js';
import { 
    groupOrdersByStatus, 
    getUniqueProducts, 
    groupOrdersByPriceRange,
    filterOrdersByProduct,
    filterOrdersByStatus
} from './filter.js';

const storageService = new StorageService('orders');

document.addEventListener('DOMContentLoaded', () => {
    renderOrders();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('add-order-btn').addEventListener('click', addNewOrder);
    document.getElementById('delete-order-btn').addEventListener('click', deleteOrder);
    document.getElementById('add-item-btn').addEventListener('click', addItemToOrder);
    document.getElementById('remove-item-btn').addEventListener('click', removeItemFromOrder);
    document.getElementById('group-by-status').addEventListener('click', showOrdersByStatus);
    document.getElementById('show-unique-products').addEventListener('click', showUniqueProducts);
    document.getElementById('show-by-price-range').addEventListener('click', showByPriceRange);
    document.getElementById('filter-by-product').addEventListener('click', filterByProduct);
    document.getElementById('filter-by-status').addEventListener('click', filterByStatus);
}

async function addNewOrder() {
    const orderIdInput = document.getElementById('order-id-input');
    const orderId = parseInt(orderIdInput.value);
    
    clearMessages();
    
    if (isNaN(orderId)) {
        showError('Пожалуйста, введите корректный номер заказа');
        return;
    }
    
    if (orderId <= 0) {
        showError('ID заказа должен быть положительным числом');
        return;
    }
    
    if (storageService.orderExists(orderId)) {
        showError('Заказ с таким ID уже существует');
        return;
    }
    
    const newOrder = new Order(orderId);
    storageService.addOrder(newOrder);
    orderIdInput.value = '';
    showSuccess('Заказ успешно создан');
    renderOrders();
}

async function deleteOrder() {
    const orderIdInput = document.getElementById('order-id-input');
    const orderId = parseInt(orderIdInput.value);
    
    clearMessages();
    
    if (isNaN(orderId)) {
        showError('Пожалуйста, введите корректный номер заказа');
        return;
    }
    
    if (!storageService.orderExists(orderId)) {
        showError('Заказ с таким ID не найден');
        return;
    }
    
    storageService.deleteOrder(orderId);
    orderIdInput.value = '';
    showSuccess('Заказ успешно удален');
    renderOrders();
}

async function addItemToOrder() {
    const orderIdInput = document.getElementById('item-order-id-input');
    const nameInput = document.getElementById('item-name-input');
    const priceInput = document.getElementById('item-price-input');
    
    const orderId = parseInt(orderIdInput.value);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    
    clearMessages();
    
    if (isNaN(orderId)) {
        showError('Введите корректный ID заказа');
        return;
    }
    
    if (!name) {
        showError('Введите название товара');
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showError('Введите корректную цену (положительное число)');
        return;
    }
    
    const order = storageService.getOrderById(orderId);
    if (!order) {
        showError('Заказ не найден');
        return;
    }
    
    const orderInstance = new Order(order.orderId, order.status);
    orderInstance.items = [...order.items];
    
    await orderInstance.addItem({ name, price });
    
    storageService.updateOrder(orderInstance);
    nameInput.value = '';
    priceInput.value = '';
    showSuccess('Товар успешно добавлен');
    renderOrders();
}

async function removeItemFromOrder() {
    const orderIdInput = document.getElementById('item-order-id-input');
    const nameInput = document.getElementById('item-name-input');
    
    const orderId = parseInt(orderIdInput.value);
    const name = nameInput.value.trim();
    
    clearMessages();
    
    if (isNaN(orderId)) {
        showError('Введите корректный ID заказа');
        return;
    }
    
    if (!name) {
        showError('Введите название товара');
        return;
    }
    
    const order = storageService.getOrderById(orderId);
    if (!order) {
        showError('Заказ не найден');
        return;
    }
    
    const itemExists = order.items.some(item => 
        item.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!itemExists) {
        showError('Товар не найден в заказе');
        return;
    }
    
    const orderInstance = new Order(order.orderId, order.status);
    orderInstance.items = [...order.items];
    
    await orderInstance.removeItem(name);
    storageService.updateOrder(orderInstance);
    nameInput.value = '';
    showSuccess('Товар успешно удален');
    renderOrders();
}

function showOrdersByStatus() {
    const orders = storageService.getAllOrders();
    const grouped = groupOrdersByStatus(orders);
    let html = '<div class="analytics-result"><h3>Группировка заказов по статусу</h3>';
    
    for (const [status, orders] of Object.entries(grouped)) {
        html += `<div class="analytics-item">
            <div class="analytics-title">${status} (${orders.length} заказов):</div>
            ${orders.map(o => `#${o.orderId}`).join(', ')}
        </div>`;
    }
    
    html += '</div>';
    document.getElementById('analytics-container').innerHTML = html;
}

function showUniqueProducts() {
    const orders = storageService.getAllOrders();
    const products = getUniqueProducts(orders);
    const html = `
        <div class="analytics-result">
            <h3>Уникальные товары (${products.length})</h3>
            <div class="analytics-item">
                <ul class="product-list">
                    ${products.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    document.getElementById('analytics-container').innerHTML = html;
}

function showByPriceRange() {
    const orders = storageService.getAllOrders();
    const ranges = orders.reduce((result, order) => {
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        if (total <= 1000) result['0-1000'].push(order);
        else if (total <= 5000) result['1001-5000'].push(order);
        else result['5001+'].push(order);
        return result;
    }, {'0-1000': [], '1001-5000': [], '5001+': []});

    let html = '<div class="analytics-result"><h3>Группировка заказов по сумме</h3>';
    for (const [range, orders] of Object.entries(ranges)) {
        html += `<div class="analytics-item">
            <div class="analytics-title">${range} руб. (${orders.length}):</div>
            ${orders.map(o => `#${o.orderId}`).join(', ')}
        </div>`;
    }
    html += '</div>';
    document.getElementById('analytics-container').innerHTML = html;
}

function filterByProduct() {
    const product = prompt('Введите название товара:');
    if (product && product.trim()) {
        const searchTerm = product.trim().toLowerCase();
        const orders = storageService.getAllOrders();
        const filtered = orders.filter(order => 
            order.items.some(item => 
                item.name.toLowerCase().includes(searchTerm)
            )
        );
        renderFilteredResults(filtered, `Заказы, содержащие "${product}"`);
    }
}

function filterByStatus() {
    const status = prompt('Введите статус (created, processing, sent, completed, cancelled):');
    if (status && status.trim()) {
        const validStatuses = ['created', 'processing', 'sent', 'completed', 'cancelled'];
        const normalizedStatus = status.trim().toLowerCase();
        
        if (!validStatuses.includes(normalizedStatus)) {
            alert('Некорректный статус. Допустимые значения: created, processing, sent, completed, cancelled');
            return;
        }
        
        const orders = storageService.getAllOrders();
        const filtered = filterOrdersByStatus(orders, normalizedStatus);
        renderFilteredResults(filtered, `Заказы со статусом "${normalizedStatus}"`);
    }
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    const orders = storageService.getAllOrders();
    
    container.innerHTML = orders.length ? '' : '<p class="no-orders">Нет заказов</p>';

    orders.forEach(order => {
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <h3>Заказ #${order.orderId}</h3>
            <div class="status-control">
                <span>Статус: </span>
                <select class="status-select" data-order-id="${order.orderId}">
                    ${['created', 'processing', 'sent', 'completed', 'cancelled'].map(s => 
                        `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="items-list">
                <h4>Товары (${order.items.length}):</h4>
                <ul>
                    ${order.items.map(i => `<li>${i.name} - ${i.price.toFixed(2)} руб.</li>`).join('') || '<li>Нет товаров</li>'}
                </ul>
            </div>
            <div class="total">Итого: ${total.toFixed(2)} руб.</div>
        `;
        container.appendChild(card);
    });

    setupStatusChangeHandlers();
}

function renderFilteredResults(orders, title) {
    const html = `<div class="analytics-result">
        <h3>${title} (${orders.length} заказов)</h3>
        <div class="analytics-item">
            ${orders.length > 0 ? 
                orders.map(o => `
                    <div class="order-card compact">
                        <h4>Заказ #${o.orderId}</h4>
                        <div>Статус: ${o.status}</div>
                        <div>Товаров: ${o.items.length}</div>
                        <div>Сумма: ${o.getTotal()} руб.</div>
                    </div>
                `).join('') : 
                '<p>Нет заказов по заданному критерию</p>'}
        </div>
    </div>`;
    document.getElementById('analytics-container').innerHTML = html;
}

function setupStatusChangeHandlers() {
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const newStatus = e.target.value;
            const order = storageService.getOrderById(orderId);
            
            if (order) {
                const orderInstance = new Order(order.orderId, order.status);
                orderInstance.items = [...order.items];
                
                await orderInstance.setStatus(newStatus);
                orderInstance.status = newStatus;
                storageService.updateOrder(orderInstance);
                renderOrders();
            }
        });
    });
}

function showError(message, inputElement = null) {
    clearMessages();
    
    const container = document.querySelector('.container');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message; 
    
    container.prepend(errorElement);
    
    if (inputElement) {
        inputElement.classList.add('error-highlight');
        inputElement.focus();
        setTimeout(() => {
            inputElement.classList.remove('error-highlight');
        }, 3000);
    }
    
    setTimeout(() => errorElement.remove(), 5000);
}

function showSuccess(message) {
    clearMessages();
    
    const container = document.querySelector('.container');
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    container.prepend(successElement);
    setTimeout(() => successElement.remove(), 3000);
}

function clearMessages() {
    document.querySelectorAll('.error-message, .success-message').forEach(elem => elem.remove());
}