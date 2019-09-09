import React, { Component } from 'react';
import style from './GameFieldBundle.module.scss';
import WinnerModal from "../WinnerModalBundle/WinnerModal.bundle";

class GameField extends Component {
    constructor(props) {
        super(props);
        this.drawX = this.drawX.bind(this);
        this.state = {
            cross: false,
            circle: false,
        };
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
            let fieldKey = x + y;
            let circField;

            if(this.fieldState[x][y] !== 0) {
                continue;
            }

            if (x === 0) {
                fieldKey =+ 1;
            } else if (x === 1) {
                fieldKey += 3;
            } else if (x === 2) {
                fieldKey += 5;
            }

            circField = document.getElementById('field-' + fieldKey);
            circField.style.backgroundImage = `url(${process.env.PUBLIC_URL + '/circle.png'})`;

            this.fieldState[x][y] = -1;
            searchField = false;
        }

       if(
           // rows
           this.fieldState[0][0] === 1 && this.fieldState[0][1] === 1 && this.fieldState[0][2] === 1 ||
           this.fieldState[1][0] === 1 && this.fieldState[1][1] === 1 && this.fieldState[1][2] === 1 ||
           this.fieldState[2][0] === 1 && this.fieldState[2][1] === 1 && this.fieldState[2][2] === 1 ||
           // columns
           this.fieldState[0][0] === 1 && this.fieldState[1][0] === 1 && this.fieldState[2][0] === 1 ||
           this.fieldState[0][1] === 1 && this.fieldState[1][1] === 1 && this.fieldState[2][1] === 1 ||
           this.fieldState[0][2] === 1 && this.fieldState[1][2] === 1 && this.fieldState[2][2] === 1 ||
           // cross left-to-right
           this.fieldState[0][0] === 1 && this.fieldState[1][1] === 1 && this.fieldState[2][2] === 1 ||
           this.fieldState[0][2] === 1 && this.fieldState[1][1] === 1 && this.fieldState[2][0] === 1
       ) {
           this.setState({cross: true});
       } else if(
           // rows
           this.fieldState[0][0] === -1 && this.fieldState[0][1] === -1 && this.fieldState[0][2] === -1 ||
           this.fieldState[1][0] === -1 && this.fieldState[1][1] === -1 && this.fieldState[1][2] === -1 ||
           this.fieldState[2][0] === -1 && this.fieldState[2][1] === -1 && this.fieldState[2][2] === -1 ||
           // columns
           this.fieldState[0][0] === -1 && this.fieldState[1][0] === -1 && this.fieldState[2][0] === -1 ||
           this.fieldState[0][1] === -1 && this.fieldState[1][1] === -1 && this.fieldState[2][1] === -1 ||
           this.fieldState[0][2] === -1 && this.fieldState[1][2] === -1 && this.fieldState[2][2] === -1 ||
           // cross left-to-right
           this.fieldState[0][0] === -1 && this.fieldState[1][1] === -1 && this.fieldState[2][2] === -1 ||
           this.fieldState[0][2] === -1 && this.fieldState[1][1] === -1 && this.fieldState[2][0] === -1
       ) {
           this.setState({circle: true});
       }

       if (this.state.cross) {
           console.log('%cCross is the winner', 'color: orange;');
       } else if(this.state.circle) {
           console.log('%cCircle is the winner', 'color: green;');
       }

        // console.log(`Results cross->${this.cross} circle->${this.circle}`);
    }

    render() {
        let winnerModal = 'nana';

        if(this.state.cross) {
            winnerModal = <WinnerModal winner={'Cross'} />;
        } else if(this.state.circle) {
            winnerModal = <WinnerModal winner={'Circle'} />;
        }

        return(
            <div>
                { winnerModal }
                <ul className={ style.fieldWrapper }>
                    { this.fields }
                </ul>
            </div>
        );
    }
}

export default GameField;
