import React from 'react';
import sapicon from '../../assets/sap2.svg';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MenuSAP() {
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
        <ListItemText primary="Controles Internos"></ListItemText>
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
