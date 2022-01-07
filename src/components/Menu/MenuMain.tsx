import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: 16,
  },
}));

export default function MenuMain(): JSX.Element {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button key="Home" component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button key="Nova" component={Link} to="/sap/request">
        <ListItemIcon>
          <AddCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="SAP" />
      </ListItem>

      <ListItem button key="Nova 2" component={Link} to="/as400/request">
        <ListItemIcon>
          <AddCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="AS400" />
      </ListItem>
    </List>
  );
}
