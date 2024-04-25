import React, { useEffect, useMemo } from "react";
import { IconButton, Tooltip, Container, Box, Typography } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import {
  setFilesDownloadHistoryItems,
  setFilesDownloadHistoryArchiveDateFrom,
  setFilesDownloadHistoryArchiveDateTo,
  setFilesDownloadHistoryArchiveSearchText,
  setFilesDownloadHistoryReset
} from "../../../store/actions/FileDownloadHistoryActions";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { DialogContext } from "../../context/DialogContext";
import momenttz from "moment-timezone";

import DateRangeModal from "../../otherComponents/DateRangeModal/DateRangeModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import jspdf from "jspdf";
import 'jspdf-autotable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as XLSX from 'xlsx';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  },
  addActionButton: {
    color: "#FFFFFF!important",
    [theme.breakpoints.down("md")]: {
      padding: "6px!important"
    }
  },
  toolbarContainer: {
    display: "flex!important",
    justifyContent: "space-between"
  },
  excelButton: {
    marginLeft: "auto"
  }
}));

const AdminUsersHistory = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext)

  const getUsersDownloadHistoryQuery = gql`
    query getUsersDownloadHistory(
      $searchText: String!
      $startDate: String!
      $endDate: String!
  
  ) {
      get_users_download_history(
        searchText: $searchText
        startDate:$startDate
        endDate: $endDate
  
    )  {
      id
    username
    filename
    createdAt
    extension
    folder{
      id
      path
      folder_name
    }
    moreInfo
    deleted
    designation{
      id
      name
    }
      }
    }
  `;

  let [
    getUsersDownloadHistory, // Change variable name from getUsers to getDesignations
    {
      loading: getUsersDownloadHistoryQueryLoading,
      error: getUsersDownloadHistoryQueryError,
      data: getUsersDownloadHistoryQueryResult,
    },
  ] = useLazyQuery(getUsersDownloadHistoryQuery, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
   
    getUsersDownloadHistory({
      variables: {
        searchText: "",
        startDate: momenttz(),
        endDate: momenttz()
      }
    }); // Update the function call
  }, []);
  useEffect(() => {
    if (getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history) {
      props.setFilesDownloadHistoryItems(getUsersDownloadHistoryQueryResult.get_users_download_history);
    }
  }, [getUsersDownloadHistoryQueryResult])
  const columns = useMemo(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Date',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return momenttz(renderedCellValue).utcOffset(0).format('MM/DD/YYYY')
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Time',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return momenttz(renderedCellValue).utcOffset(0).format('HH:mm:ss')
        }
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },

      {
        accessorKey: 'filename',
        header: 'File Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'moreInfo',
        header: 'File More Info',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 130,
       
      },
      {
        accessorKey: 'folder.folder_name',
        header: 'Folder Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'designation.name',
        header: 'Designation',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      }
    ]
  );

  return (
    <>
      <Container
        className={classes.mainContainer}
        maxWidth={false}
        disableGutters={true}
      >
        <CustomTable
          exportFilename={"userdownlaodhistory"}
          renderTopToolbarCustomActions={({ table }) => {
            return <Container disableGutters={true} maxWidth={false} className={classes.toolbarContainer}>
              <>
                {props.filesDownloadHistoryArchiveDateFrom
                  && props.filesDownloadHistoryArchiveDateTo &&
                  <IconButton onClick={() => {
                    props.setFilesDownloadHistoryArchiveDateFrom(null);
                    props.setFilesDownloadHistoryArchiveDateTo(null);
                    props.setFilesDownloadHistoryArchiveSearchText("");
                    getUsersDownloadHistory({
                      variables: {
                        searchText: "",
                        startDate: momenttz(),
                        endDate: momenttz()
                      }
                    });
                  }}>
                    <ArrowBackIcon className={classes.searchBackIcon} />
                  </IconButton>
                }
                <DateRangeModal
                  searchIconText={"Archive Search"}
                  title={"Archive Search"}
                  onSearch={(startDate, endDate, searchText) => {
                    props.setFilesDownloadHistoryArchiveDateFrom(startDate);
                    props.setFilesDownloadHistoryArchiveDateTo(endDate);
                    props.setFilesDownloadHistoryArchiveSearchText(searchText);

                    getUsersDownloadHistory({
                      variables: {
                        searchText: searchText,
                        startDate: momenttz(startDate),
                        endDate: momenttz(endDate)
                      }
                    });
                  }}

                /></>

              <span className={classes.excelButton}>
                <Tooltip title={"Download Excel"}>
                  <IconButton onClick={() => {
                    const tableData = table.getPrePaginationRowModel().rows.map((row) => {

                      return columns.map((col) => {
                        if (col.header == "Date")
                          return momenttz(row.original[col.accessorKey]).utcOffset(0).format('MM/DD/YYYY');
                        if (col.header == "Time")
                          return momenttz(row.original[col.accessorKey]).utcOffset(0).format('HH:mm:ss');
                        if (col.header == "File More Info") {
                          const moreInfo = row.original[col.accessorKey] != "" ? JSON.parse(row.original[col.accessorKey]) : "";

                          
                        }
                        else
                          return row.getValue(col.accessorKey)

                      });
                    });

                    const ws = XLSX.utils.aoa_to_sheet([columns.map((col) => col.header), ...tableData]);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                    XLSX.writeFile(wb, `userdownlaodhistory.xlsx`);
                  }}>
                    <FileDownloadIcon />
                  </IconButton>
                </Tooltip>
              </span>
              <Tooltip title={"Download PDF"}>
                <IconButton onClick={() => {

                  const unit = "pt";
                  const size = "a4"; // use a1, a2, a3 or a4
                  const orientation = "portrait"; // portrait or landscape

                  const marginleft = 40;
                  const doc = new jspdf(orientation, unit, size);

                  const tableData = table.getPrePaginationRowModel().rows.map((row) => {

                    return columns.map((col) => {
                      if (col.header == "Date")
                        return momenttz(row.original[col.accessorKey]).utcOffset(0).format('MM/DD/YYYY');
                      if (col.header == "Time")
                        return momenttz(row.original[col.accessorKey]).utcOffset(0).format('HH:mm:ss');
                      if (col.header == "File More Info") {
                        const moreInfo = row.original[col.accessorKey] != "" ? JSON.parse(row.original[col.accessorKey]) : "";

                       
                      }
                      else
                        return row.getValue(col.accessorKey)
                    });
                  });

                  doc.autoTable({
                    head: [columns.map((col) => col.header)],
                    body: tableData,
                    theme: 'striped',
                  });

                  doc.save(`userdownlaodhistory.pdf`)
                }}>
                  <PictureAsPdfIcon />
                </IconButton>
              </Tooltip>
            </Container>
          }}

          enableEditing={false}
          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history ? getUsersDownloadHistoryQueryResult.get_users_download_history.length : 250]),
          }}

          enableStickyHeader
          columns={columns}
          enableDensityToggle={false}
         
          state={{
            isLoading: getUsersDownloadHistoryQueryLoading,
          }}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getUsersDownloadHistoryQueryResult && getUsersDownloadHistoryQueryResult.get_users_download_history ? getUsersDownloadHistoryQueryResult.get_users_download_history : []}
        />

      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state.FileDownloadHistoryReducer, ...state.OtherReducer };
};

export default connect(mapStateToProps, {
  setFilesDownloadHistoryItems,
  setFilesDownloadHistoryArchiveDateFrom,
  setFilesDownloadHistoryArchiveDateTo,
  setFilesDownloadHistoryArchiveSearchText,
  setFilesDownloadHistoryReset
})(AdminUsersHistory);
