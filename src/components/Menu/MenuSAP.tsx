import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link } from "react-router-dom";

import sapicon from "../../assets/sap2.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: 16,
  },
}));

export default function MenuSAP(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem component={Link} to="/requests/ordered/ci">
        <ListItemIcon>
          <ControlCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Controles Internos" />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemIcon color="primary">
          <span>
            <img src={sapicon} alt="Menu SAP" />
          </span>
        </ListItemIcon>
        <ListItemText primary="" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Em análise" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ArtTrackIcon />
            </ListItemIcon>
            <ListItemText primary="Em Execução" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ArtTrackIcon />
            </ListItemIcon>
            <ListItemText primary="Todas" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
