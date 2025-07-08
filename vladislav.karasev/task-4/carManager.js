import { Car } from './car.js';

export class CarManager {
    constructor() {
        this.cars = [];
    }

    addCar(car) {
        this.cars.push(car);
    }

    removeCar(car) {
        this.cars = this.cars.filter(c => c !== car);
    }

    groupByMake() {
        return this.cars.reduce((acc, car) => {
            acc[car.make] = acc[car.make] || [];
            acc[car.make].push(car);
            return acc;
        }, {});
    }

    getUniqueOwners() {
        return [...new Set(this.cars.flatMap(car => car.owners))];
    }

    groupByOwnerCount() {
        return this.cars.reduce((acc, car) => {
            const count = car.ownerCount;
            acc[count] = acc[count] || [];
            acc[count].push(car);
            return acc;
        }, {});
    }

    getCarsByOwner(name) {
        return this.cars.filter(car => car.owners.includes(name));
    }

    getModelsByMake(make) {
        return this.cars.filter(car => car.make === make).map(car => car.model);
    }
}
