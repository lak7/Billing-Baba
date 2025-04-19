import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import "./style.scss";
import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import Parties from "./pages/parties";
import Items from "./pages/items";
import Landing from "./pages/landing";
import Profile from "./pages/profilePage";
import AddSales from "./pages/sales/addsales";
import AddPurchase from "./pages/purchase/addPurchase";
import AddItem from "./pages/addItem";
import EditItem from "./pages/editItem";
import AddParties from "./pages/addParties";
import SaleInvoice from "./pages/sales/SaleInvoice";
import EstimatedQuortation from "./pages/sales/estimatedQuortation";
import PaymentIn from "./pages/sales/paymentIn";
import SaleReturn from "./pages/sales/SaleReturn";
import SaleOrder from "./pages/sales/saleOrder";
import DelieveryChalan from "./pages/sales/DelieveryChalan";
import PurchaseOrder from "./pages/purchase/PurchaseOrder";
import PaymentOut from "./pages/purchase/PaymentOut";
import PurchaseBill from "./pages/purchase/PurchaseBill";
import PurchaseReturn from "./pages/purchase/PurchaseReturn";
import dev_url from "./url";
import AddEstimations from "./pages/sales/addEstimations";
import AddPaymentsin from "./pages/sales/addPaymentsin";
import AddSalesOrder from "./pages/sales/AddSalesOrder";
import AddPurchaseOrder from "./pages/purchase/AddPurchaseOrder";
import Expense from "./pages/Expense";
import CashAndBanks from "./pages/CashAndBanks";
import Checkplan from "./pages/checkplan";
import Utils from "./pages/utils";
import Backup from "./pages/backup";
import Syncnshare from "./pages/syncnshare";
import Rep from "./pages/report";
import AddExpense from "./pages/AddExpense";
import Loader from "./pages/Loader";
import AddInfo from "./pages/addInfo";
import Tabs from "./pages/tabs";
import OnlineStore from "./pages/OnlineStore";
import Setting from "./pages/Setting";
import ServerError from "./pages/serverError";
import BarcodeMaker from "./pages/barcodeMaker";
import VerifyData from "./pages/verifyData";
import ImportItems from "./pages/importItems";
import ImportParties from "./pages/importParties";
import ExportItems from "./pages/ExportItems";
import BulkUpdateItems from "./pages/UpdateItemsBulk";
import BillComponent from "./pages/Bill";
import AddDeliveryChallan from "./pages/sales/addChalan";
import SaleOrderBill from "./pages/SalesOrderBill";
import AddSalesReturn from "./pages/sales/addSaleReturn";
import SaleReturnBill from "./pages/sales/SaleReturnbill";
import PurchaseOrderBill from "./pages/purchase/PurchaseOrderBill";
import AddPaymentsOut from "./pages/purchase/addpaymentOut";
import AddPurchaseReturn from "./pages/purchase/addPurchaseReturn";
import PurchaseReturnBill from "./pages/purchase/PurchaseReturnBill";
import SalesBill from "./pages/sales/SalesBill";

