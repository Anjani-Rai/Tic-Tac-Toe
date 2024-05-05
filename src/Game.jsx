import React, { useState, useEffect } from "react";
import Board from "./Board";
import NameDialog from "./NameDialog";
import { Card, Button, Typography, Box, Snackbar } from "@mui/material";

function Game() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [names, setNames] = useState({ X: 'X', O: 'O' });
    const [openNameDialog, setOpenNameDialog] = useState(true);


    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line); // New state for the winning line
            setOpenSnackbar(true);
            if (result.winner === "X") {
                setScoreX(scoreX + 1);
            } else {
                setScoreO(scoreO + 1);
            }
        }
    }, [board]);
    

    function handleNameSubmit(xName, oName) {
        setNames({ X: xName || 'X', O: oName || 'O' });
        setOpenNameDialog(false);
    }

    function handleClick(i) {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    }

    function renderRestartButton() {
        return (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    setBoard(Array(9).fill(null));
                    setWinner(null);
                    setWinningLine([]);
                    setScoreX(0); // Reset scores when restarting
                    setScoreO(0);
                }}
                sx={{ mt: 2 }}
            >
                Restart Game
            </Button>
        );
    }

    return (
        <>
        <NameDialog open={openNameDialog} onSubmit={handleNameSubmit} />
        <Card
            sx={{
                p: 4,
                mx: "auto",
                my: 8,
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: "medium", mb: 3 }}>
                Tic Tac Toe
            </Typography>
            <Typography variant="h5" gutterBottom>
                {`${names.X} vs ${names.O}`}
            </Typography>
            <Board cells={board} onClick={handleClick} winningLine={winningLine} />
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom>
                    {winner ? `Winner: ${names[winner]}` : `Next player: ${xIsNext ? names.X : names.O}`}
                </Typography>
                <Typography variant="body1">
                    Score - {names.X}: {scoreX} | {names.O}: {scoreO}
                </Typography>
                {renderRestartButton()}
            </Box>
        </Card>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message={`${names[winner]} wins the game!`}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        </>
    );
}

function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return { winner: cells[a], line: lines[i] }; // Return both winner and the winning line
        }
    }
    return null;
}


export default Game;
