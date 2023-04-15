           
class OperatorModel{
    constructor(id, owner,name, type, rarity, level=1,elite=0) {
        this.id = id;//generated
        this.owner=owner;
        this.name=name;//inputed
        this.rarity=rarity;//choose
        this.type=type;//choose
        this.level=level;
        this.elite=elite;        
    }      
}


module.exports = OperatorModel;