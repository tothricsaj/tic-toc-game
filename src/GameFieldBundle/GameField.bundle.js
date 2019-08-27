import React, { Component } from 'react';
import style from './GameFieldBundle.module.scss';

class GameField extends Component {
    constructor(props) {
        super(props);
        this.drawX = this.drawX.bind(this);
        this.fieldNumbers = [1,2,3,4,5,6,7,8,9];
        this.fields = this.fieldNumbers.map((num) => <li id={'field-' + num} onClick={(e) => this.drawX(num, e)} key={ num }></li> );
    }

    drawX(num) {
        let elem = document.getElementById('field-' + num);
        let imgUrl = process.env.PUBLIC_URL + '/cross.png';
        elem.style.backgroundImage = `url(${imgUrl})`;
        console.log(process.env.PUBLIC_URL + 'cross.png');
    }

    render() {
        return(
            <div>
                <ul className={ style.fieldWrapper }>
                    { this.fields }
                </ul>
            </div>
        );
    }
}

export default GameField;
