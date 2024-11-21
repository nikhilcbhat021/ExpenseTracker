import { useState, useEffect, useCallback } from "react";

import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { MdPets } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdOutlineLocalHospital } from "react-icons/md";

import { IconContext } from "react-icons";
import ReactModal from "react-modal";
import { v1, v3, v4, v5, v6, v7, stringify } from "uuid";
import { enqueueSnackbar } from "notistack";
// import {  } from 'uuid';
//styles
import "./App.css";

//components
import Transaction from "./components/TxnComp/Transaction";
import Card from "./components/utils/Card";
import Pagination from "./components/utils/Pagination";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import TxnList from "./components/TxnList/TxnList";
import TrendingTxns from "./components/Visuals/TrendingTxns";
import PieChart from "./components/Visuals/PieChart";
import EditTransactionModal from "./components/Modals/EditTransactionModal";
import { useRef } from "react";
import BarChart from "./components/BarChart/BarChart";

export const categoryIcons = {
    Others: <MdOutlineCategory />,
    Restaurant: <IoRestaurantOutline />,
    Groceries: <MdOutlineLocalGroceryStore />,
    Coffee: <PiCoffeeDuotone />,
    Gym: <CgGym />,
    Pet: <MdPets />,
    Game: <IoLogoGameControllerB />,
    Emergency: <MdOutlineLocalHospital />,
};
export const expenseFormKeys = ["Title", "Price", "Category", "Date"];
export const expenseFormKeysObj = {
    Title: "text",
    Price: "number",
    Category: "text",
    Date: "date",
};
export const balanceFormKeys = ["Amount"];
export const storage__walletBalance = "walletBalance";
export const storage__totalExpenses = "totalExpenses";
export const storage_allTransactions = "allTransactions";

function usePurelyOnReRender(func, deps) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current === true) {
            console.log("calling update storage");
            func();
        } else {
            console.log("First mount... not rerender");
            didMountRef.current = true;
        }
    }, deps);
}

const calculateCategoryStats = (expenseList) => {
    let accumulatorObj = Object.keys(categoryIcons).reduce((prev, currKey) => {
        return { ...prev, [currKey]: Number(0) };
    }, {});

    console.error(accumulatorObj);
    console.error(expenseList);
    const data = expenseList.reduce(
        (acc, item) => {
            acc.spends[item.Category] =
                (acc.spends[item.Category] || 0) + Number(item.Price);
            acc.counts[item.Category] = (acc.counts[item.Category] || 0) + 1;

            console.error(acc);
            console.error(item.Category);
            return acc;
        },
        {
            spends: { ...accumulatorObj },
            counts: { ...accumulatorObj },
        }
    );

    console.error(data);
    return data;
};

const transactionObjectJSONparser = (key, value) => {
    console.log(key, value);
    if (key === "Date") {
        return new Date(value);
    }
    return value;
};

