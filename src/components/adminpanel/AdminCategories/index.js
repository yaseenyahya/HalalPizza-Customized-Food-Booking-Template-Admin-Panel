import React, { useEffect, useMemo } from "react";
import { IconButton, Tooltip, Container, Box, Avatar } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditCategoriesModal from "./AddEditCategoriesModal";
import {
  setAddEditCategoriesModalToggle,
  setAddEditCategoriesModalType,
  setAddEditCategoriesModalRowData,

} from "../../../store/actions/AddEditCategoriesModalActions";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  }
}));

const AdminCategories = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const {
    openContextDialog
  } = React.useContext(DialogContext)

  const { loading: deleteCategoryLoading, error: deleteCategoryError, data: deleteCategoryResult, makeRequest: deleteCategory } = useSwaggerRequest('/api/categories/delete');

  useEffect(() => {
    if (deleteCategoryError) {

      enqueueSnackbar(deleteCategoryError.message, { variant: "error" });

    }
  }, [deleteCategoryError]);

  useEffect(() => {
    if (deleteCategoryResult) {
      getCategories({
        method: 'GET',

      });
      enqueueSnackbar("Category deleted successfully.", { variant: "success" });

    }
  }, [deleteCategoryResult]);

  const { loading: getCategoriesLoading, error: getCategoriesError, data: getCategoriesResult, makeRequest: getCategories } = useSwaggerRequest('/api/categories/all');

  useEffect(() => {

    getCategories({
      method: 'GET',

    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
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
          exportFilename={"categories"}
          addDataText={"Add Categories"} // Update the text
          addDataAction={() => {
            props.setAddEditCategoriesModalType("Add"); // Update the action
            props.setAddEditCategoriesModalToggle(true); // Update the action
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: _.sortBy([40, 80, 160, getCategoriesResult ? getCategoriesResult.length : 250]),
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => {
                  props.setAddEditCategoriesModalRowData(row.original);
                  props.setAddEditCategoriesModalType("Edit");
                  props.setAddEditCategoriesModalToggle(true);
                }} >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => {
                  openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.name}?`, "Confirm", () => {
                    deleteCategory(
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
            isLoading: getCategoriesLoading,
          }}
          initialState={{
            density: 'comfortable',
            pagination: { pageSize: 40 },
            isLoading: true,
          }}
          data={getCategoriesResult ? getCategoriesResult : []}
        />
        {props.addEditCategoriesModalToggle && <AddEditCategoriesModal getDesignationsCallback={()=>{
           getCategories({
            method: 'GET',
      
          });
        }} modalType={props.addEditCategoriesModalType} />}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.AddEditCategoriesModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditCategoriesModalToggle,
  setAddEditCategoriesModalType,
  setAddEditCategoriesModalRowData,
})(AdminCategories);
