import Box from "@mui/material/Box";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import * as React from "react";
import { useParams } from "react-router-dom";

import WorkFlowSteps from "../../components/controls/WorkFlowSteps";
import { fetchRequestsById } from "../../services/data/RequestServices";
import { IEmployee } from "../RequestStepForm/components/Interface";
import AS400Table from "./components/AS400Table";
import EmployeeForm from "./components/EmployeeForm";
import SAPTable from "./components/SAPTable";

type RequestParams = {
  id: string;
};

export function Request(): JSX.Element {
  const params = useParams<RequestParams>();
  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<any>();
  async function fetchData() {
    const data = await fetchRequestsById(params.id);
    console.log("no form", data);
    if (!isCancelled) {
      setInitialData(data);
      console.log("definiu initial data", data);
    }
  }

  React.useEffect(() => {
    setIsCancelled(false);
    fetchData();
    console.log("terminou de carregar");

    return () => {
      console.log("entrou no cancelado");
      setIsCancelled(true);
    };
  }, []);

  return (
    <Box
      sx={{
        marginTop: "4px",
        "& .MuiTextField-root": { m: 1, minWidth: "30px" },
        "& .MuiInputBase-root": { m: 1, minWidth: "30px" },
        "& .MuiDataGrid-root": { m: 1, minWidth: "30px" },
      }}
    >
      {initialData && (
        <>
          <EmployeeForm values={initialData} />
          {initialData.saptable.length !== 0 && (
            <SAPTable rows={initialData.saptable} />
          )}

          {initialData.as400table.length !== 0 && (
            <AS400Table rows={initialData.as400table} />
          )}

          <WorkFlowSteps request_id={params.id} />
        </>
      )}
    </Box>
  );
}
