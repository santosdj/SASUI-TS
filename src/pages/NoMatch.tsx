import React from 'react';
import { RouteProps } from 'react-router';

export function NoMatch(props: RouteProps) {
  console.log('no match');
  console.log(props.location);
  console.log(props);
  return <div>Please No Match in finfo</div>;
}
