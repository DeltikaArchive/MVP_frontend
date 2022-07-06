import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AppContext } from "../../Context/AppContext";

const columns = [
  { field: "normalized_distance", headerName: "Similarity", width: 90 },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "lot_size",
    headerName: "Lot size",
    type: "number",
    width: 80,
  },
  {
    field: "building_area",
    headerName: "Building size",
    type: "number",
    width: 110,
  },
  {
    field: "bedrooms",
    headerName: "Bedrooms",
    width: 80,
  },
  {
    field: "total_bathrooms_numeric",
    headerName: "Bathrooms",
    width: 80,
  },
  {
    field: "floors",
    headerName: "Floors",
    type: "number",
    width: 70,
  },
  {
    field: "sale_listing_price",
    headerName: "Listing price",
    type: "number",
    width: 100,
  },
  {
    field: "sale_closing_price",
    headerName: "Closing price",
    type: "number",
    width: 110,
  },
  {
    field: "date",
    headerName: "Closing date",
    width: 110,
  },
  {
    field: "distance",
    headerName: "Distance from subject",
    type: "number",
    width: 100,
  },
];

export default function Comps() {
  const { result } = React.useContext(AppContext)
  const [pageSize, setPageSize] = React.useState(15);
  const rows = result[ 7 ]
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.source_id}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 15, 20]}
        // checkboxSelection
        disableSelectionOnClick
        pagination
      />
    </Box>
  );
}
