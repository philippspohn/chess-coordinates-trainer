import React, { useContext } from 'react';

import Square from './Square';
import { AppContext } from '../context/AppContext';

const Board = () => {
    const ctx = useContext(AppContext);
    let board = [];
    for(let i=1;i<=8;i++){
        let row = [];
        for(let j=1;j<=8;j++) {
            let rank, file;
            if(ctx?.isWhite){
                file = 96 + j;
                rank = (117 - i) % 9;
            } else {
                file = 105-j;
                rank = i;
            }
            let name = `${String.fromCharCode(file)}${rank}`;
            row.push(<Square key={name} name={name} color={( ((i%2 !== 0) && (j%2 !== 0) || (i%2 === 0) && (j%2 === 0)) ? 'light' : 'dark')} />);
        }
        board.push(row);
    }

    console.log(board);
    return (
        <div className="p-1 mt-3 flex flex-col items-center">
            <div className='board-wrapper'>
                { board.map((row, i) => (
                    <div key={i} className="flex flex-row">
                        { row }
                    </div>
                )) }
                <div className="question-overlay">
                    <h2 >{ctx?.question}</h2>
                </div>
            </div>
        </div>
    )
}

export default Board;