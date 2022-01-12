/* eslint-disable react/jsx-no-bind */
import { Paper, Typography, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";

import logo from "../assets/LDC_logo.png";
import { useAuth } from "../hooks/useAuth";

export default function SignIn(): JSX.Element {
  const { signInWithAD, accountInfo } = useAuth();
  const history = useHistory();

  async function mySignIn() {
    const accessToken = localStorage.getItem("@AzureAd:accessToken");

    if (!accessToken) {
      console.log("logando");
      await signInWithAD();
    }
    history.replace("/home");
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      mainContent: {
        display: "flex",
        flexGrow: 1,
        padding: theme.spacing(3),
        flexDirection: "column",
        alignItems: "center",
      },
      thisContent: {
        display: "flex",
        flexGrow: 1,
        padding: theme.spacing(3),
        flexDirection: "column",
        alignItems: "left",
        maxWidth: 500,
      },
      logo: {
        width: 200,
        padding: theme.spacing(1),
      },
      button: {
        width: 80,
        padding: 0,
        alignItems: "center",
        marginLeft: 50,
      },
    })
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {accountInfo?.isAuthenticated ? <Redirect to="/home" /> : ""}
      <main className={classes.mainContent}>
        <Paper>
          <div className={classes.root}>
            <img src={logo} alt="LDC Brazil" className={classes.logo} />
            <div className={classes.thisContent}>
              <Typography>
                Por favor, clique no botão para fazer o login utilizando seu
                email da LDC.
              </Typography>
              <div>
                <Button variant="contained" color="primary" onClick={mySignIn}>
                  Entrar
                </Button>
              </div>
            </div>
          </div>
          <p />
        </Paper>
      </main>
    </div>
  );
}
