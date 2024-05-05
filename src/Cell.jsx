import React from "react";
import { Button } from "@mui/material";

function Cell({ value, onClick, isWinning }) {
    return (
        <Button
            sx={{
                height: 120,
                width: 120,
                fontSize: "2rem",
                color: "primary",
                backgroundColor: "transparent",
                border: "2px solid",
                borderColor: "secondary.main",
                '&:hover': {
                    backgroundColor: "secondary.light",
                    opacity: 0.8,
                },
                transition: 'transform .3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)'
                },
                '&:active': {
                    transform: 'scale(0.9)'
                },
                position: "relative",
                ...(isWinning && {
                    '&::after': {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        width: "100%",
                        height: "4px",
                        backgroundColor: "red",
                        transform: "scaleX(1)"
                    }
                })
            }}
            onClick={onClick}
        >
            {value}
        </Button>
    );
}

export default Cell;  // Make sure this is correct
