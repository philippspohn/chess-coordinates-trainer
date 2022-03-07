import React, { useContext } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { AppContext } from '../context/AppContext';


const SquareSelector: React.FC<RouteComponentProps> = () => {
    const ctx = useContext(AppContext);


    const questions = ctx!.allQuestions;
    const possibleQuestions = ctx!.possibleQuestions;
    questions.sort((a, b) => {
        let valA = 0, valB = 0;
        valA = (8 - Number(a.charAt(1))) * 64 + (a.charCodeAt(0) - 'a'.charCodeAt(0));
        valB = (8 - Number(b.charAt(1))) * 64 + (b.charCodeAt(0) - 'a'.charCodeAt(0));

        return valA - valB;
    })


    let rows = [];

    for(let i = 0; i < 8; i++) {
        let r:string[] = [];
        for(let j = 0; j < 8; j++) {
            r.push(questions[i * 8 + j]);
        }
        rows.push(r);
    }



    return (
        <div>
            <table>
                {rows.map(row => {
                    return(
                        <tr>
                            {row.map(field => {
                                return (
                                    <td>
                                        <button
                                            className={"sqaureSelectorButton " + (possibleQuestions.includes(field) ? " possibleSquare" : "") }
                                            onClick={ () => ctx?.toggleQuestion(field) }
                                        >
                                            {field}
                                        </button>
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
            <button style={{color: "white"}} onClick={() => ctx?.unselectAllQuestions()}>Unselect All</button>
            <br />
            <button style={{color: "white"}} onClick={() => ctx?.selectAllQuestions()}>Select All</button>
        </div>
    )
    
}

export default SquareSelector;