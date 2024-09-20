import { Alert, AlertColor } from "@mui/material";
import React from "react";

interface AlertCredentialsProps {
  severity: AlertColor;
  text: React.ReactNode;
}

export function AlertCredentials({ severity, text }: Readonly<AlertCredentialsProps>) {
  return <Alert severity={severity}>{text}</Alert>;
}
