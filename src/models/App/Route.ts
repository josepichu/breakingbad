import React from "react";

export interface Route {
  key: string;
  path: string;
  component(): React.ReactNode;
  exact?: boolean;
  permission?: string;
}
