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
import AddEditAddonsModal from "./AddEditAddonsModal";
import {
  setAddEditAddonsModalToggle,
  setAddEditAddonsModalType,
  setAddEditAddonsModalRowData,
} from "../../../store/actions/AddEditAddonsModalActions";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  }
}));

const AdminAddons = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

  const {
    openContextDialog
  } = React.useContext(DialogContext);

  const { loading: deleteAddonsLoading, error: deleteAddonsError, data: deleteAddonsResult, makeRequest: deleteAddons } = useSwaggerRequest('/api/addons/delete');

  useEffect(() => {
    if (deleteAddonsResult) {
      getAddons({
        method: 'GET',

      });
      enqueueSnackbar("Addon deleted successfully.", { variant: "success" });

    }
  }, [deleteAddonsResult]);

  useEffect(() => {
    if (deleteAddonsError) {

      enqueueSnackbar(deleteAddonsError.message, { variant: "error" });

    }
  }, [deleteAddonsError]);

  const { loading: getAddonsLoading, error: getAddonsError, data: getAddonsResult, makeRequest: getAddons } = useSwaggerRequest('/api/addons/all');

  useEffect(() => {

    getAddons({
      method: 'GET',

    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'productTitle',
        header: 'Addon Title',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80
      },
      {
        accessorKey: 'productImagePath',
        header: 'Addon Image',
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
            {row.original.productImagePath ?
            <img  src={`${url}/images/${row.original.productImagePath}`}
              alt="addon image"
              height={100}
              loading="lazy"

              style={{ borderRadius: '5%' }}
            /> : "No Image"}

          </Box>
        },
      },
  
      {
        accessorKey: 'productSalePrice',
        header: 'Addon Price',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <><span style={row.original.productSalePrice && row.original.productSalePrice != "" ? { color: "red", textDecoration: "line-through", marginRight: 20 } : (parseFloat(row.original.productPrice) == 0  ? {"color":"green"}: null)}>{parseFloat(row.original.productPrice) == 0 ? "Free" : `$${row.original.productPrice}`}</span>{row.original.productSalePrice && row.original.productSalePrice != "" && <span style={{ color: "green" }}>{`$${row.original.productSalePrice }`}</span>}</>
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
        exportFilename={"Addons"}
        addDataText={"Add Addons"}
        addDataAction={() => {
          props.setAddEditAddonsModalType("Add");
          props.setAddEditAddonsModalToggle(true);
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: _.sortBy([40, 80, 160, getAddonsResult  ? getAddonsResult .length : 250]),
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
              props.setAddEditAddonsModalRowData(row.original);
              props.setAddEditAddonsModalType("Edit");
              props.setAddEditAddonsModalToggle(true);
              }} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {
                openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.productImagePath}?`, "Confirm", () => {
                  try {
                    deleteAddons(
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
          isLoading: getAddonsLoading,
        }}
        initialState={{
          density: 'comfortable',
          pagination: { pageSize: 40 },
          isLoading: true,
        }}
        data={getAddonsResult  ? getAddonsResult  : []}
      />
      {props.addEditAddonsModalToggle && <AddEditAddonsModal getAddonsCallback={()=>{
              getAddons({
                method: 'GET',
        
              });
      }} modalType={props.addEditAddonsModalType} />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.AddEditAddonsModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditAddonsModalToggle,
  setAddEditAddonsModalType,
  setAddEditAddonsModalRowData,
})(AdminAddons);
