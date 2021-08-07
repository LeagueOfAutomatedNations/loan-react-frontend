import React, { useState, Fragment, useEffect } from "react";
import feathersClient from "./feathers";
import { DataGrid, GridColDef, GridSortModel } from "@material-ui/data-grid";

export function PlayerRankings() {
  // const result = ;
  const [users, setUsers] = useState([] as Array<{ ingame_name: string }>);

  useEffect(() => {
    (async () => {
      const result = await feathersClient.service("users").find();
      result.forEach((user: any) => {
        user.combined = user.gcl + user.power;
      });
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

  const columns:GridColDef[] = [
      // TODO: sorting does not seem to work when we use a sortModel.
    // { field: "screeps_id", headerName: "Screeps Id", flex: 1, },
    { field: "ingame_name", headerName: "Name", flex: 1/*, sortable:true*/ }, // TODO: link to screeps profile?
    { field: "gcl", type: "number", headerName: "GCL", flex: 1 /*, sortable:true*/},
    { field: "power", type: "number", headerName: "Power", flex: 1 /*, sortable:true*/},
    { field: "combined", type: "number", headerName: "Combined", flex: 1/*, sortable:true*/ }
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
            // disableSelectionOnClick
            sortModel={sortModel}
            // onSortModelChange={(model) => setSortModel(model)}
          />
        </div>
      </div>
    </>
  );
}
