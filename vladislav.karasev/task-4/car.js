export class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.owners = [];
    }

    addOwner(name) {
        if (!this.owners.includes(name)) this.owners.push(name);
    }

    removeOwner(name) {
        this.owners = this.owners.filter(owner => owner !== name);
    }

    get ownerCount() {
        return this.owners.length;
    }
}
    