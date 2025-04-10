import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UploadFiles from "../pages/UploadFiles";
import History from "../pages/History";
import Buy from "../pages/Buy";
import Login from "../pages/Login/Login";
import LoginUser from "../pages/Login/LoginUser";
import LoginAdmin from "../pages/Login/LoginAdmin";
import Dashboard from "../pages/Dashboard";
import Preview from "../pages/Preview";
import Success from "../pages/Success";
import { ProtectedRoute } from "./../pages/ProtectedRoutes";
import BuySuccess from "../pages/BuySuccess";
import ManagePrinter from "../pages/ManagePrinter/ManagePrinter";
import AddPrinter from "../pages/ManagePrinter/AddPrinter";
import Logs from "../pages/Logs";

import Printer from "../pages/PrinterInfo";
import PrinterLogs from "../pages/PrinterLogs";
import AdminDashboard from "../pages/AdminDashboard";
import SystemConfiguration from "../pages/SystemConfiguration";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/print",
        element: <UploadFiles />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admindashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/Preview",
        element: <Preview />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/buysuccess",
        element: <BuySuccess />,
      },
      {
        path: "/manageprinter",
        element: <ManagePrinter />,
      },
      {
        path: "/addprinter",
        element: <AddPrinter />,
      },
      {
        path: "/logs",
        element: <Logs />,
      },
      {
        path: "/printerinfo/:id",
        element: <Printer />,
      },
      {
        path: "/printerlogs",
        element: <PrinterLogs/>
      },
      {
        path: "/systemconfig",
        element: <SystemConfiguration />
      },
      {
        path: "/report-month",
        element: <Logs />
      }
    ],
  },
  {
    path: "/signup",
    element: <Login />, 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login-user",
    element: <LoginUser />,
  },
  {
    path: "/login-admin",
    element: <LoginAdmin />,
  },
]);

export default router;
