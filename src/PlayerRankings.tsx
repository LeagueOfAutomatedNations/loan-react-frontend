import React, { useState, Fragment, useEffect } from "react";
import feathersClient from "./feathers";
import { DataGrid, GridSortModel } from "@material-ui/data-grid";

export function PlayerRankings() {
  // const result = ;
  const [users, setUsers] = useState([] as Array<{ ingame_name: string }>);

  useEffect(() => {
    (async () => {
      const result = await feathersClient.service("users").find();
      setUsers(result);
    })();

    return () => {
      // Component unmount code.
    };
  }, []);

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: "combined",
      sort: "desc"
    }
  ]);

  const columns = [
    // { field: "screeps_id", headerName: "Screeps Id", flex: 1, },
    { field: "ingame_name", headerName: "Name", flex: 1, }, // TODO: link to screeps profile?
    { field: "gcl", headerName: "GCL", flex: 1, },
    { field: "power", headerName: "Power", flex: 1, },
    {
      field: "combined",
      headerName: "Combined",
      flex: 1,
      valueGetter: (params: any) => `${params.getValue(params.id, "gcl") + params.getValue(params.id, "power")}`
    }
  ];

  return (
    <>
      <h1> Player Rankings</h1>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            pageSize={50}
            // checkboxSelection
            disableSelectionOnClick
            sortModel={sortModel}
          />
        </div>
      </div>
    </>
  );
}
