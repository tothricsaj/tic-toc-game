import React, { Component } from 'react';

class WinnerModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{ this.props.winner } the winner!</h2>
            </div>
        );
    }
}

export default WinnerModal;
