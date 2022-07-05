import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AppContext } from "../../Context/AppContext";

const columns = [
  { field: "normalized_distance", headerName: "Similarity", width: 90 },
  {
    field: "address",
    headerName: "Address",
    width: 150
  },
  {
    field: "lot_size",
    headerName: "Lot Size",
    width: 150
  },
  {
    field: "building_are",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export default function Comps() {
  const { result } = React.useContext(AppContext)
  
  const rows = result[7]
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{Toolbar:GridToolbar}}
        pageSize={15}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick

      />
    </Box>
  );
}
