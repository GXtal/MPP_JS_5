import { useContext, useEffect, useState } from "react";

import Operator from '../partials/Operator'
import { AuthContext } from "../contexts/AuthContext";
import {socket, socketPrivate} from "../http";
import {useNavigate} from "react-router-dom";

function OperatorList(props) {
    const { dispatch, user } = useContext(AuthContext);
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    const navigate = useNavigate()
  
    const createNewOperator = async (e) => {

        e.preventDefault()

        socketPrivate.emit("operators:add", user?.id)
        socketPrivate.emit("operators:getAll", user.id) 
    };
  
    useEffect(()=>{
        setLoading(true)
        if(!user){
            navigate('/login')
        }
        socketPrivate.emit("operators:getAll", user?.id)
    },[])

    const operatorsGetAllListener = (operators) =>{
        setOperators(operators)
        setError(null)
        setLoading(false)
    }

    const errorListener = (err) => {
        setError(err)
    }
  
    useEffect(() => {
        socketPrivate.on('operators:getAll', operatorsGetAllListener)
        socketPrivate.on('error', errorListener)
        return () => {
            socketPrivate.off('operators:getAll', operatorsGetAllListener)
            socketPrivate.off('error', errorListener)
        }
    }, [])


    return (
      <div>
        <div style={{ visibility: !loading ? "hidden" : "visible" }}>
          LOADING...
        </div>
        <div style={{ visibility: loading ? "hidden" : "visible" }}>
          <button className='btn btn-outline-primary  border-secondary bg-dark' onClick={createNewOperator}>Add</button>
          {operators.map((operator) => {
            return <Operator key={operator.id} op={operator} />
          })}
        </div>
      </div>
    );
  }
  
  export default OperatorList;