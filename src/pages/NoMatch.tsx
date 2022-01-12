import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProps } from "react-router";

export function NoMatch(props: RouteProps): JSX.Element {
  console.log(props);
  return <div>Please No Match in finfo</div>;
}
