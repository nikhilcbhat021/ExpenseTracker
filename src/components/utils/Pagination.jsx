import { useEffect } from "react";
import { useState } from "react";

import pageStyles from './Pagination.module.css';
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import Button from "./Button";

const Pagination = ({transactions, itemsPerPage=4}) => {

    const totalItems = transactions.length;
    const totalNumPages = Math.ceil(totalItems/itemsPerPage);
    const comp = 'Button';
    const [pageItems, setPageItems] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    // -- //
    const [_totalItems, _setTotalItems] = useState(totalItems);
    const [_totalNumPages, _setTotalNumPages] = useState(Math.ceil(_totalItems/itemsPerPage))
    
    useEffect(() =>{
        console.log("Pagination mounted")
    },[])


    useEffect(() =>{
        console.log("Pagination re-rendered");
        console.log(transactions.length);
        _setTotalItems(transactions.length);
        _setTotalNumPages(Math.ceil(transactions.length/itemsPerPage));
    })

    useEffect(() => {
        const startIdx = (currPage-1)*itemsPerPage;
        const endIdx = (currPage-1)*itemsPerPage + itemsPerPage;

        setPageItems(transactions.slice(startIdx , endIdx));

        // to decrement the page, when the last item of the page is removed.
        if (startIdx >= totalItems && totalItems!==0)
            setCurrPage(c => c-1);

    }, [transactions, currPage, itemsPerPage, _totalItems, _totalNumPages])

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalNumPages)
            setCurrPage(page);
    }
    
  return (
    <div className={`${pageStyles.container}`}>
        {
            transactions.length !== 0 ? (<>
            <div className={pageStyles.txnList}>
                {
                    // console.log(pageItems);
                    pageItems.map((t,i) => {
                        // return <div key={i}>
                            return t;
                        // </div>
                    })
                }
            </div>
            <div className={pageStyles.paginationBtnContainer}>
                <button 
                    onClick={() => handlePageClick(currPage-1)}
                    className={`${pageStyles.pageNum} ${currPage<=1 && pageStyles.disableBtn}`}
                >{<LiaLongArrowAltLeftSolid/>}</button>
                <span className={`${pageStyles.pageNum}`}>{currPage}</span>

                {/* {
                    // The below method can be used to display all the buttons in the pagination...
                    // 
                    [...Array(totalNumPages)].map((_,i) => {
                        return <button onClick={() => handlePageClick(i+1)} className={`${pageStyles.pageNum}`} key={i}>
                            {i+1}
                        </button>
                    })
                } */}
                
                <button 
                    onClick={() => handlePageClick(currPage+1)}
                    className={`${pageStyles.pageNum} ${currPage===totalNumPages && pageStyles.disableBtn}`}
                >{<LiaLongArrowAltRightSolid/>}</button>
            </div> 
        </>) : (
            <div className={pageStyles.txnList}> You have no recent transactions... </div>
        )}
    </div>
  )
}

const PaginationBtnRender = ({
    totalNumPages, currPage, numPageBtnsConst, onPageClickHandler
}) => {
    return (
        <div>Return Page btns dynamically from here... Usefull if there are several pages</div>
    )
}

export default Pagination