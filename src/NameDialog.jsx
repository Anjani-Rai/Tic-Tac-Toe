import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function NameDialog({ open, onSubmit }) {
  const [nameX, setNameX] = useState("");
  const [nameO, setNameO] = useState("");

  return (
    <Dialog open={open} onClose={() => onSubmit(nameX, nameO)}>
      <DialogTitle>Enter Player Names</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Player X Name"
          type="text"
          fullWidth
          variant="standard"
          value={nameX}
          onChange={(e) => setNameX(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Player O Name"
          type="text"
          fullWidth
          variant="standard"
          value={nameO}
          onChange={(e) => setNameO(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSubmit(nameX, nameO)}>Start Game</Button>
      </DialogActions>
    </Dialog>
  );
}
export default NameDialog
