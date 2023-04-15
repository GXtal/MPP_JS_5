
import OperatorModel from '../models/operator-model';
import React from 'react';
import { Link } from "react-router-dom";
class Operator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      operator: props.op,
    };
  }

  render() {
    return (
      <div className="w-50 align-items-center flex-column">
        <Link to={`/operator/${this.state.operator.id}`}>
          <div className="container bg-dark d-flex flex-column mt-3 pt-3 align-items-center
            rounded-5 border border-secondary">
            <p className="nav-item nav-link text-white">{this.state.operator.name} </p>
            <p className="nav-item nav-link text-white">Rarity:  {this.state.operator.rarityDesc}</p>
            <p className="nav-item nav-link text-white">Type: {this.state.operator.type}</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default Operator;