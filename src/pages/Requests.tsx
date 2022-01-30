import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EnhancedTable from "../components/Table";
import { useRequestTable, RequestType } from "../hooks/useRequestTable";
import RequestService from "../services/request.service";

type RequestsParams = {
  orderby: string;
};

export function Requests(): JSX.Element {
  const params = useParams<RequestsParams>();
  const [requests, setRequests] = useState<RequestType[]>([]);
  const headCells = useRequestTable(params.orderby);

  async function fetchData() {
    const data = await RequestService.getRequestList();
    setRequests(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <EnhancedTable
        rows={requests}
        headerData={headCells.headCells}
        title={`Listagem de requests - ${params.orderby}`}
        tableType={params.orderby}
      />
    </div>
  );
}
