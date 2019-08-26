import React, { Component } from 'react';

class GameField extends Component {
    constructor(props) {
        super(props);
        this.fieldNumbers = [1,2,3,4,5,6,8,9];
        this.fields = this.fieldNumbers.map((num) => <li key={ num }></li> );
    }

    render() {
        return(
            <div>
                <ul>
                    { this.fields }
                </ul>
            </div>
        );
    }
}

export default GameField;
