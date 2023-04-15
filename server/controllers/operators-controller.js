const operatorsService = require('../service/operators-service')

class OperatorsController{

    async getOperators(req, res, next){
        try{
            const owner = req.user.id;
            console.log(req.user);
            const operators = await operatorsService.getAll(owner)            
            return res.json(operators)
        }catch (e){
            next(e)
        }
    }

    async getOperator(req, res, next){
        try{
            const {id} = req.params
            const owner = req.user.id;
            const operator = await operatorsService.get(id,owner)
            return res.json(operator)
        }catch (e){
            next(e)
        }
    }    

    async updateOperator(req, res, next){
        try{
            const {id} = req.params
            const newop = req.body
            const owner = req.user.id;
            const operator = await operatorsService.set(id, owner,newop)
            return res.json(operator)
        }catch (e){
            next(e)
        }
    }
    async addOperator(req, res, next){
        try{
            const owner = req.user.id;
            console.log(req.user);
            const operators = await operatorsService.add(owner)
            return res.json(operators)
        }catch (e){
            next(e)
        }
    }
    async deleteOperator(req, res, next){
        try{
            const {id} = req.params           
            const owner = req.user.id; 
            const operators = await operatorsService.delete(id,owner);
            return res.json(operators)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new OperatorsController()