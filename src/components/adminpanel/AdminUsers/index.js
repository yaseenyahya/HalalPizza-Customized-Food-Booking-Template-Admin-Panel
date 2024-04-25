import React, { Component, useEffect, useRef, useMemo } from "react";
import { IconButton, Tooltip, Container, Box, Avatar } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditUserModal from "./AddEditUserModal";
import {
  setAddEditUserModalToggle,
  setAddEditUserModalType,
  setAddEditUserModalRowData,

} from "../../../store/actions/AddEditUserModalActions";
import { getPanelTypeString } from "../../../auth/PanelType";
import { getStatusTypeString } from "../../../auth/StatusType";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  }
}));

const AddUsers = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext)


  const { loading: deleteUserLoading, error: deleteUserError, data: deleteUserResult, makeRequest: deleteUser } = useSwaggerRequest('/api/users/delete');

  useEffect(() => {
    if (deleteUserResult) {

      getUsers(
        {
          method: 'GET',

        }
      );
      enqueueSnackbar("User deleted successfully.", { variant: "success" });


    }
  }, [deleteUserResult]);

  useEffect(() => {
    if (deleteUserError) {

      enqueueSnackbar(deleteUserError.message, { variant: "error" });

    }
  }, [deleteUserError]);

  const { loading: getUsersLoading, error: getUsersError, data: getUsersResult, makeRequest: getUsers } = useSwaggerRequest('/api/users/all');
  useEffect(() => {

    getUsers(
      {
        method: 'GET',

      }
    );

  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {

          return <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Avatar
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        },
      },
      {
        accessorKey: 'username',
        header: 'Username',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'mobileNumber',
        header: 'Contact no',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span>{`${row.original.countryCode || ""}${renderedCellValue || ""}`}</span>
        }
      },
      {
        accessorKey: 'role',
        header: 'Role',
        enableColumnFilter:false,
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return getPanelTypeString(row.original.role)
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableColumnFilter:false,
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{ color: getStatusTypeString(row.original.status) == "Blocked" ? "red" : "green" }}>{`${getStatusTypeString(row.original.status)}`}</span>
        }
      },
      {

        accessorKey: 'blockComments',
        header: 'Block Comments',
        enableColumnOrdering: true,
        enableEditing: true, //disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{ color: row.original.status == "Block" ? "red" : "black" }}>{`${row.original.blockComments ? row.original.blockComments : ""}`}</span>
        }
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
          exportFilename={"users"}
          addDataText={"Add Users"}

          addDataAction={() => {

            props.setAddEditUserModalType("Add");
            props.setAddEditUserModalToggle(true);

          }}

          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getUsersResult ? getUsersResult.length : 250]),
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton disabled={row.original.id == props.authUserId} onClick={() => {
                  props.setAddEditUserModalRowData(row.original);
                  props.setAddEditUserModalType("Edit");
                  props.setAddEditUserModalToggle(true);
                }} >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton disabled={row.original.id == props.authUserId} color="error" onClick={() => {
                  openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.name}?`, "Confirm", () => {

                    deleteUser(
                      {
                        method: 'DELETE',
                        additionalUrl: `/${row.original.id}`
                      }
                    );


                  }, () => {

                  });
                }}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          enableStickyHeader
          columns={columns}
          enableDensityToggle={false}

          state={{
            isLoading: getUsersLoading,
          }}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getUsersResult ? getUsersResult : []}
        />
        {
          props.addEditUserModalToggle && <AddEditUserModal getUsersCallback={() => {
            getUsers(
              {
                method: 'GET',

              }
            );
          }} modalType={props.addEditUserModalType} />
        }
      </Container>

    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.AddEditUserModalReducer };
};
export default connect(mapStateToProps, {
  setAddEditUserModalToggle,
  setAddEditUserModalType,
  setAddEditUserModalRowData,
})(AddUsers);
