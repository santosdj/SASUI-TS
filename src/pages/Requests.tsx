import { useParams } from 'react-router-dom';
import EnhancedTable from '../components/Table';
import { useEffect, useState } from 'react';
import { useRequestTable, RequestType } from '../hooks/useRequestTable';

type RequestsParams = {
  orderby: string;
};

export default function Requests() {
  const params = useParams<RequestsParams>();
  const [requests, setRequests] = useState<RequestType[]>([]);
  const headCells = useRequestTable(params.orderby);

  async function fetchData() {
    const data = await (await fetch(`${process.env.REACT_APP_API_URL}`)).json();
    setRequests(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <EnhancedTable
        rows={
          params.orderby === 'ci'
            ? requests.filter((request) => {
                return request.significadostatus === 'Controles Internos';
              })
            : requests
        }
        headerData={headCells.headCells}
        title={`Listagem de requests - ${params.orderby}`}
        tableType={params.orderby}
      ></EnhancedTable>
    </div>
  );
}
