import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: 16,
  },
}));

export default function MenuSolicitacoes(): JSX.Element {
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
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Solicitações" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/requests/ordered/number"
          >
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Número" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/requests/ordered/status"
          >
            <ListItemIcon>
              <ArtTrackIcon />
            </ListItemIcon>
            <ListItemText primary="Status" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
