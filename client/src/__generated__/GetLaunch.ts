/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLaunch
// ====================================================

export interface GetLaunch_launch_mission {
  __typename: "Mission";
  name: string | null;
}

export interface GetLaunch_launch {
  __typename: "Launch";
  id: string;
  mission: GetLaunch_launch_mission | null;
}

export interface GetLaunch {
  launch: GetLaunch_launch | null;
}
