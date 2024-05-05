// Board.js

import React from "react";
import Cell from "./Cell";
import { Box } from "@mui/material";

function Board({ cells, onClick, winningLine }) {
  return (
    <Box 
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1, // Adjust gap for better visual appearance
        width: "100%", // Ensure it takes full width of the parent container
        justifyContent: "center", // Center grid items horizontally
        alignItems: "center", // Center grid items vertically
      }}
    >
      {cells.map((cell, i) => (
        <Cell key={i} value={cell} onClick={() => onClick(i)} isWinning={winningLine.includes(i)} />
      ))}
    </Box>
  );
}

export default Board;
