import { useEffect } from "react";
import { useState } from "react";

import pageStyles from './Pagination.module.css';

const Pagination = ({transactions}) => {

    const itemsPerPage = 4;
    const totalItems = transactions.length;
    const totalNumPages = Math.ceil(totalItems/itemsPerPage);

    const [pageItems, setPageItems] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        const startIdx = (currPage-1)*itemsPerPage;
        const endIdx = (currPage-1)*itemsPerPage + itemsPerPage;

        setPageItems(transactions.slice(startIdx , endIdx));

        console.log(currPage, startIdx, endIdx);
        console.log(totalItems, itemsPerPage, totalNumPages);

    }, [transactions, currPage, itemsPerPage])

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalNumPages)
            setCurrPage(page);
    }
    
  return (
    <div>
        <div className={pageStyles.txnList}>
            {
                // console.log(pageItems);
                pageItems.map((t,i) => {
                    return <div key={i}>
                        {t}
                    </div>
                })
            }
        </div>
        <div className={pageStyles.paginationBtnContainer}>
            <button 
                onClick={() => handlePageClick(currPage-1)}
                className={`${pageStyles.pageNum} ${currPage<=1 && pageStyles.disableBtn}`}
            >◀️</button>
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
            >▶️</button>
        </div>
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