import { alpha, Theme, useTheme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

type AppConfigType = {
  accountmenu: {
    desktopid: string;
    mobileid: string;
    profiletext: string;
    accounttext: string;
    avatar?: string;
    avataralt: string;
  };
  message: {
    count: number;
    text: string;
    menutext: string;
  };
  notification: {
    count: number;
    text: string;
    menutext: string;
  };
  search: {
    placeholder: string;
  };
};

export function useLayout() {
  const drawerWidth = 230;
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
        paddingRight: "20px",
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: "none",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9) + 1,
        },
      },
      toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(0.3),
      },
      search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto",
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      inputRoot: {
        color: "inherit",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
          width: "20ch",
        },
      },
      cardSection: {
        minHeight: 140,
        width: "100%",
      },
      cardContent: {
        display: "flex",
        alignItems: "center",
      },
      cardAvatar: {
        display: "block",
        width: 100,
        height: 100,
        margin: 20,
      },
      sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },
      sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
      },
      grow: {
        flexGrow: 1,
      },
    })
  );

  const config: AppConfigType = {
    accountmenu: {
      desktopid: "account-menu",
      mobileid: "account-menu-mobile",
      profiletext: "Perfil",
      accounttext: "Conta",
      avatar: "https://material-ui.com/static/images/avatar/1.jpg",
      avataralt: "Fake user",
    },
    message: {
      count: 4,
      text: `show ${2} new mails`,
      menutext: "Mensagens",
    },
    notification: {
      count: 6,
      text: `show ${4} new alerts`,
      menutext: "Notificações",
    },
    search: {
      placeholder: "Pesquisar...",
    },
  };
  const theme = useTheme();
  const classes = useStyles();
  return { config, classes, drawerWidth, theme };
}
