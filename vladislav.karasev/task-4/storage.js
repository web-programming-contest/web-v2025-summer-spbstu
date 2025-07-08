export function saveToStorage(carManager) {
    localStorage.setItem("cars", JSON.stringify(carManager.cars));
}

export function loadFromStorage(CarManager, Car) {
    const data = JSON.parse(localStorage.getItem("cars")) || [];
    const manager = new CarManager();
    data.forEach(({ make, model, owners }) => {
        const car = new Car(make, model);
        owners.forEach(owner => car.addOwner(owner));
        manager.addCar(car);
    });
    return manager;
}
