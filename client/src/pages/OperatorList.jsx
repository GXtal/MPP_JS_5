import { useContext, useEffect, useState } from "react";

import Operator from '../partials/Operator'
import { AuthContext } from "../contexts/AuthContext";
import { socket, socketPrivate } from "../http";
import { useNavigate } from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {GET_OPERATORS} from "../graphql/queries/operator-queries";
import {ADD_OPERATOR} from "../graphql/mutations/operator-mutations";

function OperatorList(props) {
  const { user } = useContext(AuthContext)
  const [operators, setOperators] = useState([]);
  const [error, setError] = useState(null)

  const errorHandler = (error) => {
    setError(error.networkError.result.message)
  }

  const {loading, refetch} = useQuery(GET_OPERATORS, {
    variables:{
        owner: user?.id-0
    },
    onCompleted: data => {
        setOperators(data.getOperators)
    },
    onError: errorHandler,
})
  const navigate = useNavigate()

  const [addOperator] = useMutation(ADD_OPERATOR, {
    onError: errorHandler,
    onCompleted: () => {
        refetch()
    }
})

  const createNewOperator = async (e) => {

    e.preventDefault()

    addOperator({variables:{
      owner: user?.id-0,
  }})
  };

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    refetch();
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