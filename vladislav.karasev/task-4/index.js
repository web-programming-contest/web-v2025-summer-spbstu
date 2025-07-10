import { Car } from './car.js';
import { CarManager } from './carManager.js';
import { renderCars } from './ui.js';
import { saveToStorage, loadFromStorage } from './storage.js';

let carManager = loadFromStorage(CarManager, Car);

function asyncAction(fn) {
    return new Promise(resolve => setTimeout(() => resolve(fn()), 500));
}

function updateUI() {
    renderCars(carManager, addOwnerPrompt, removeOwnerPrompt, removeCar);
    saveToStorage(carManager);
}

document.getElementById('addCarForm').onsubmit = async (e) => {
    e.preventDefault();
    const make = e.target.make.value.trim();
    const model = e.target.model.value.trim();
    if (make && model) {
        await asyncAction(() => carManager.addCar(new Car(make, model)));
        updateUI();
        e.target.reset();
    }
};

async function addOwnerPrompt(index) {
    const name = prompt("Enter owner name:");
    if (name) {
        await asyncAction(() => carManager.cars[index].addOwner(name));
        updateUI();
    }
}

async function removeOwnerPrompt(index) {
    const name = prompt("Enter owner name to remove:");
    if (name) {
        await asyncAction(() => carManager.cars[index].removeOwner(name));
        updateUI();
    }
}

async function removeCar(index) {
    await asyncAction(() => carManager.removeCar(carManager.cars[index]));
    updateUI();
}

updateUI();


const output = document.getElementById('output');

document.getElementById('showByMake').onclick = () => {
    const groups = carManager.groupByMake();
    output.innerHTML = Object.entries(groups).map(([make, cars]) =>
        `<strong>${make}</strong>: ${cars.map(c => c.model).join(', ')}`
    ).join('<br>');
};

document.getElementById('showUniqueOwners').onclick = () => {
    const owners = carManager.getUniqueOwners();
    output.innerHTML = `<strong>Уникальные владельцы:</strong> ${owners.join(', ')}`;
};

document.getElementById('showByOwnerCount').onclick = () => {
    const grouped = carManager.groupByOwnerCount();
    output.innerHTML = Object.entries(grouped).map(([count, cars]) =>
        `<strong>${count} владельца(ей)</strong>: ${cars.map(c => `${c.make} ${c.model}`).join(', ')}`
    ).join('<br>');
};

document.getElementById('carsByOwnerForm').onsubmit = (e) => {
    e.preventDefault();
    const name = e.target.owner.value.trim();
    const cars = carManager.getCarsByOwner(name);
    output.innerHTML = cars.length ?
        `<strong>Автомобили ${name}:</strong> ${cars.map(c => `${c.make} ${c.model}`).join(', ')}` :
        `У ${name} нет автомобилей.`;
};

document.getElementById('modelsByMakeForm').onsubmit = (e) => {
    e.preventDefault();
    const make = e.target.make.value.trim();
    const models = carManager.getModelsByMake(make);
    output.innerHTML = models.length ?
        `<strong>Модели ${make}:</strong> ${models.join(', ')}` :
        `Нет моделей для марки "${make}".`;
};
