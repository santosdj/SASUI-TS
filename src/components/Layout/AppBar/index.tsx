import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
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
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import clsx from "clsx";
import React, { Fragment } from "react";

import { useAuth } from "../../../hooks/useAuth";
import MenuMain from "../../Menu/MenuMain";
import MenuSAP from "../../Menu/MenuSAP";
import MenuSolicitacoes from "../../Menu/MenuSolicitacoes";
import { useLayout } from "../useLayout";

const drawerWidth = 230;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// eslint-disable-next-line @typescript-eslint/naming-convention
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MenuNavigator(): JSX.Element {
  const { accountInfo, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { config, classes, theme } = useLayout();

  const handleDrawerOpen = () => {
    console.log("handle open");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log("handle close");
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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={config.accountmenu.desktopid}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {newMenu}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={config.accountmenu.mobileid}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label={config.message.text}
          color="inherit"
          size="large"
        >
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>{config.message.menutext}</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label={config.notification.text}
          color="inherit"
          size="large"
        >
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
          size="large"
        />
        <AccountCircle />
        <p>{config.accountmenu.profiletext}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            size="large"
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
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label={config.message.text}
              color="inherit"
              size="large"
            >
              <Badge badgeContent={config.message.count} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label={config.notification.text}
              color="inherit"
              size="large"
            >
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
              size="large"
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
              size="large"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer variant="permanent" open={open}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <MenuMain />
        <Divider />
        <MenuSolicitacoes />
        <MenuSAP />
      </Drawer>
    </>
  );
}
