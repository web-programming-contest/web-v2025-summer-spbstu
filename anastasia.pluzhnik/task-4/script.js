import { Order } from './order.js';
import { 
    groupOrdersByStatus, 
    getUniqueProducts, 
    groupOrdersByPriceRange,
    filterOrdersByProduct,
    filterOrdersByStatus
} from './filter.js';


document.addEventListener('DOMContentLoaded', () => {

    Order.loadFromLocalStorage();

    renderOrders();

    setupEventListeners();
});


function setupEventListeners() {
    // Управление заказами
    document.getElementById('add-order-btn').addEventListener('click', addNewOrder);
    document.getElementById('delete-order-btn').addEventListener('click', deleteOrder);
    
    // Управление товарами
    document.getElementById('add-item-btn').addEventListener('click', addItemToOrder);
    document.getElementById('remove-item-btn').addEventListener('click', removeItemFromOrder);
    
    // Аналитические функции
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
        showError(orderIdInput, 'Пожалуйста, введите корректный номер заказа');
        return;
    }
    
    if (orderId <= 0) {
        showError(orderIdInput, 'ID заказа должен быть положительным числом');
        return;
    }
    
    if (Order.allOrders.some(elem => elem.orderId === orderId)) {
        showError(orderIdInput, 'Заказ с таким ID уже существует');
        return;
    }
    

    new Order(orderId);
    orderIdInput.value = '';
    showSuccess('Заказ успешно создан');
    renderOrders();
}


async function deleteOrder() {
    const orderIdInput = document.getElementById('order-id-input');
    const orderId = parseInt(orderIdInput.value);
    
    clearMessages();
    
    // Валидация ввода
    if (isNaN(orderId)) {
        showError(orderIdInput, 'Пожалуйста, введите корректный номер заказа');
        return;
    }
    
    // Проверка существования заказа
    const orderExists = Order.allOrders.some(elem => elem.orderId === orderId);
    if (!orderExists) {
        showError(orderIdInput, 'Заказ с таким ID не найден');
        return;
    }
    
    // Удаление заказа
    await Order.deleteOrder(orderId);
    orderIdInput.value = '';
    showSuccess('Заказ успешно удален');
    renderOrders();
}


// ==================== УПРАВЛЕНИЕ ТОВАРАМИ ====================

async function addItemToOrder() {
    const orderIdInput = document.getElementById('item-order-id-input');
    const nameInput = document.getElementById('item-name-input');
    const priceInput = document.getElementById('item-price-input');
    
    const orderId = parseInt(orderIdInput.value);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    
    clearMessages();
    
    if (isNaN(orderId)) {
        showError(orderIdInput, 'Введите корректный ID заказа');
        return;
    }
    
    if (!name) {
        showError(nameInput, 'Введите название товара');
        return;
    }
    
    if (isNaN(price) || price <= 0) {
        showError(priceInput, 'Введите корректную цену (положительное число)');
        return;
    }
    

    const order = Order.allOrders.find(elem => elem.orderId === orderId);
    if (!order) {
        showError(orderIdInput, 'Заказ не найден');
        return;
    }
    
 
    await order.addItem({ name, price });
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
        showError(orderIdInput, 'Введите корректный ID заказа');
        return;
    }
    
    if (!name) {
        showError(nameInput, 'Введите название товара');
        return;
    }
    
    const order = Order.allOrders.find(elem => elem.orderId === orderId);
    if (!order) {
        showError(orderIdInput, 'Заказ не найден');
        return;
    }
    
    // Проверка существования товара (без учета регистра)
    const itemExists = order.items.some(item => 
        item.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!itemExists) {
        showError(nameInput, 'Товар не найден в заказе');
        return;
    }
    
    // Удаление товара
    await order.removeItem(name);
    nameInput.value = '';
    showSuccess('Товар успешно удален');
    renderOrders();
}

// ==================== 4.2 Сортировки и группировки ====================

function showOrdersByStatus() {
    const grouped = groupOrdersByStatus(Order.allOrders);
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
    const products = getUniqueProducts(Order.allOrders);
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
    const ranges = groupOrdersByPriceRange(Order.allOrders);
    let html = '<div class="analytics-result"><h3>Группировка заказов по сумме</h3>';
    
    for (const [range, orders] of Object.entries(ranges)) {
        html += `<div class="analytics-item">
            <div class="analytics-title">${range} руб. (${orders.length} заказов):</div>
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
        const filtered = Order.allOrders.filter(order => 
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
        
        const filtered = filterOrdersByStatus(Order.allOrders, normalizedStatus);
        renderFilteredResults(filtered, `Заказы со статусом "${normalizedStatus}"`);
    }
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

// ==================== Дополнительно ====================


function renderOrders() {
    const container = document.getElementById('orders-container');
    container.innerHTML = '';

    if (Order.allOrders.length === 0) {
        container.innerHTML = '<p class="no-orders">Нет заказов</p>';
        return;
    }

    Order.allOrders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <h3>Заказ #${order.orderId}</h3>
            <div class="status-control">
                <span>Статус: </span>
                <select class="status-select" data-order-id="${order.orderId}">
                    <option value="created" ${order.status === 'created' ? 'selected' : ''}>Создан</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>В обработке</option>
                    <option value="sent" ${order.status === 'sent' ? 'selected' : ''}>Отправлен</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Завершен</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Отменен</option>
                </select>
            </div>
            <div class="items-list">
                <h4>Товары (${order.items.length}):</h4>
                <ul>
                    ${order.items.length > 0 ? 
                        order.items.map(item => `
                            <li>${item.name} - ${item.price.toFixed(2)} руб.</li>
                        `).join('') : 
                        '<li>Нет товаров</li>'}
                </ul>
            </div>
            <div class="total">Итого: ${order.getTotal().toFixed(2)} руб.</div>
        `;
        container.appendChild(card);
    });


    setupStatusChangeHandlers();
}

function setupStatusChangeHandlers() {
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const orderId = parseInt(e.target.dataset.orderId);
            const newStatus = e.target.value;
            const order = Order.allOrders.find(o => o.orderId === orderId);
            
            if (order) {
                await order.setStatus(newStatus);
                renderOrders();
            }
        });
    });
}



function showError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    inputElement.parentNode.appendChild(errorElement);
    inputElement.focus();
}


function showSuccess(message) {
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