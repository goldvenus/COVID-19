import React from "react";

import GridContainer from "../../shared/Grid/GridContainer";
import GridItem from "../../shared/Grid/GridItem";
import Card from "../../shared/Card/Card";
import CardHeader from "../../shared/Card/CardHeader";
import CardBody from "../../shared/Card/CardBody";
import Table from "../../shared/Table/Table";

import useStyles from "../styles";

function CasesCountries(props) {
  const {
    order,
    orderBy,
    formatValue,
    handleRequestSort,
    stableSort,
    getComparator,
    rows,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h2 className={classes.cardTitleWhite}>Countries</h2>
            <p className={classes.cardCategoryWhite}>
              A list of countries with their cases
            </p>
          </CardHeader>
          <CardBody>
            <Table
              pagination
              sortable
              order={order}
              orderBy={orderBy}
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                null,
                null,
                "Country",
                null,
                "Cases",
                null,
                "Deaths",
                "Recovered",
                "Active",
                "Critical",
                "Cases per one million",
                "Deaths per one million",
              ]}
              tableData={stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
              formatValue={formatValue}
              onRequestSort={handleRequestSort}
              totalRows={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default CasesCountries;
