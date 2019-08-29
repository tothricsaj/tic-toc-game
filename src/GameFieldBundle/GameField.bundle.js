import React, { Component } from 'react';
import style from './GameFieldBundle.module.scss';

class GameField extends Component {
    constructor(props) {
        super(props);
        this.drawX = this.drawX.bind(this);
        this.fieldNumbers = [1,2,3,4,5,6,7,8,9];
        this.fields = this.fieldNumbers.map((num) => <li id={'field-' + num} onClick={(e) => this.drawX(num, e)} key={ num }></li> );
        this.fieldState = [
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];
    }

    drawX(num) {
        let elem = document.getElementById('field-' + num);
        let imgUrl = process.env.PUBLIC_URL + '/cross.png';
        let searchField = true;

        elem.style.backgroundImage = `url(${imgUrl})`;

        if(num <= 3) {
            this.fieldState[0][num - 1] = 1;
        } else if(num >= 4 && num <= 6) {
            this.fieldState[1][num - 4] = 1;
        } else {
            this.fieldState[2][num - 7] = 1;
        }

        console.log(this.fieldState);

        while(searchField) {
            let x = Math.floor(Math.random() * 3);
            let y = Math.floor(Math.random() * 3);

            if(this.fieldState[x][y] !== 0) {
                continue;
            }

            this.fieldState[x][y] = -1;
            searchField = false;
        }
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
