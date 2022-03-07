import React, { createContext, useState } from 'react';

interface AppContextType {
    score: number;
    setScore: (score: number) => void;
    question: string;
    changeQuestion: () => void;
    gameOver: Boolean;
    toggleGameOver: () => void;
    isWhite: Boolean;
    updateIswhite: (value: any) => void,
    reset: () => void;
    allQuestions: string[];
    possibleQuestions: string[];
    toggleQuestion: (question: string) => void;
    selectAllQuestions: () => void;
    unselectAllQuestions: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
    children: React.ReactNode
}

export const AppContextProvider: React.FC<Props> = (props) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isWhite, setIsWhite] = useState(true);

    const allQuestions = [
        'h8', 'h7', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1',
        'g8', 'g7', 'g6', 'g5', 'g4', 'g3', 'g2', 'g1',
        'f8', 'f7', 'f6', 'f5', 'f4', 'f3', 'f2', 'f1',
        'e8', 'e7', 'e6', 'e5', 'e4', 'e3', 'e2', 'e1',
        'd8', 'd7', 'd6', 'd5', 'd4', 'd3', 'd2', 'd1',
        'c8', 'c7', 'c6', 'c5', 'c4', 'c3', 'c2', 'c1',
        'b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1',
        'a8', 'a7', 'a6', 'a5', 'a4', 'a3', 'a2', 'a1'
    ];

    const [possibleQuestions, setPossbileQuestions] = useState<string[]>([...allQuestions]);
    function toggleQuestion(question: string) {
        let possibleQNew = [...possibleQuestions]
        let index = possibleQNew.indexOf(question);
        if(index < 0) {
            possibleQNew.push(question);
        } else {
            possibleQNew.splice(index, 1);
        }
        setPossbileQuestions(possibleQNew);
        changeQuestion();
    }

    function selectAllQuestions() {
        setPossbileQuestions([...allQuestions]);
        changeQuestion();
        console.log("hiii")
    }

    function unselectAllQuestions() {
        setPossbileQuestions([]);
        changeQuestion();
    }

    const [question, setQuestion] = useState<string>(possibleQuestions[Math.floor(Math.random() * 64)]);

    function changeQuestion(): void {
        setQuestion(possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]);
    }

    function toggleGameOver(): void {
        setGameOver(!gameOver);
    }

    function updateIswhite(value: any) {
        setIsWhite(value)
    }

    function reset() {
        setScore(0);
        setIsWhite(true);
        setGameOver(false);
    }

    const contextValue: AppContextType = {
        score,
        setScore,
        question,
        changeQuestion,
        gameOver,
        toggleGameOver,
        isWhite,
        updateIswhite,
        reset,
        allQuestions,
        possibleQuestions,
        toggleQuestion,
        selectAllQuestions,
        unselectAllQuestions
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}