import React, { createContext, useContext, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

export const DialogContext = createContext({ openContextDialog: null });

export const DialogProvider = ({ children }) => {
  const [isContextDialogOpen, setContextDialogOpen] = useState(false);
  const [contextDialogAgreeButtonText, setContextDialogAgreeButtonText] = useState("Agree");
  const [contextDialogDisagreeButtonText, setContextDialogDisagreeButtonText] = useState("Disagree");
  const [contextDialogContentText, setContextDialogContentText] = useState("");
  const [contextDialogTitle, setContextDialogTitle] = useState("");
  const handleContextDialogAgree = React.useRef(null); // Initialize as null
  const handleContextDialogDisagree = React.useRef(null);

  const openContextDialog = (agreeText, disagreeText, contentText, title, handleAgreeFn, handleDisagreeFn) => {
    setContextDialogAgreeButtonText(agreeText);
    setContextDialogDisagreeButtonText(disagreeText);
    setContextDialogContentText(contentText);
    setContextDialogTitle(title);
    handleContextDialogAgree.current =() => {
      handleAgreeFn();
      setContextDialogOpen(false);
    };
    handleContextDialogDisagree.current=() => {
      handleDisagreeFn();
      setContextDialogOpen(false);
    };
    setContextDialogOpen(true);
  };

  return (
    <DialogContext.Provider
      value={{

        openContextDialog,

      }}
    >
      {children}
      <Dialog open={isContextDialogOpen} onClose={() => setContextDialogOpen(false)}>
        <DialogTitle>{contextDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contextDialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContextDialogDisagree.current}>{contextDialogDisagreeButtonText}</Button>
          <Button onClick={handleContextDialogAgree.current} autoFocus>
            {contextDialogAgreeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
