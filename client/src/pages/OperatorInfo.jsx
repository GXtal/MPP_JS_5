import React, { useContext, useEffect, useState } from 'react';
import OperatorModel from '../models/operator-model';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { socketPrivate } from "../http";


function OperatorInfo(props) {
    const { dispatch, user } = useContext(AuthContext);

    const [operator, setOperator] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});


    const navigate = useNavigate()
    const { id } = useParams()

    const errorListener = (err) => {
        setError(err)
    }

    const operatorGetListener = (operator) => {
        setOperator(operator)
        setError(null)
        setLoading(false)
    }

    const operatorDeleteListener = () => {
        setLoading(false)
        setError(null)
        navigate('/operators')
    }

    const operatorSetListener = (operator) => {
        setLoading(false)
        setOperator(operator)        
        setError(null)
    }

    useEffect(() => {
        socketPrivate.on('operators:get', operatorGetListener)
        socketPrivate.on('operators:delete', operatorDeleteListener)
        socketPrivate.on('operators:set', operatorSetListener)
        socketPrivate.on('error', errorListener)
        return () => {
            socketPrivate.off('operators:get', operatorGetListener)
            socketPrivate.off('operators:delete', operatorDeleteListener)
            socketPrivate.off('operators:set', operatorSetListener)
            socketPrivate.off('error', errorListener)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        socketPrivate.emit('operators:get', id, user.id)
    }, [])

    function onNameChange(event) {
        const a = operator;
        const b = new OperatorModel(
            a.id,
            a.owner,
            event.target.value,
            a.type,
            a.rarity,
            a.level,
            a.elite
        );
        setOperator(b);
    }

    function onRarityChange(event) {

        var a = operator
        var b = new OperatorModel(a.id, a.owner, a.name, a.type, event.target.value, a.level, a.elite);
        setOperator(b);
        
    }

    function onTypeChange(event) {

        var a = operator
        var b = new OperatorModel(a.id, a.owner, a.name, event.target.value, a.rarity, a.level, a.elite);
        setOperator(b);
    }

    function onLevelUp(event) {
        event.preventDefault()


        var a = operator
        var b = new OperatorModel(a.id, a.owner, a.name, a.type, a.rarity, a.level, a.elite);
        b.levelChange(b.level + 1);
        setOperator(b);

    }
    function onEliteUp(event) {
        event.preventDefault()

        var a = operator
        var b = new OperatorModel(a.id, a.owner, a.name, a.type, a.rarity, a.level, a.elite);
        b.eliteChange(b.elite + 1);
        setOperator(b);

    }

    async function handleSave(event) {
        event.preventDefault()

        socketPrivate.emit('operators:set', id, user.id, operator)
    }

    async function handleDelete(event) {
        event.preventDefault()

        setLoading(true)
        socketPrivate.emit('operators:delete', id, user.id)
    }

    return (
        <div>

            <div className="spinner-grow text-primary text-center" role="status" style={{ visibility: !loading ? "hidden" : "visible" }}>
                <span className="sr-only"></span>
            </div>


            <form>

                <div className="container bg-dark d-flex flex-column mt-3 pt-3 align-items-center
    rounded-5 border border-secondary w-50" style={{ visibility: loading ? "hidden" : "visible" }}>

                    <div className="form-group w-50">
                        <label className="text-primary">Name:</label>
                        <input className="form-control" value={operator.name} onChange={onNameChange} />
                    </div>

                    <div className="form-group w-50">
                        <div className="form-group w-50">
                            <label className="text-primary">Character rarity:</label>
                            <select className="form-control" value={operator.rarity} onChange={onRarityChange}>
                                <option value="6">Six star</option>
                                <option value="5">Five star</option>
                                <option value="4">Four star</option>
                                <option value="3">Three star</option>
                                <option value="2">Two star</option>
                                <option value="1">One star</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group w-50 with-image">
                        <div className="form-group w-50">
                            <label className="text-primary">Character type:</label>
                            <select className="form-control" value={operator.type} onChange={onTypeChange}>
                                <option value="Sniper">Sniper</option>
                                <option value="Defender">Defender</option>
                                <option value="Caster">Caster</option>
                                <option value="Guard">Guard</option>
                                <option value="Medic">Medic</option>
                                <option value="Specialist">Specialist</option>
                                <option value="Supporter">Supporter</option>
                                <option value="Vanguard">Vanguard</option>
                            </select>
                        </div>
                        <div className={operator.type}></div>
                    </div>

                    <div className="form-group w-50">
                        <label className="text-primary">Level:</label>
                        <input className="form-control" value={operator.level} />
                        <button className="form-control" onClick={onLevelUp}>Level Up</button>
                    </div>

                    <div className="form-group w-50 with-image">
                        <div>
                        <label className="text-primary">Elited:</label>
                        <input className="form-control" value={operator.elite} />
                        <button className="form-control" onClick={onEliteUp}> Elited  Up</button>
                        </div>
                        <div className={'elite'+operator.elite}></div>
                    </div>


                    <div className="form-group w-50">
                        <label>Options</label>
                        <button className="btn btn-outline-primary w-100" onClick={handleSave}>Save</button>
                        <button className="btn btn-outline-primary w-100" onClick={handleDelete}>Delete</button>
                        <label>End</label>
                    </div>


                </div>
            </form>
        </div>
    );
}

export default OperatorInfo;