function App() {
  // const Navigate = useNavigate();
  let [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);
  const storedItem = localStorage.getItem("item");
  // console.log("Retrieved from localStorage:", storedItem);
  const item2 = storedItem ? JSON.parse(storedItem) : null;
  // console.log("Parsed item:", item2);
  const [data, setData] = useState(localStorage.getItem("data"));
  const [item, setItem] = useState(item2);
  const [change, setChange] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [Error, setError] = useState(true);

  const [loading, setloading] = useState(true);
  useEffect(() => {
    // console.log(data);
    // console.log("data before fetch");
    fetchData();
  }, []);

  const uid = localStorage.getItem("uid");

  const updateData = () => {
    setloading2(true);
    alert("Updating Data");
    localStorage.setItem("data", data);
    if (uid) {
      try {
        let url = dev_url + "editData";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: uid, // Modify this if necessary
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            alert("Data is updated in backend");
            console.log("updated");
            setloading2(false);
            localStorage.setItem("edited", false);
          })
          .catch((error) => {
            setloading2(false);
            console.error("Error in updating:", error);
          });
      } catch (e) {
        alert("Unable to connect to server");
        setloading2(false);
        localStorage.setItem("edited", true);
        alert("unable to save to remote server");
      }
    } else {
      console.error("Error Logging in, please login again");
    }
  };
  useEffect(() => {
    alert("Data changed");
    updateData();
    console.log("Data is: ", data);
  }, [data, change]);

  const fetchData = () => {
    if (uid) {
      fetch(dev_url + "/get_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: uid, // Modify this if necessary
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("fetched");
          // console.log("Data fetch:", data);
          setData(data.data || []); // Ensure data is always an array
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          setError(true);
          console.error("Error:", error);
          setData({ serverError: true });
        });
    } else {
      console.error("Error Logging in, please login again");
    }
  };

  if (!uid) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        {loading2 && (
          <div className="loading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                opacity=".8"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0.05"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                opacity=".6"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".1"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                opacity=".4"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".15"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                opacity=".2"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".2"
                ></animate>
              </circle>
            </svg>
          </div>
        )}
      </div>
    );
  }

  if (loading || !data) {
    return <Loader />;
  }
  if (data.serverError) return <ServerError />;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            exact
            element={
              <Home part="profile" data={data} setData={setData}>
                <Profile
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-info"
            exact
            element={
              <AddInfo
                uid={uid}
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // <Home part="dashboard" data={data} setData={setData}>
              // </Home>
            }
          />
          <Route
            path="/"
            exact
            element={
              <Home part="dashboard" data={data} setData={setData}>
                <Dashboard
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/parties"
            exact
            element={
              <Home part="parties" data={data} setData={setData}>
                <Parties
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/AddParties"
            exact
            element={
              <Home part="parties" data={data} setData={setData}>
                <AddParties
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/items"
            exact
            element={
              <Home part="items" data={data} setData={setData}>
                <Items
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/barcodeMaker"
            exact
            element={
              <Home
                part="utils"
                subpart="generate-barcode"
                data={data}
                setData={setData}
              >
                <BarcodeMaker data={data} setData={setData} />
              </Home>
            }
          />
          <Route
            path="/import-items"
            exact
            element={
              <Home
                part="utils"
                subpart="import-items"
                data={data}
                setData={setData}
              >
                <ImportItems data={data} setData={setData} />
              </Home>
            }
          />
          <Route
            path="/import-parties"
            exact
            element={
              <Home
                part="utils"
                subpart="import-parties"
                data={data}
                setData={setData}
              >
                <ImportParties data={data} setData={setData} />
              </Home>
            }
          />
          <Route
            path="/bulk-update-items"
            exact
            element={
              <Home
                part="utils"
                subpart="bulk-update-items"
                data={data}
                setData={setData}
              >
                <BulkUpdateItems
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          {/* <Route
            path="/bulk-edit-items"
            exact
            element={
              <EditableGrid
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          /> */}
          <Route
            path="/bills"
            exact
            element={
              <BillComponent
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/export-items"
            exact
            element={
              <Home
                part="utils"
                subpart="export-items"
                data={data}
                setData={setData}
              >
                <ExportItems data={data} setData={setData} />
              </Home>
            }
          />
          <Route
            path="/check-data"
            exact
            element={
              <Home
                part="utils"
                subpart="export-items"
                data={data}
                setData={setData}
              >
                <VerifyData data={data} setData={setData} />
              </Home>
            }
          />
          <Route
            path="/add-items"
            exact
            element={
              <Home part="items" data={data} setData={setData}>
                <AddItem
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/edit-items"
            exact
            element={
              <Home part="items" data={data} setData={setData}>
                <EditItem
                  data={data}
                  item={item}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/addsales"
            exact
            element={
              // <Home part="items">
              //   <AddItems />
              // </Home>
              <AddSales
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/sales-bill"
            exact
            element={
              // <Home part="items">
              //   <AddItems />
              // </Home>
              <SalesBill
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/addPurchase"
            exact
            element={
              // <Home part="items">
              //   <AddItems />
              // </Home>
              <AddPurchase
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/sale-invoice"
            exact
            element={
              <Home
                part="sale"
                subpart="sale-invoice"
                data={data}
                setData={setData}
              >
                <SaleInvoice
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/estimation"
            exact
            element={
              <Home
                part="sale"
                subpart="estimation"
                data={data}
                setData={setData}
              >
                <EstimatedQuortation
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-estimation"
            exact
            element={
              <AddEstimations
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/payment-in"
            exact
            element={
              <Home
                part="sale"
                subpart="payment-in"
                data={data}
                setData={setData}
              >
                <PaymentIn
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-payment-in"
            exact
            element={
              <Home
                part="sale"
                subpart="add-payment-in"
                data={data}
                setData={setData}
              >
                <AddPaymentsin
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/sales-order"
            exact
            element={
              <Home
                part="sale"
                subpart="sales-order"
                data={data}
                setData={setData}
              >
                <SaleOrder
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-sales-order"
            exact
            element={
              // <Home part="sale" data={data} setData={setData}>
              <AddSalesOrder
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // </Home>
            }
          />
          <Route
            path="/sales-order-bill"
            exact
            element={
              // <Home part="sale" data={data} setData={setData}>
              <SaleOrderBill
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // </Home>
            }
          />
          <Route
            path="/delivery-chalan"
            exact
            element={
              <Home
                part="sale"
                subpart="delivery-chalan"
                data={data}
                setData={setData}
              >
                <DelieveryChalan
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-delivery-chalan"
            exact
            element={
              <AddDeliveryChallan
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/sales-return"
            exact
            element={
              <Home
                part="sale"
                subpart="sales-return"
                data={data}
                setData={setData}
              >
                <SaleReturn
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-sales-return"
            exact
            element={
              <AddSalesReturn
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/sales-return-bill"
            exact
            element={
              <SaleReturnBill
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/purchase-order"
            exact
            element={
              <Home
                part="purchase"
                subpart="purchase-order"
                data={data}
                setData={setData}
              >
                <PurchaseOrder
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-purchase-order"
            exact
            element={
              // <Home part="purchase" data={data} setData={setData}>
              <AddPurchaseOrder
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // </Home>l
            }
          />
          <Route
            path="/purchase-order-bill"
            exact
            element={
              // <Home part="purchase" data={data} setData={setData}>
              <PurchaseOrderBill
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // </Home>l
            }
          />
          <Route
            path="/payment-out"
            exact
            element={
              <Home
                part="purchase"
                subpart="payment-out"
                data={data}
                setData={setData}
              >
                <PaymentOut
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-payment-out"
            exact
            element={
              <Home
                part="purchase"
                subpart="payment-out"
                data={data}
                setData={setData}
              >
                <AddPaymentsOut
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/purchase-bill"
            exact
            element={
              <Home
                part="purchase"
                subpart="purchase-bill"
                data={data}
                setData={setData}
              >
                <PurchaseBill
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/purchase-return"
            exact
            element={
              <Home
                part="purchase"
                subpart="purchase-return"
                data={data}
                setData={setData}
              >
                <PurchaseReturn
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-purchase-return"
            exact
            element={
              <AddPurchaseReturn
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/purchase-return-bill"
            exact
            element={
              <PurchaseReturnBill
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/quick-billing"
            exact
            element={
              <Tabs
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
            }
          />
          <Route
            path="/expenses"
            exact
            element={
              <Home part="expense" data={data} setData={setData}>
                <Expense
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/add-expense"
            exact
            element={
              <AddExpense
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // <Home part="expense" data={data} setData={setData}>
              // </Home>
            }
          />
          <Route
            path="/cash-and-bank"
            exact
            element={
              <Home part="cash-and-bank" data={data} setData={setData}>
                <CashAndBanks
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/my-online-store"
            exact
            element={
              <Home part="e-way-bill" data={data} setData={setData}>
                <OnlineStore
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/report"
            exact
            element={
              <Home part="report" data={data} setData={setData}>
                <Rep
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />

          <Route
            path="/sync-n-share"
            exact
            element={
              <Home part="sync-n-share" data={data} setData={setData}>
                <Syncnshare
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/backup-n-restore"
            exact
            element={
              <Home part="backup-n-restore" data={data} setData={setData}>
                <Backup
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/utils"
            exact
            element={
              <Home part="utils" data={data} setData={setData}>
                <Utils
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
          <Route
            path="/settings"
            exact
            element={
              // <Home part="settings" data={data} setData={setData}>
              <Setting
                data={data}
                setData={setData}
                change={change}
                setChange={setChange}
              />
              // </Home>
            }
          />
          <Route
            path="/check-plan"
            exact
            element={
              <Home part="expense" data={data} setData={setData}>
                <Checkplan
                  data={data}
                  setData={setData}
                  change={change}
                  setChange={setChange}
                />
              </Home>
            }
          />
        </Routes>
      </BrowserRouter>
      {loading2 && (
        <div className="loading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              strokeWidth="15"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              strokeWidth="15"
              opacity=".8"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin="0.05"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              strokeWidth="15"
              opacity=".6"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".1"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              strokeWidth="15"
              opacity=".4"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".15"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              strokeWidth="15"
              opacity=".2"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".2"
              ></animate>
            </circle>
          </svg>
        </div>
      )}
    </div>
  );
}

export default App;
