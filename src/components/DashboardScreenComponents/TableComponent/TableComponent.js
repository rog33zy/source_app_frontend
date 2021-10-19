import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import styleClasses from "./TableComponent.module.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#7b924e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 490,
    [theme.breakpoints.up("md")]: {
      maxHeight: 480,
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: 800,
    },
  },
  table: {
    minWidth: 700,
    textTransform: "capitalize",
  },
}));

export default function TableComponent(props) {
  const classes = useStyles();

  const tableHeadingsList = [
    "District",
    "Partner Org",
    "Sales Made",
    "Sold Qty",
    "Initial Payment",
    "In-kind Balance",
    "Cash Balance",
    "In-Kind Payment",
    "Final Payment",
    "Purchased Qty",
    "Purchased Value",
  ];

  const rows = props.rows;

  const contentToShow = (
    <TableContainer className={classes.container} component={Paper}>
      <div style={{ margin: "10px" }}>
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          style={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {tableHeadingsList.map((title, index) => (
                <StyledTableCell key={index}>
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {title}
                  </span>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left" component="th" scope="row">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.district}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.partnerOrganization}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.totalNumberOfLoans
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.totalSeedAmountPurchased
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    MT
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    K{" "}
                    {row.totalInitialAmountPaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {(row.totalSeedOwing - row.totalSeedQuantityPaid)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    MT
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    K{" "}
                    {(row.totalAmountOwing - row.totalSubsequentAmountPaid)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.totalSeedQuantityPaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    MT
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    K{" "}
                    {row.totalSubsequentAmountPaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    {row.totalSeedQuantityPurchased
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    MT
                  </span>
                </StyledTableCell>

                <StyledTableCell align="justify">
                  <span
                    className={styleClasses.textTruncate}
                    style={{ fontSize: "12px" }}
                  >
                    K{" "}
                    {row.totalSeedValuePurchased
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );

  return <React.Fragment>{contentToShow}</React.Fragment>;
}
