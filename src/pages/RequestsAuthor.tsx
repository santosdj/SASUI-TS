import React from 'react';
import { useParams } from 'react-router-dom';

type RequestsParams = {
  status: string;
};

export function RequestsAuthor() {
  const params = useParams<RequestsParams>();
  return <div>Requests Author {params.status}</div>;
}
