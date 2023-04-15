import React from 'react';
import withRouter from '../sub/withRouter';
import OperatorModel from '../models/operator-model';
import OperatorsService from '../services/OperatorsService';
import { AuthContext } from "../contexts/AuthContext";

class OperatorInfo extends React.Component {

    static contextType = AuthContext;

    state =
        {
            operator: {},
            loading: true,
            error: {},
        };

    async componentDidMount() {

        const { dispatch, user } = this.context;
        let _id = this.props.router.params.id;
        try {

            if (user == null) {
                this.props.router.navigate("/login")
            }

            const response = await OperatorsService.fetchOperator(_id);

            this.setState(() => {
                const a = response.data;
                return { operator: new OperatorModel(a.id, a.owner, a.name, a.type, a.rarity, a.level, a.elite) };
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

    onNameChange = (event) => {
        this.setState(() => {
            var a = this.state.operator
            var b = new OperatorModel(a.id,a.owner, event.target.value, a.type, a.rarity, a.level, a.elite);
            return { operator: b };
        });
    }

    onRarityChange = (event) => {
        this.setState(() => {
            var a = this.state.operator
            var b = new OperatorModel(a.id, a.owner,a.name, a.type, event.target.value, a.level, a.elite);
            return { operator: b };
        });
    }

    onTypeChange = (event) => {
        this.setState(() => {
            var a = this.state.operator
            var b = new OperatorModel(a.id,a.owner, a.name, event.target.value, a.rarity, a.level, a.elite);
            return { operator: b };
        });
    }

    onLevelUp = (event) => {
        event.preventDefault()
        this.setState(() => {
            var a = this.state.operator
            var b = new OperatorModel(a.id,a.owner, a.name, a.type, a.rarity, a.level, a.elite);
            b.levelChange(b.level + 1);
            return { operator: b };
        });
    }
    onEliteUp = (event) => {
        event.preventDefault()
        this.setState(() => {
            var a = this.state.operator
            var b = new OperatorModel(a.id, a.owner,a.name, a.type, a.rarity, a.level, a.elite);
            b.eliteChange(b.elite + 1);
            return { operator: b };
        });
    }

    onSave = async (event) => {
        const { dispatch, user } = this.context;
        try {

            const response = await OperatorsService.updateOperator(this.state.operator.id, this.state.operator);

            this.setState(() => {
                const a = response.data;
                return { operator: new OperatorModel(a.id, a.owner, a.name, a.type, a.rarity, a.level, a.elite) };
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

    onDelete = async (event) => {

        const { dispatch, user } = this.context;
        try {

            const response = await OperatorsService.deleteOperator(this.state.operator.id);
            this.props.router.navigate('/operators');

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
        return (
            <div>

                <div class="spinner-grow text-primary text-center" role="status" style={{ visibility: !this.state.loading ? "hidden" : "visible" }}>
                    <span class="sr-only"></span>
                </div>


                <form> 
                    
                <div className="container bg-dark d-flex flex-column mt-3 pt-3 align-items-center
            rounded-5 border border-secondary w-50" style={{ visibility: this.state.loading ? "hidden" : "visible" }}>

                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" value={this.state.operator.name} onChange={this.onNameChange} />
                    </div>

                    <div className="form-group">
                        <label>Character rarity:</label>
                        <select className="form-control" value={this.state.operator.rarity} onChange={this.onRarityChange}>
                            <option value="6">Six star</option>
                            <option value="5">Five star</option>
                            <option value="4">Four star</option>
                            <option value="3">Three star</option>
                            <option value="2">Two star</option>
                            <option value="1">One star</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Character type:</label>
                        <select className="form-control" value={this.state.operator.type} onChange={this.onTypeChange}>
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

                    <div className="form-group">
                        <label>Level:</label>
                        <input className="form-control" value={this.state.operator.level} />
                        <button className="form-control" onClick={this.onLevelUp}>Level Up</button>
                    </div>

                    <div className="form-group">
                        <label>Elited:</label>
                        <input className="form-control" value={this.state.operator.elite} />
                        <button className="form-control" onClick={this.onEliteUp}> Elited  Up</button>
                    </div>


                    <div className="input-part">
                        <button className="nice-button" onClick={this.onSave}>Save</button>
                        <button className="nice-button" onClick={this.onDelete}>Delete</button>
                    </div>


                </div>
                </form>
            </div>
        );
    }
}

export default withRouter(OperatorInfo);