function App() {
    const [transactions, setTransactions] = useState(() => {
        const _allTxns = localStorage.getItem(storage_allTransactions) || "[]";

        const parsed = JSON.parse(_allTxns).map((txn) => {
            return JSON.parse(txn, transactionObjectJSONparser);
        });
        console.error(parsed);
        return parsed;
    });

    const [categoryTxnsData, setCategoryTxnsData] = useState({});
    const [timeTxnsData, setTimeTxnsData] = useState({});

    const [txnToBeEdited, setTxnToBeEdited] = useState(null);
    const [_isEditTxnModalOpen, _setEditTxnIsModalOpen] = useState(false);

    const [walletBalance, setWalletBalance] = useState(() => {
        const prevBal = Number(localStorage.getItem(storage__walletBalance)) || 5000;
        return prevBal;
    });

    const [totalExpenses, setTotalExpenses] = useState(() => {
        const prevExp = Number(localStorage.getItem(storage__totalExpenses)) || 0;
        return prevExp;
    });

    const [summaryData, setSummaryData] = useState(() => {
        const accumulator = Object.keys(categoryIcons).reduce((prev, currKey) => {
            return { ...prev, [currKey]: Number(0) };
        }, {})

        return {
            spends: {...accumulator},
            counts: {...accumulator},
        }
    });


    useEffect(() => {
        //    console.error(categorySpends, categoryCounts);
        setSummaryData(calculateCategoryStats(transactions));
        // console.error(summaryData);
        console.error(transactions);
    }, [transactions]);

    useEffect(() => {
        console.error(summaryData);
    },[summaryData])

    const __delete__ = useCallback((id) => {
        console.log(id);

        const index = transactions.findIndex((val) => {
            return val.id === id;
        });

        setTransactions((txns) => {
            // const index = txns.findIndex((val)=>{
            //     console.debug(val, id)
            //     return val.id === id;
            // })
            console.log(index);
            // here txns[index] is the txn that was deleted.
            // get the category of this txn and the date of this txn.
            // in categoryTxnsData from the key-category, subtract the Price.
            // in timeTxnsData, from the key-date, subtract the Price.
            const updatedTxnList = [
                ...txns.slice(0, index),
                ...txns.slice(index + 1, txns.length),
            ];
            return updatedTxnList;
        });

        setCategoryTxnsData((data) => {
            if (Object.keys(data).includes(transactions[index]["Category"])) {
                return {
                    ...data,
                    [transactions[index]["Category"]]: Number(
                        data[transactions[index]["Category"]] -
                            Number(transactions[index]["Price"])
                    ),
                };
            } else {
                return { ...data };
            }
        });

        setTimeTxnsData((data) => {
            const key = transactions[index]["Date"].toLocaleDateString();

            if (Object.keys(data).includes(key)) {
                return {
                    ...data,
                    [key]: Number(
                        data[key] - Number(transactions[index]["Price"])
                    ),
                };
            } else {
                return { ...data };
            }
        });

        setWalletBalance((bal) => bal + transactions[index]["Price"]);
        setTotalExpenses((exp) => exp - transactions[index]["Price"]);
    });

    const __editTxn__ = useCallback((txn) => {
        console.log("Inside Edit Transaction callback");
        console.log(txn);

        // Opening the modal here.
        _setEditTxnIsModalOpen(true);
        setTxnToBeEdited(txn);
    });

    // update storage, whenever the state changes...
    usePurelyOnReRender(() => {
        const jsonified = JSON.stringify(
            transactions.map((txn) => JSON.stringify(txn))
        );
        console.error(jsonified);
        localStorage.setItem(storage_allTransactions, jsonified);
        console.error(categoryTxnsData);
        console.error(timeTxnsData);
    }, [transactions]);

    usePurelyOnReRender(() => {
        localStorage.setItem(storage__walletBalance, walletBalance);
        if (walletBalance === 0)
            enqueueSnackbar(
                "There is no available balance in your wallet. Please add money.",
                { variant: "warning" }
            );
    }, [walletBalance]);

    usePurelyOnReRender(() => {
        localStorage.setItem(storage__totalExpenses, totalExpenses);
    }, [totalExpenses]);

    useEffect(() => {
        ReactModal.setAppElement("#root");
        // const _allTxns = localStorage.getItem(storage_allTransactions) || "[]";

        // console.log(JSON.parse(_allTxns));
        // setTransactions((p) => {
        //     const parsed = JSON.parse(_allTxns).map((txn) => {
        //         return JSON.parse(txn, transactionObjectJSONparser);
        //     });
        //     console.error(parsed);
        //     return parsed;
        // });
    }, []);

    return (
        <>
            <div className="landingPage">
                <div className="expenseTracker">
                    <ExpenseTracker
                        pieData={summaryData.spends}
                        onTxnAdded={setTransactions}
                        setCategoryTxnsData={setCategoryTxnsData}
                        setTimeTxnsData={setTimeTxnsData}
                        walletBalance={walletBalance}
                        setWalletBalance={setWalletBalance}
                        totalExpenses={totalExpenses}
                        setTotalExpenses={setTotalExpenses}
                    />
                </div>
                <div className="txnList">
                    <TxnList
                        transactions={transactions}
                        onDeleteHandler={(id) => __delete__(id)}
                        onEditHandler={(txn) => __editTxn__(txn)}
                    />
                </div>
                <div className="trending">
                    <BarChart
                        data={[
                            { name: "Others", value: summaryData.counts.Others },
                            { name: "Restaurant", value: summaryData.counts.Restaurant },
                            { name: "Groceries", value: summaryData.counts.Groceries },
                            { name: "Coffee", value: summaryData.counts.Coffee },
                            { name: "Gym", value: summaryData.counts.Gym },
                            { name: "Pet", value: summaryData.counts.Pet },
                            { name: "Game", value: summaryData.counts.Game },
                            { name: "Emergency", value: summaryData.counts.Emergency },
                        ].filter((item) => item.value)}
                    />
                </div>
                <EditTransactionModal
                    txn={txnToBeEdited}
                    _isModalOpen={_isEditTxnModalOpen}
                    _setIsModalOpen={_setEditTxnIsModalOpen}
                    setTransactions={setTransactions}
                    setTotalExpenses={setTotalExpenses}
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                    setCategoryTxnsData={setCategoryTxnsData}
                    setTimeTxnsData={setTimeTxnsData}
                />
            </div>
        </>
    );
}

export default App;
