import React from "react";
import ReactModal from "react-modal";

const ModalWrapper = ({ isOpen, setIsOpen, children }) => {
    const customStyles = {
        content: {
            width: "95%",
            maxWidth: "572px",
            height: "fit-content",
            maxHeight: "90vh",

            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",

            background: "#EFEFEFD9",
            border: "0",
            borderRadius: "15px",
            padding: "2rem",
        },
    };

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                onAfterOpen={() => {
                    enqueueSnackbar(
                        "Available balance is " +
                            Number(walletBalance + Number(txn["Price"])),
                        { variant: "info" }
                    );
                }}
                style={customStyles}
            >
                {children}
            </ReactModal>
        </>
    );
};

export default ModalWrapper;
