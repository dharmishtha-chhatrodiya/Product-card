import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Grid,
  InputBase,
  Pagination,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { productData } from "./ProductData";
import ProductCard from "./ProductCard";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function Product() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);
  const [allSearchData, setAllSearchData] = React.useState(productData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //search product data
  const requestSearch = (searchedVal) => {
    const filteredRows = productData.filter((row) =>
      row.name.toLowerCase().includes(searchedVal.toLowerCase())
    );
    setAllSearchData(filteredRows);
  };
  console.log(allSearchData);
  return (
    <Paper>
      <Box sx={{ mb: 3 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              background: "#a361f0",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Product
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Product…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => requestSearch(event.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {/* product card */}
      <Grid container spacing={2} sx={{ p: 2 }}>
        {allSearchData.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h5" align="center" color="text.secondary">
              No Data Found
            </Typography>
          </Grid>
        ) : (
          allSearchData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              return (
                <Grid key={item.id} item xs={12} md={4} lg={3}>
                  <ProductCard data={item} />
                </Grid>
              );
            })
        )}
      </Grid>
      <Pagination
        sx={{ display: "flex", pb: 6, pt: 3, justifyContent: "center" }}
        size="large"
        color="primary"
        count={allSearchData.length / 5 - 1}
        onChange={handleChangePage}
      />
    </Paper>
  );
}
