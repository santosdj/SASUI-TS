/* eslint-disable @typescript-eslint/no-explicit-any */
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Tabs, Tab, Paper, Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect } from "react";

import UserAprovalRequests from "../components/Home/UserAprovalRequests";
import {
  draftColumns,
  openColumns,
  closedColumns,
} from "../components/Home/UserRequestColumns";
import UserRequests from "../components/Home/UserRequests";
import UserTodoRequests from "../components/Home/UserTodoRequests";
import { useAuth } from "../hooks/useAuth";
import RequestService from "../services/request.service";
import { IUserRequestCount } from "../utils/interfaces/home.interfaces";

interface ITabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export function Home(): JSX.Element {
  const { accountInfo } = useAuth();
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const [userRequestCount, setUserRequestCount] =
    React.useState<IUserRequestCount>({
      draft: 0,
      open: 0,
      closed: 0,
      aproving: 0,
      executing: 0,
    });

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  async function fetchData() {
    const user = accountInfo?.user.displayName;
    const userCount = await RequestService.getUserRequestCount(user as string);
    setUserRequestCount(userCount);
  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  function TabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab
          icon={<DraftsIcon />}
          label={`Rascunhos(${userRequestCount?.draft})`}
        />
        <Tab
          icon={<RadioButtonUncheckedIcon />}
          label={`Em Andamento(${userRequestCount?.open})`}
          disabled={userRequestCount?.open === 0}
        />
        <Tab
          icon={<CheckCircleOutlineIcon />}
          label={`Encerrados(${userRequestCount?.closed})`}
        />
        {accountInfo?.user.roles.isLider && (
          <Tab
            icon={<AssignmentIndIcon />}
            label={`Para Aprovar(${userRequestCount?.aproving}
        )`}
          />
        )}
        {accountInfo?.user.roles.isExecutor && (
          <Tab
            icon={<ListAltIcon />}
            label={`Para Executar(${userRequestCount?.executing})`}
          />
        )}
      </Tabs>

      {isLoading && "...loading"}
      {!isLoading && (
        <>
          <TabPanel value={value} index={0}>
            <UserRequests columns={draftColumns} report="draft" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserRequests columns={openColumns} report="open" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserRequests columns={closedColumns} report="closed" />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <UserAprovalRequests />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <UserTodoRequests />
          </TabPanel>
        </>
      )}
    </Paper>
  );
}
