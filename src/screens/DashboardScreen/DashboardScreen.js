import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import {
  DownloadButtonComponent,
  TableComponent,
  TotalComponent,
} from "../../components/DashboardScreenComponents";

import { totalsHandler } from "../../handlers/dashboardTotalsHandler";

import {
  setUrlInitParamsAction,
  initializeLoanEntriesAction,
  downloadCSVFileAction,
  authRefreshAction,
} from "../../store/actions";

import classes from "./DashboardScreen.module.css";
const DashboardScreen = (props) => {
  const [currentCropValue, setCurrentCropValue] = React.useState("all");
  const [currentVarietyValue, setCurrentVarietyValue] = React.useState("all");
  const [currentSeasonValue, setCurrentSeasonValue] =
    React.useState("2021-2022");

  React.useEffect(() => {
    return () => setCurrentVarietyValue("all");
  }, [currentCropValue]);

  const accessToken = useSelector((state) => state.auth.accessToken);

  const loanEntries = useSelector((state) => state.loanEntries.loanEntries);

  const userObject = useSelector((state) => state.auth.userObject);

  const loanEntriesAreLoading = useSelector(
    (state) => state.loanEntries.loading
  );

  const downloadCSVFilesIsLoading = useSelector(
    (state) => state.downloadCSVFile.loading
  );

  const dispatch = useDispatch();

  function onClickDownloadCSVFileHandler(content) {
    dispatch(authRefreshAction());
    dispatch(downloadCSVFileAction(content, accessToken));
  }

  let params = "";

  if (currentCropValue !== "all") {
    if (params === "") {
      params += `?crop=${currentCropValue}`;
    } else {
      params += `&crop=${currentCropValue}`;
    }
  }

  if (currentVarietyValue !== "all") {
    if (params === "") {
      params += `?variety=${currentVarietyValue}`;
    } else {
      params += `&variety=${currentVarietyValue}`;
    }
  }

  if (currentSeasonValue !== "all") {
    if (params === "") {
      params += `?season=${currentSeasonValue}`;
    } else {
      params += `&season=${currentSeasonValue}`;
    }
  }

  const callbackInitLoanEntries = React.useCallback(() => {
    dispatch(setUrlInitParamsAction(params));
    dispatch(authRefreshAction());
    dispatch(initializeLoanEntriesAction(params, accessToken));
  }, [params, accessToken, dispatch]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      callbackInitLoanEntries();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, accessToken, dispatch]);

  const seasonsOptions = [{ label: "2021-2022", value: "2021-2022" }];

  const cropsOptions = [
    { label: "All", value: "all" },
    { label: "Soy Beans", value: "Soy Beans" },
    { label: "Groundnuts", value: "Groundnuts" },
    { label: "Beans", value: "Beans" },
  ];

  const soyVarietyOptions = [
    { label: "All", value: "all" },
    { label: "Kafue", value: "Kafue" },
  ];

  const groundnutsVarietyOptions = [
    { label: "All", value: "all" },
    { label: "Wamusanga", value: "Wamusanga" },
    { label: "Lupande", value: "Lupande" },
  ];

  const beansVarietyOptions = [
    { label: "All", value: "all" },
    { label: "Luangeni", value: "Luangeni" },
    { label: "Lungwebungu", value: "Lungwebungu" },
  ];

  let varietyOptions;
  switch (currentCropValue) {
    case "Soy Beans":
      varietyOptions = soyVarietyOptions;
      break;
    case "Groundnuts":
      varietyOptions = groundnutsVarietyOptions;
      break;
    case "Beans":
      varietyOptions = beansVarietyOptions;
      break;
    default:
      varietyOptions = [];
  }

  const totalNumberOfSales = totalsHandler(loanEntries, "totalNumberOfLoans");
  const totalSeedAmountPurchased = totalsHandler(
    loanEntries,
    "totalSeedAmountPurchased"
  ).toFixed(2);
  const totalInitialAmountPaid = totalsHandler(
    loanEntries,
    "totalInitialAmountPaid"
  ).toFixed(0);
  const totalSeedOwing = (
    totalsHandler(loanEntries, "totalSeedOwing") -
    totalsHandler(loanEntries, "totalSeedQuantityPaid")
  ).toFixed(2);
  const totalAmountOwing =
    totalsHandler(loanEntries, "totalAmountOwing") -
    totalsHandler(loanEntries, "totalSubsequentAmountPaid").toFixed(0);
  const totalSeedQuantityPaid = totalsHandler(
    loanEntries,
    "totalSeedQuantityPaid"
  ).toFixed(2);
  const totalSubsequentAmountPaid = totalsHandler(
    loanEntries,
    "totalSubsequentAmountPaid"
  ).toFixed(0);
  const totalSeedQuantityPurchased = totalsHandler(
    loanEntries,
    "totalSeedQuantityPurchased"
  ).toFixed(2);
  const totalSeedValuePurchased = totalsHandler(
    loanEntries,
    "totalSeedValuePurchased"
  ).toFixed(0);

  let contentToShow;

  if (loanEntriesAreLoading) {
    contentToShow = <div className={classes.loader}></div>;
  } else {
    contentToShow = <TableComponent rows={loanEntries} />;
  }

  return (
    <div className={classes.DashboardScreen}>
      <Grid container spacing={0}>
        <TotalComponent
          heading="Sales Made"
          value={totalNumberOfSales
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          isSelectTextField={false}
        />

        <TotalComponent
          heading="Sold Qty"
          value={totalSeedAmountPurchased
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="MT"
          isSelectTextField={false}
        />

        <TotalComponent
          heading="D Payment"
          value={totalInitialAmountPaid
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="ZMW"
          isSelectTextField={false}
        />
        <TotalComponent
          heading="In-Kind Balance"
          value={totalSeedOwing
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="MT"
          isSelectTextField={false}
        />
        <TotalComponent
          heading="Monetary Balance"
          value={totalAmountOwing
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="ZMW"
          isSelectTextField={false}
        />
        <TotalComponent
          heading="Final Payment"
          value={totalSubsequentAmountPaid
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="ZMW"
          isSelectTextField={false}
        />
        <TotalComponent
          heading="In-Kind Payment"
          value={totalSeedQuantityPaid
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol="MT"
          isSelectTextField={false}
        />
        <TotalComponent
          heading="Purchased MT"
          value={totalSeedQuantityPurchased
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol=""
          isSelectTextField={false}
        />
        <TotalComponent
          heading="Purchased ZMW"
          value={totalSeedValuePurchased
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          symbol=""
          isSelectTextField={false}
        />

        <TotalComponent
          isSelectTextField={true}
          label="Crop"
          exportValueFunction={setCurrentCropValue}
          defaultValue="all"
          select={true}
          selectOptions={cropsOptions}
        />

        <TotalComponent
          isSelectTextField={true}
          label="Variety"
          exportValueFunction={setCurrentVarietyValue}
          disabled={currentCropValue === "all"}
          defaultValue=""
          select={true}
          selectOptions={varietyOptions}
        />

        <TotalComponent
          isSelectTextField={true}
          label="Season"
          exportValueFunction={setCurrentSeasonValue}
          defaultValue="2021-2022"
          select={true}
          selectOptions={seasonsOptions}
        />
      </Grid>
      <br />
      <Grid container spacing={0}>
        {downloadCSVFilesIsLoading ? (
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <p>Downloading, please wait...</p>
          </Grid>
        ) : (
          <DownloadButtonComponent
            label="Download Farmers CSV File"
            onClick={() => onClickDownloadCSVFileHandler("farmers")}
            disabled={
              userObject.is_seed_field_supervisor ||
              userObject.is_seed_pea ||
              userObject.is_source_field_supervisor ||
              userObject.is_source_pea ||
              userObject.is_driver
            }
          />
        )}
        {downloadCSVFilesIsLoading ? (
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <p>Downloading, please wait...</p>
          </Grid>
        ) : (
          <DownloadButtonComponent
            label="Download Loans CSV File"
            onClick={() => onClickDownloadCSVFileHandler("loans")}
            disabled={
              userObject.is_seed_field_supervisor ||
              userObject.is_seed_pea ||
              userObject.is_source_field_supervisor ||
              userObject.is_source_pea ||
              userObject.is_driver
            }
          />
        )}
      </Grid>
      <br />
      {contentToShow}
    </div>
  );
};

export default DashboardScreen;
