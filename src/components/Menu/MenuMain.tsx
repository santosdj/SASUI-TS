import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
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

export default function MenuMain() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const mineMenu = () => {
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Minhas" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/requests/author/draft"
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Rascunhos" />
          </ListItem>

          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/requests/author/analysing"
          >
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText primary="Em Análise" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            component={Link}
            to="/requests/author/done"
          >
            <ListItemIcon>
              <DoneAllIcon />
            </ListItemIcon>
            <ListItemText primary="Encerradas" />
          </ListItem>
        </List>
      </Collapse>
    </List>;
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button key="Home" component={Link} to="/">
        <ListItemIcon>
          <HomeIcon></HomeIcon>
        </ListItemIcon>
        <ListItemText primary="Home"></ListItemText>
      </ListItem>

      <ListItem button key="Nova" component={Link} to="/requests/new">
        <ListItemIcon>
          <AddCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Nova"></ListItemText>
      </ListItem>
    </List>
  );
}
