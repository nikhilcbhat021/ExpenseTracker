import styles from './TxnList.module.css';
import Pagination from '../utils/Pagination';
import Transaction from '../TxnComp/Transaction';
import { memo, useMemo, useCallback } from 'react';

const TxnList = memo(({transactions, onDeleteHandler, onEditHandler}) => {

  const component = <Transaction></Transaction>;

  // txn = {Title:String, Catergory:String, id:String(for crypto), Price:Number, Date: Date};

  const ReactElementTxnList = useMemo(() => {
    return transactions.map((txn) => {
      console.log("Contructing Transaction");
      console.log(txn);
      return (
        <Transaction key={txn.id} txn={txn} onDeleteHandler={(id) => onDeleteHandler(id)} onEditHandler={(id) => onEditHandler(id)} />
      )
    });
  }, [transactions]);

  return (
    <div>
        <p className={`${styles.title}`}>Recent Transactions</p>
        <div className={`${styles.container}`}>
          <Pagination transactions={ReactElementTxnList}></Pagination>
        </div>
    </div>
  )
})

export default TxnList