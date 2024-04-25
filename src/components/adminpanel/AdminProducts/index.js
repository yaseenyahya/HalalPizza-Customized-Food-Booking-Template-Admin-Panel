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
import AddEditProductsModal from "./AddEditProductsModal";
import {
  setAddEditProductsModalToggle,
  setAddEditProductsModalType,
  setAddEditProductsModalRowData,
} from "../../../store/actions/AddEditProductsModalActions";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: (state) => state.appBarHeight + 15
  }
}));

const AdminProducts = (props) => {
  const classes = useStyles({ appBarHeight: props.appBarHeight });
  const { enqueueSnackbar } = useSnackbar();

  const url = `${props.configData.backend_domain}${props.configData.backend_port !== '' ? ':' + props.configData.backend_port : ''}`;

  const {
    openContextDialog
  } = React.useContext(DialogContext);

  const { loading: deleteProductsLoading, error: deleteProductsError, data: deleteProductsResult, makeRequest: deleteProducts } = useSwaggerRequest('/api/products/delete');

  useEffect(() => {
    if (deleteProductsResult) {
      getProducts({
        method: 'GET',

      });
      enqueueSnackbar("Product deleted successfully.", { variant: "success" });

    }
  }, [deleteProductsResult]);

  useEffect(() => {
    if (deleteProductsError) {

      enqueueSnackbar(deleteProductsError.message, { variant: "error" });

    }
  }, [deleteProductsError]);

  const { loading: getProductsLoading, error: getProductsError, data: getProductsResult, makeRequest: getProducts } = useSwaggerRequest('/api/products/all/false/false');

  useEffect(() => {

    getProducts({
      method: 'GET',

    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'productTitle',
        header: 'Product Title',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80
      },
      {
        accessorKey: 'productImagePath',
        header: 'Product Image',
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
            <img src={`${url}/images/${row.original.productImagePath}`}
              alt="Product image"
              height={100}
              loading="lazy"

              style={{ borderRadius: '5%' }}
            />

          </Box>
        },
      },
      {
        accessorKey: 'productDetailsImagePath',
        header: 'Product Detail Image',
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
            <img src={`${url}/images/${row.original.productDetailsImagePath}`}
              alt="Product detail image"
              height={100}
              loading="lazy"

              style={{ borderRadius: '5%' }}
            />

          </Box>
        },
      },
      {
        accessorKey: 'productPrice',
        header: 'Product Price',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <><span style={row.original.productSalePrice && row.original.productSalePrice != "" ? { color: "red", textDecoration: "line-through", marginRight: 20 } : null}>{`$${row.original.productPrice}`}</span>{row.original.productSalePrice && row.original.productSalePrice != "" && <span style={{ color: "green" }}>{`$${row.original.productSalePrice}`}</span>}</>
        }
      },
      {
        accessorKey: 'productDetails',
        header: 'Product Details',
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
          return <span style={{ color: row.original.enabled == 1 ? "green" : "red" }}>{`${row.original.enabled == 1 ? "true" : "false"}`}</span>
        }
      }
      ,
      {
        accessorKey: 'productType',
        header: 'Product Type',
        enableColumnOrdering: true,
        enableEditing: true, // disable editing on this column
        enableSorting: true,
        size: 80,
        Cell: ({ renderedCellValue, row }) => {
          return <span style={{ color: row.original.productType == 1 ? "green" : "red" }}>{`${row.original.productType == 1 ? "Simple Item" : "Deal"}`}</span>
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
        exportFilename={"Products"}
        addDataText={"Add Products"}
        addDataAction={() => {
          props.setAddEditProductsModalType("Add");
          props.setAddEditProductsModalToggle(true);
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: _.sortBy([40, 80, 160, getProductsResult ? getProductsResult.length : 250]),
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {
                props.setAddEditProductsModalRowData(row.original);
                props.setAddEditProductsModalType("Edit");
                props.setAddEditProductsModalToggle(true);
              }} >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {
                openContextDialog("Yes", "No", `Are you sure you want to delete ${row.original.productImagePath}?`, "Confirm", () => {
                  try {
                    deleteProducts(
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
          isLoading: getProductsLoading,
        }}
        initialState={{
          density: 'comfortable',
          pagination: { pageSize: 40 },
          isLoading: true,
        }}
        data={getProductsResult ? getProductsResult : []}
      />
      {props.addEditProductsModalToggle && <AddEditProductsModal getProductsCallback={() => {
        getProducts({
          method: 'GET',

        });
      }} modalType={props.addEditProductsModalType} />}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { ...state.AuthUserReducer, ...state.OtherReducer, ...state.AddEditProductsModalReducer };
};

export default connect(mapStateToProps, {
  setAddEditProductsModalToggle,
  setAddEditProductsModalType,
  setAddEditProductsModalRowData,
})(AdminProducts);
