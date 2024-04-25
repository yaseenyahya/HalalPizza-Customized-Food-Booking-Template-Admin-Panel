/* eslint-disable */ 
import {  ThemeProvider  } from '@mui/material';
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import NotFound from "./components/404";
import ProtectedRoute from "./router/ProtectedRoute";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { DialogProvider } from "./components/context/DialogContext";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#ed2f21', // Orange color
    },
    // Customize other palette colors if needed
  },
});

function App(props) {
  const env = process.env.NODE_ENV;
const basename = env === 'development' ? undefined : '/admin';
  return (
    <AnimatePresence exitBeforeEnter>
      <DialogProvider>
        <BrowserRouter basename={basename}>
          <Provider store={props.reduxStore}>
            <ThemeProvider theme={customTheme}>              
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route  path={"/"} element={<ProtectedRoute />} />
                  <Route  path={"/admin"} element={<ProtectedRoute />} />
                  <Route  path={"/userpanel"} element={<ProtectedRoute />} />
                  <Route  path={"/adminpanel"} element={<ProtectedRoute />} />
                  <Route  path={"/adminusers"} element={<ProtectedRoute />} />
                  <Route  path={"/admincategories"} element={<ProtectedRoute />} />
                  <Route  path={"/adminsliders"} element={<ProtectedRoute />} />          
                  <Route  path={"/adminaddons"} element={<ProtectedRoute />} />          
                  <Route  path={"/adminproducts"} element={<ProtectedRoute />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>      
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      </DialogProvider>
    </AnimatePresence>
  );
}

export default App;
