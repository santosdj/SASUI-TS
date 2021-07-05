import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DraftsIcon from '@material-ui/icons/Drafts';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Box, Typography } from '@material-ui/core';
import UserDraftRequests from '../components/Home/UserDraftRequests';
import UserOpenRequests from '../components/Home/UserOpenRequests';
import UserClosedRequests from '../components/Home/UserClosedRequests';
import UserAprovalRequests from '../components/Home/UserAprovalRequests';
import UserTodoRequests from '../components/Home/UserTodoRequests';
import { RequestType } from '../hooks/useRequestTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [userRequest, setUserRequest] = React.useState<RequestType[]>([]);
  const [userRequestToAprove, setuserRequestToAprove] = React.useState<
    RequestType[]
  >([]);
  const [userRequestToDo, setuserRequestToDo] = React.useState<RequestType[]>(
    []
  );

  const [userRequestDone, setuserRequestDone] = React.useState<RequestType[]>(
    []
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  async function fetchData() {
    const userRequestURL = `${process.env.REACT_APP_API_URL}?nome=CN=Vinicius%20Machado/OU=Coffee/OU=NovaVenecia/OU=LDCBrazil/O=LouisDreyfus`;
    console.log(userRequestURL);
    const data = await (await fetch(userRequestURL)).json();

    setUserRequest(
      data.filter((request: RequestType) => {
        return request.significadostatus === 'Rascunho';
      })
    );

    setuserRequestToDo(
      data.filter((request: RequestType) => {
        const status = request.significadostatus;
        return status === 'TI – Processamento da solicitacao';
      })
    );

    setuserRequestToAprove(
      data.filter((request: RequestType) => {
        const status = request.significadostatus;
        return (
          status !== 'Rascunho' &&
          status !== 'Encerrado' &&
          status !== 'Abortado' &&
          status !== 'Cancelado'
        );
      })
    );

    setuserRequestDone(
      data.filter((request: RequestType) => {
        const status = request.significadostatus;
        return (
          status === 'Encerrado' ||
          status === 'Abortado' ||
          status === 'Cancelado'
        );
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
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
          label={`Rascunhos(${userRequest.length})`}
        ></Tab>
        <Tab
          icon={<RadioButtonUncheckedIcon />}
          label={`Em Andamento(${userRequestToAprove.length})`}
          disabled={userRequestToAprove ? false : true}
        ></Tab>
        <Tab
          icon={<CheckCircleOutlineIcon />}
          label={`Encerrados(${userRequestDone.length})`}
        ></Tab>
        <Tab
          icon={<AssignmentIndIcon />}
          label={`Para Aprovar(${userRequestToAprove.length}
        )`}
        ></Tab>
        <Tab
          icon={<ListAltIcon />}
          label={`Para Executar(${userRequestToDo.length})`}
        ></Tab>
      </Tabs>

      <TabPanel value={value} index={0}>
        <UserDraftRequests rows={userRequest} title={'Rascunho'} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserOpenRequests rows={userRequestToAprove} title={'Em Aprovação'} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserClosedRequests rows={userRequestDone} title={'Encerrados'} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserAprovalRequests />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <UserTodoRequests />
      </TabPanel>
    </Paper>
  );
}
