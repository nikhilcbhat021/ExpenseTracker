import expStyles from "./ExpenseTracker.module.css";
import Card from "../utils/Card";
import PieChart from "../Visuals/PieChart";
import Button from "../utils/Button";
import Transaction from "../TxnComp/Transaction";
// import { __delete__, __editTxn__, categoryIcons } from "../../App";

import { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { categoryIcons, expenseFormKeys, balanceFormKeys, storage__walletBalance, storage__totalExpenses, storage_allTransactions } from "../../App";
import { useSnackbar } from 'notistack';

const ExpenseTracker = ({pieData, onTxnAdded, walletBalance, setWalletBalance, totalExpenses, setTotalExpenses, setCategoryTxnsData, setTimeTxnsData}) => {
    // const [walletBalance, setWalletBalance] = useState(
    //     Number(localStorage.getItem("walletBalance"))
    // );
    // const [totalExpenses, setTotalExpenses] = useState(
    //     Number(localStorage.getItem("totalExpenses"))
    // );

    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        console.error(pieData)
    }, [])

    const onSubmitHandler = (e, formKeys, localStorageKey) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data_obj = formKeys.reduce((prev, key, i) => {
            return {...prev, [key]: formData.get(key)}
        }, {})
        
        if (localStorageKey === "transaction") {
            data_obj["Price"] = Number(data_obj["Price"]); //// Just a failsafe...
            if (data_obj["Price"] <= 0) {
                enqueueSnackbar('Price has to be greater than 0.', {variant:'error'})
                return;
            }
            if (data_obj["Price"] > walletBalance) {
                enqueueSnackbar("Can't spend more than walletbalance", {variant: 'error'});
                return;
            }
            console.debug(data_obj["Date"]);
            data_obj["Date"] = new Date(data_obj["Date"]);
            data_obj["id"] = crypto.randomUUID();

            console.log(data_obj);

            setTotalExpenses((exp) => (exp + Number(data_obj["Price"])));
            setWalletBalance((bal) => (bal - Number(data_obj["Price"])));

            // setCategoryTxnsData((data) => ({
            //     ...data, 
            //     [data_obj["Category"]]: Number(data[data_obj["Category"]] + Number(data_obj["Price"]))
            // }))

            // setTimeTxnsData((data) => ({
            //     ...data,
            //     [data_obj["Date"]]: Number(data[data_obj["Date"]] + Number(data_obj["Price"]))
            // }))

            setCategoryTxnsData((data) => {
                console.log(data);
                console.log(data_obj["Category"])
                console.log()
                console.log(Object.keys(data).includes(data_obj["Category"]))

                if (Object.keys(data).includes(data_obj["Category"])) {
                    return {...data,
                        [data_obj["Category"]]: Number(data[data_obj["Category"]] + Number(data_obj["Price"]))
                    }
                } else {
                    return {...data,
                        [data_obj["Category"]]: Number(data_obj["Price"])
                    }
                }
            })
            
            setTimeTxnsData((data) => {
                const key = data_obj["Date"].toLocaleDateString();
                if (Object.keys(data).includes(key)) {
                    console.log(key)
                    console.log(data[key])
                    console.log(data)
                    return {...data,
                        [key]: Number(Number(data[key]) + Number(data_obj["Price"]))
                    }
                } else {
                    return {...data,
                        [key]: Number(data_obj["Price"])
                    }
                }
            })

            onTxnAdded((trxns) => ([data_obj, ...trxns]));


            /**
             * 
             */
        } else if (localStorageKey === "walletBalance") {
            console.log(data_obj)
            if (data_obj['Amount'] > 0) {
                setWalletBalance((bal) => (bal + Number(data_obj[formKeys[0]])));
                console.log(walletBalance);
            } else {
                enqueueSnackbar('Price has to be greater than 1.', {variant:'error'});
            }
        }
        setIsExpenseModalVisible(false);
        setIsWalletModalVisible(false);
        return;
    }

    return (
        <>
            <p className={`${expStyles.title}`}>ExpenseTracker</p>
            <div className={`${expStyles.container}`}>
                <div className={`${expStyles.cardContainer}`}>
                    <Card
                        title="Wallet Balance "
                        number={walletBalance}
                        numberColor="#9DFF5B"
                        btnTitle="+ Add Income"
                        btnClickHandler={() => {
                            // show modal
                            // get the new balance, update if after proper validations.
                            // setWalletBalance(3000);
                            setIsWalletModalVisible(true);
                            console.log(
                                "card btn clicked. From ExpenseTracker"
                            );
                        }}
                    ></Card>
                </div>
                <div className={`${expStyles.cardContainer}`}>
                    <Card
                        title="Expenses "
                        number={totalExpenses}
                        numberColor="#F4BB4A"
                        btnTitle="+ Add Expense"
                        btnClickHandler={() => {
                            // show modal
                            // get the new txn here and subtract its expense from the existing balance.
                            // do proper checks..
                            // setTotalExpenses(2000);
                            setIsExpenseModalVisible(true);
                            console.log(
                                "card btn clicked. From ExpenseTracker"
                            );
                        }}
                    ></Card>
                </div>

                <div className={`${expStyles.pieContainer}`}>
                    <PieChart
                        data={[
                            { name: "Others", value: pieData.Others },
                            { name: "Restaurant", value: pieData.Restaurant },
                            { name: "Groceries", value: pieData.Groceries },
                            { name: "Coffee", value: pieData.Coffee },
                            { name: "Gym", value: pieData.Gym },
                            { name: "Pet", value: pieData.Pet },
                            { name: "Game", value: pieData.Game },
                            { name: "Emergency", value: pieData.Emergency },
                        ].filter((item) => item.value)
                    }
                    >
                    </PieChart>
                </div>

                <ReactModal
                    isOpen={isExpenseModalVisible}
                    onRequestClose={() => {
                        setIsExpenseModalVisible(false);
                    }}
                    shouldCloseOnOverlayClick={false}
                    overlayClassName={`${expStyles.modal__overlay}`}
                    className={`${expStyles.modal__content}`}
                >
                    <p className={`${expStyles.modal__title}`}>Add Expenses</p>
                    <form action="" onSubmit={(e) => onSubmitHandler(e, expenseFormKeys, "transaction")} onClose={() => {console.log("form closed")}}>
                        <div className={`${expStyles.modal__grid__expense}`}>
                            {
                                expenseFormKeys.map((key) => {
                                    if (key === 'Category') {
                                        return <select name={key} placeholder={key} id={key} required
                                                style={{padding: '5px'}}
                                            >
                                            {
                                                Object.keys(categoryIcons).map((categoryKey) => {
                                                    console.log(categoryKey);
                                                    return (
                                                        <option key={categoryKey} value={categoryKey}>{categoryKey}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    }
                                    return (
                                        <input
                                            key={key}
                                            type={key==='Date' ? "date" : (key==='Price' ? "number" : "text")}
                                            placeholder={key}
                                            id={key}
                                            name={key}
                                            required
                                        />  
                                    )
                                })
                            }

                            <Button
                                title="Add Expense"
                                onClick={(e) => {
                                    console.log("Can do validations here...");
                                    return;
                                }}
                                btnClass="submitBtn"
                            ></Button>

                            <Button
                                title="Cancel"
                                onClick={(e) => {
                                    setIsExpenseModalVisible(false);
                                }}
                                btnClass="cancelBtn"
                                classes={`${expStyles.modal__cancel__expense}`}
                            ></Button>
                        </div>
                    </form>
                </ReactModal>

                <ReactModal
                    isOpen={isWalletModalVisible}
                    onRequestClose={() => {
                        setIsWalletModalVisible(false);
                    }}
                    shouldCloseOnOverlayClick={false}
                    overlayClassName={`${expStyles.modal__overlay}`}
                    className={`${expStyles.modal__content}`}
                >
                    <p className={`${expStyles.modal__title}`}>Add Balance</p>
                    <form action="" onSubmit={(e) => onSubmitHandler(e, balanceFormKeys, "walletBalance")}>
                        <div className={`${expStyles.modal__grid__balance}`}>
                            {
                                balanceFormKeys.map((key) => {
                                    return (
                                        <input
                                            key={key}
                                            type='number'
                                            placeholder={key}
                                            id={key}
                                            name={key}
                                            required
                                        />  
                                    )
                                })
                            }
                            <Button
                                title="Add Balance"
                                onClick={(e) => {
                                    console.log("Can do validations here...");
                                    console.log(e.target.id);
                                    // return;
                                }}
                                btnClass="submitBtn"
                            ></Button>
                            <Button
                                title="Cancel"
                                onClick={() => {
                                    setIsWalletModalVisible(false);
                                }}
                                btnClass="cancelBtn"
                            ></Button>
                        </div>
                    </form>
                </ReactModal>
            </div>
        </>
    );
};

export default ExpenseTracker;
