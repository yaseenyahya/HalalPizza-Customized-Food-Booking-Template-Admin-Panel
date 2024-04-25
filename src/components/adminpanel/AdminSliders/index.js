import React, { useEffect, useMemo } from "react";
import { IconButton, Tooltip, Container, Box } from "@mui/material/";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CustomTable from "../../otherComponents/CustomTable";
import { useSnackbar } from "notistack";
import _ from "lodash";
import useSwaggerRequest from "../../../hooks/useSwaggerHook";
import { DialogContext } from "../../context/DialogContext";
import { Delete, Edit } from '@mui/icons-material';
import AddEditSlidersModal from "./AddEditSlidersModal";
import {
  setAddEditSlidersModalToggle,
  setAddEditSlidersModalType,
  setAddEditSlidersModalRowData,
} from "../../../store/actions/AddEditSlidersModalActions";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  }
}));

const AdminSliders = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

  const {
    openContextDialog
  } = React.useContext(DialogContext);

  const { loading: deleteSlidersSettingsLoading, error: deleteSlidersSettingsError, data: deleteSlidersSettingsResult, makeRequest: deleteSlidersSettings } = useSwaggerRequest('/api/sliders/delete');

  useEffect(() => {
    if (deleteSlidersSettingsResult) {
      getSlidersSettings({
        method: 'GET',

      });
      enqueueSnackbar("Slide deleted successfully.", { variant: "success" });

    }
  }, [deleteSlidersSettingsResult]);

  useEffect(() => {
    if (deleteSlidersSettingsError) {

      enqueueSnackbar(deleteSlidersSettingsError.message, { variant: "error" });

    }
  }, [deleteSlidersSettingsError]);

  const { loading: getSlidersSettingsLoading, error: getSlidersSettingsError, data: getSlidersSettingsResult, makeRequest: getSlidersSettings } = useSwaggerRequest('/api/sliders/all/false');

  useEffect(() => {

    getSlidersSettings({
      method: 'GET',

    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'path',
        header: 'Slide',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
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
            <img  src={`${url}/images/${row.original.path}`}
              alt="slider image"
              height={100}
              loading="lazy"

              style={{ borderRadius: '5%' }}
            />

          </Box>
        },
      },
      {
        accessorKey: 'link',
        header: 'Link',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'enabled',
        header: 'Enabled',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{ color: row.original.enabled == 1 ? "green" : "red" }}>{`${row.original.enabled == 1 ? "true" :"false"}`}</span>
        }
      }
    ]
  );

  return (
    <Container
      className={classes.mainContainer}
      maxWidth={false}
      disableGutters={true}
    >
      <CustomTable
        exportFilename={"Sliders"}
        addDataText={"Add Sliders"}
        addDataAction={() => {
          props.setAddEditSlidersModalType("Add");
          props.setAddEditSlidersModalToggle(true);
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: _.sortBy([40, 80, 160, getSlidersSettingsResult ? getSlidersSettingsResult.length : 250]),
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
                props.setAddEditSlidersModalRowData(row.original);
                props.setAddEditSlidersModalType("Edit");
                props.setAddEditSlidersModalToggle(true);
              }} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {
                openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.path}?`, "Confirm", () => {
                  try {
                    deleteSlidersSettings(
                      {
                        method: 'DELETE',
                        additionalUrl: `/${row.original.id}`
                      }
                    );

                  } catch (e) {

                  }
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
          isLoading: getSlidersSettingsLoading,
        }}
        initialState={{
          density: 'comfortable',
          pagination: { pageSize: 40 },
          isLoading: true,
        }}
        data={getSlidersSettingsResult ? getSlidersSettingsResult : []}
      />
      {props.addEditSlidersModalToggle && <AddEditSlidersModal getSlidersSettingsCallback={()=>{
              getSlidersSettings({
                method: 'GET',
        
              });
      }} modalType={props.addEditSlidersModalType} />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.AddEditSlidersModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditSlidersModalToggle,
  setAddEditSlidersModalType,
  setAddEditSlidersModalRowData,
})(AdminSliders);
