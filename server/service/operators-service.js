const OperatorModel = require("../models/operator-model");
const fs = require('fs')
const path = require('path')
const operatorsDB = path.resolve(__dirname, "operators.json")

class OperatorsService {

    operatorsjson = '[]';

    operators = [];
    maxId = 0;

    constructor() {

        try {
            this.operatorsjson = fs.readFileSync(operatorsDB, "utf8");
        } catch (error) {
            console.error(error);
        }

        this.operators = JSON.parse(this.operatorsjson);

        console.log("operators");
        console.log(this.operators);

        this.operators.forEach((x) => {
            if (x.id > this.maxId) {
                this.maxId = x.id
            }
        })
    }
    async getAll(owner) {
        var ownerOperators = this.operators.filter(x => x.owner == owner);
        return ownerOperators;
    }

    async get(id, owner) {
        let index = this.operators.findIndex((x) => { return x.id == id });
        console.log("get");
        console.log(index);
        if (this.operators[index].owner == owner) {
            return this.operators[index];
        }
        else {

        }

    }

    async set(id, owner, newOperator) {
        let index = this.operators.findIndex((x) => { return x.id == id });
        if (this.operators[index].owner == owner) {
            let op = new OperatorModel(newOperator.id, newOperator.owner, newOperator.name, newOperator.type, newOperator.rarity, newOperator.level, newOperator.elite);
            this.operators[index] = op;
            this.operatorsjson = JSON.stringify(this.operators);
            fs.writeFileSync(operatorsDB, this.operatorsjson);
            return this.operators[index];
        }
        else {

        }


    }

    async add(owner) {
        
        let id = ++this.maxId;
        let op = new OperatorModel(id, owner, "Knight", "Sniper", 1);
        this.operators.push(op);
        this.operatorsjson = JSON.stringify(this.operators);
        fs.writeFileSync(operatorsDB, this.operatorsjson);
        return this.getAll(owner);
    }

    async delete(id, owner) {
        console.log(id);
        let index = this.operators.findIndex((x) => { return x.id == id });
        console.log(index);
        this.operators.splice(index, 1);
        console.log(this.operators);
        this.operatorsjson = JSON.stringify(this.operators);
        fs.writeFileSync(operatorsDB, this.operatorsjson);
        return this.getAll(owner);

    }
}

module.exports = new OperatorsService()