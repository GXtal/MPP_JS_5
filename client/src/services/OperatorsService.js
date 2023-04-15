import api from "../http";

export default class OperatorsService{
    static async fetchOperators(owner){
        return await api.get('/operators/getAll/')
    }
    static async addOperator(owner){
        return await api.put('/operators/add/')
    }
    static async fetchOperator(id){
        return await api.get('/operators/get/' + id)
    }
    static async updateOperator(id, op){
        return await api.post('/operators/update/' + id, op)
    }
    static async deleteOperator(id){
        return await api.delete('/operators/delete/' + id)
    }
}