/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import numeral from "numeral";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchAllStats, fetchTimelines } from "../redux/actions/dashboard";
import { fetchCountries } from "../redux/actions/countries";

import { selectStats, selectTimelines } from "../selectors/dashboard";
import { selectCountries } from "../selectors/countries";

const R = require("ramda");

function useRecovered() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();

  const { timeline, timelineRsf } = useSelector(selectTimelines, shallowEqual);
  const { stats, statsRsf } = useSelector(selectStats, shallowEqual);
  const { countries, countriesRsf } = useSelector(
    selectCountries,
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchAllStats());
    dispatch(fetchTimelines());
    dispatch(fetchCountries());
  }, []);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatValue = (prop, key) => {
    if (key === 1) {
      return <img src={prop} height={20} width={30} alt={prop} />;
    } else if (key >= 4) {
      return prop && prop > 0 ? `${numeral(prop).format("0,0")}` : 0;
    }
    return prop;
  };

  const flag = R.map((x) => x.countryInfo.flag, countries);
  const country = R.map((x) => x.country, countries);
  const countryCode = R.map((x) => x.countryInfo.iso2, countries);
  const recovered = R.map((x) => x.recovered, countries);

  const rows = [...Array(countries.length)].map((_, index) => [
    index,
    flag[index],
    countryCode[index],
    country[index],
    recovered[index],
  ]);

  return {
    stats,
    statsRsf,
    timeline,
    timelineRsf,
    countries,
    countriesRsf,
    order,
    orderBy,
    formatValue,
    handleRequestSort,
    stableSort,
    getComparator,
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default useRecovered;
