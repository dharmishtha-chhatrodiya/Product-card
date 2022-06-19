import * as React from "react";
import styled from "styled-components";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { allData } from "./data";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// for each data more detail
const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)`
  font-weight: bold !important;
  color: white !important;
  background-color: #6cdcd3 !important;
`;
const StyleInputBase = styled(InputBase)`
  border: 1px solid #d1c8c8;
  padding: 10px;
  border-radius: 8px;
  max-width: 300px !important;
  width: 100%;
`;

export default function SimpleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allSearchData, setAllSearchData] = React.useState(allData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //search data
  const requestSearch = (searchedVal) => {
    const filteredRows = allData.filter((row) =>
      row.title.toLowerCase().includes(searchedVal.toLowerCase())
    );
    setAllSearchData(filteredRows);
  };

  return (
    <Paper>
      <Box position="relative" sx={{ padding: "14px", display: "flex" }}>
        <StyleInputBase
          placeholder="Search Data ..."
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => requestSearch(event.target.value)}
        />
      </Box>
      {allSearchData.length === 0 ? (
        <h1>No Data Found</h1>
      ) : (
        <>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox" />
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSearchData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <ExpandableTableRow
                      key={row.id}
                      expandComponent={
                        <TableCell colSpan="2">{row.title}</TableCell>
                      }
                    >
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                    </ExpandableTableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
