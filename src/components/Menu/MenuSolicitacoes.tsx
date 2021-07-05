import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
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

export default function MenuSolicitacoes() {
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
