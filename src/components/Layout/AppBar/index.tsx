import React from 'react';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useLayout } from '../useLayout';
import { Fragment } from 'react';
import MenuMain from '../../Menu/MenuMain';
import MenuSolicitacoes from '../../Menu/MenuSolicitacoes';
import MenuSAP from '../../Menu/MenuSAP';
import { useAuth } from '../../../hooks/useAuth';

export default function MenuNavigator() {
  const { accountInfo, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { config, classes, theme } = useLayout();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const newMenu = (
    <Card className={classes.cardSection}>
      <CardActionArea>
        <CardContent>
          <Avatar
            alt={accountInfo?.user.displayName}
            src={accountInfo?.user.avatar}
            className={classes.cardAvatar}
          />
          <div>
            <div>{accountInfo?.user.displayName}</div>
            <div>{accountInfo?.user.email}</div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={signOut}>
          Sign Out
        </Button>
        <Button size="small" color="primary" onClick={handleMenuClose}>
          Fechar
        </Button>
      </CardActions>
    </Card>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={config.accountmenu.desktopid}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {newMenu}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={config.accountmenu.mobileid}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label={config.message.text} color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>{config.message.menutext}</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label={config.notification.text} color="inherit">
          <Badge badgeContent={config.notification.count} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{config.notification.menutext}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls={config.accountmenu.desktopid}
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <AccountCircle />
        <p>{config.accountmenu.profiletext}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            SAS On Cloud
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={config.search.placeholder}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label={config.message.text} color="inherit">
              <Badge badgeContent={config.message.count} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label={config.notification.text} color="inherit">
              <Badge badgeContent={config.notification.count} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={config.accountmenu.desktopid}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt={accountInfo?.user.displayName}
                src={accountInfo?.user.avatar}
              />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={config.accountmenu.mobileid}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <MenuMain></MenuMain>
        <Divider />
        <MenuSolicitacoes></MenuSolicitacoes>
        <MenuSAP></MenuSAP>
      </Drawer>
    </Fragment>
  );
}
