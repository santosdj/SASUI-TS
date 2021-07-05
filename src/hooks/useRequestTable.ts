export interface HeadCell {
  disablePadding: boolean;
  id: keyof RequestType;
  label: string;
  numeric: boolean;
}
export type RequestType = {
  id: string;
  cargo: string;
  centrolucro: string;
  colaborador: string;
  cpf: string;
  data_sol: string;
  departamento: string;
  empresa: string;
  filial: string;
  gerente_0: string;  
  nome: string;
  nomeempresa: string;
  nomefilial: string;
  observacoes: string;
  plataforma: string;
  significadostatus: string;
  solicnum: string;
  tipochamado: string;
  tipocolaborador: string;
};

function setStatusTableHeader(){
 const header:HeadCell[] = [
  {
    id: 'significadostatus',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  { id: 'solicnum', numeric: false, disablePadding: false, label: 'Num' },
  { id: 'data_sol', numeric: false, disablePadding: false, label: 'Enviado em:' },
  { id: 'colaborador', numeric: false,disablePadding: false, label: 'Colaborador' },
  {id:"tipochamado", numeric:false, disablePadding: false, label: 'Tipo' },
];
return header;

}

function setNumberTableHeader(){
  const header:HeadCell[] = [
   {
     id: 'solicnum',
     numeric: false,
     disablePadding: true,
     label: 'Num',
   },
   { id: 'significadostatus', numeric: false, disablePadding: false, label: 'Status' },
   { id: 'colaborador', numeric: false,disablePadding: false, label: 'Colaborador' },
   {id:"tipochamado", numeric:false, disablePadding: false, label: 'Tipo' },
 ];
 return header;
 
 }




export function useRequestTable(headerType:string | "status"){
  let headCells:HeadCell[] = [];
  headCells = (headerType==="status" ? setStatusTableHeader(): setNumberTableHeader());

  return {headCells}
}


