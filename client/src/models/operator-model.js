const maxLevels=[[30,30,40,45,50,50],
                [NaN,NaN,55,60,70,80],
                [NaN,NaN,NaN,70,80,90],
                [NaN,NaN,NaN,NaN,NaN,NaN]];
                
const rarityDescs=["One star","Two star","Three star","Four star","Five star","Six star"];
                
class OperatorModel{
    constructor(id,owner,name, type, rarity, level=1,elite=0) {
        this.id = id;//generated
        this.owner=owner;
        this.name=name;//inputed
        this.rarity=rarity;//choose
        this.type=type;//choose        
        this.elite=elite;                
        this.maxLevel = maxLevels[this.elite][this.rarity-1];
        if(this.maxLevel)
        {
            if((level>0)&&(level<=this.maxLevel))
            {
                this.level=level;
            }else
            {
                this.level=1;
            }
        }else
        {
            this.level=1;
            this.elite=0;
        }
        
        this.rarityDesc=rarityDescs[this.rarity-1];
    }      

    levelChange(newLevel)
    {
        if((newLevel>0)&&(newLevel<=this.maxLevel))
        {
            this.level=newLevel;
        }
    }

    eliteChange(newElite)
    {
        let oldElite=this.elite;
        this.elite=newElite;
        this.maxLevel = maxLevels[this.elite][this.rarity-1];
        if(this.maxLevel)
        {
            this.level=1;
        }
        else
        {
            this.elite=oldElite;
            this.maxLevel = maxLevels[this.elite][this.rarity-1];
        }
    }
}


export default OperatorModel;