import React from 'react';
import Operator from '../partials/Operator'
import OperatorsService from '../services/OperatorsService';
import withRouter from '../sub/withRouter'
import { AuthContext } from "../contexts/AuthContext";
import {
    Navigate,
  } from 'react-router-dom';

class OperatorList extends React.Component {


    static contextType = AuthContext;
    state =
        {
            operators: [],
            loading: true,
            error: {},
        };


    async componentDidMount() {
        const { dispatch, user } = this.context;
        if (user == null) {
            this.props.router.navigate('/login');
        }
        try {

            console.log(user);
            const response = await OperatorsService.fetchOperators(user.id);

            this.setState(() => {
                return { operators: response.data };
            })


        }
        catch (e) {
            console.log(e);

            if (user == null) {
                this.props.router.navigate('/login');
            }
            if (e.response?.status == 401) {
                dispatch({ type: "LOGIN_FAILURE", payload: e.response.data })
                this.props.router.navigate('/login');
            }
            else {

            }
        }
        finally {
            this.setState(() => { return { loading: false } });
        }



    }

    createNewOperator = async () => {

        const { dispatch, user } = this.context;
        if (user == null) {
            this.props.router.navigate('/login');
        }
        try {

            const response = await OperatorsService.addOperator(user.id);

            this.setState(() => {
                return { operators: response.data };
            })


        }
        catch (e) {
            console.log(e);

            if (user == null) {
                this.props.router.navigate('/login');
            }
            if (e.response?.status == 401) {
                dispatch({ type: "LOGIN_FAILURE", payload: e.response.data })
                this.props.router.navigate('/login');
            }
            else {

            }
        }
        finally {
            this.setState(() => { return { loading: false } });
        }


    }

    render() {
        const { dispatch, user } = this.context;
        if(!user)
        {
            return (<Navigate replace to="/login"></Navigate>)
        }
        return (
            <div>

                <div style={{ visibility: !this.state.loading ? "hidden" : "visible" }}>
                    LOADING...
                </div>

                <div style={{ visibility: this.state.loading ? "hidden" : "visible" }}>
                    <button className='btn btn-outline-primary  border-secondary bg-dark' onClick={this.createNewOperator}>Add</button>
                    {this.state.operators.map((operator) => {
                        return <Operator key={operator.id} op={operator} />
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(OperatorList);