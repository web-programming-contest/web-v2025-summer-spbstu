export function renderCars(carManager, onAddOwner, onRemoveOwner, onRemoveCar) {
    const container = document.getElementById('carList');
    container.innerHTML = '';

    carManager.cars.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <strong>${car.make} ${car.model}</strong><br>
            Owners: ${car.owners.join(', ') || 'None'}<br>
            <button data-index="${index}" class="add-owner">Add Owner</button>
            <button data-index="${index}" class="remove-owner">Remove Owner</button>
            <button data-index="${index}" class="remove-car">Remove Car</button>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.add-owner').forEach(btn => {
        btn.onclick = () => onAddOwner(parseInt(btn.dataset.index));
    });

    container.querySelectorAll('.remove-owner').forEach(btn => {
        btn.onclick = () => onRemoveOwner(parseInt(btn.dataset.index));
    });

    container.querySelectorAll('.remove-car').forEach(btn => {
        btn.onclick = () => onRemoveCar(parseInt(btn.dataset.index));
    });
}
