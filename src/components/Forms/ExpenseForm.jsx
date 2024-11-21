import React from "react";
import expenseStyles from "./ExpenseForm.module.css";
import { expenseFormKeysObj, categoryIcons } from "../../App";
/**
 *
 * txn = {
 *  "Title": "lorem",
 *  "Price": "lorem",
 *  "Category": "lorem",
 *  "Date": "lorem",
 * }
 *
 */
const ExpenseForm = ({ setIsModalOpen, setExpenseList, txn,
    balance, setBalance
}) => {

    const [formData, setFormData] = () => {
        if (txn) {
            return txn;
        } else {
            return Object.keys(expenseFormKeysObj).reduce((key, prevVal) => {
                return { ...prevVal, [key]: "" };
            }, {});
        }
    };

    const txnPrice = Number(formData['Price']) || 0;

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (txn) {
            setExpenseList((e) => {
                return e.map(exp => {
                    if (e.id === txn.id) {
                        return {id:crypto.randomUUID(), ...formData};
                    } else {
                        return exp;
                    }
                })
            })
        } else {
            setExpenseList((e) => ([...e, {id:crypto.randomUUID() , ...formData}]))
        }

        setIsModalOpen(false);
    };

    const title = txn ? "Edit Expense" : "Add Expense";

    const handleOnChange = (e) => {
        if (e.target.key === 'Price') {
            if (Number(e.target.value) > balance + txnPrice ) {

            } else {
                setBalance((b) => (b - Number(e.target.value) + txnPrice))
            }
        }
        setFormData((form) => ({
            ...form,
            [e.target.key]: [e.target.value],
        }));
    };

    

    return (
        <div className={expenseStyles.formWrapper}>
            <h3>{title}</h3>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                {Object.keys(expenseFormKeysObj).map((key, idx) => {
                    if (key === "Category") {
                        <select
                            name={key}
                            placeholder={key}
                            id={key}
                            required
                            style={{ padding: "5px" }}
                        >
                            <option key="_" value="" disabled>
                                Select Category
                            </option>
                            {Object.keys(categoryIcons).map((categoryKey) => {
                                return (
                                    <option
                                        key={categoryKey}
                                        value={categoryKey}
                                    >
                                        {categoryKey}
                                    </option>
                                );
                            })}
                        </select>;
                    } else {
                        <input
                            type={expenseFormKeysObj[key]}
                            name={key}
                            key={key}
                            placeholder={key}
                            id={key}
                            required
                            value={formData[key]}
                            onChange={(e) => handleOnChange(e)}
                        />;
                    }
                })}
            </form>
            <Button
                title={title}
                type="submit"
                onClick={(e) => {
                    console.log("Can do validations here...");
                    return;
                }}
                btnClass="submitBtn"
            ></Button>

            <Button
                title="Cancel"
                onClick={(e) => {
                    setIsModalOpen(false);
                }}
                btnClass="cancelBtn"
                classes={`${expStyles.modal__cancel__expense}`}
            ></Button>
        </div>
    );
};

export default ExpenseForm;
