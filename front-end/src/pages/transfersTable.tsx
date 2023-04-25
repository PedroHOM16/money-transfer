import { useEffect, useState } from "react";
import { getTransactionsById, getUserById } from "../services/requestPost";
import '../index.css'
import tailwind from "../style/tailwind";


function TransfersTable() {
    const [transactions, setTransactions] = useState<any>([]);
    const [dateFilter, setDateFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [booleanRender, setBooleanRender] = useState<boolean>(false);
    const [transDate, setTransDate] = useState<any>([]);

    const localStorageData = JSON.parse(localStorage.getItem('user')!);    

    const getTransactions = async ():Promise<void> => {
        const { id } = localStorageData;
        const transactionsApi = await getTransactionsById(id);        
        const payload: any = [...transactionsApi.debTransactions, ...transactionsApi.credTransactions]
        payload.sort((a: any, b: any) => a.id - b.id )
        await payload.map(async (trans: any) => {
            if (trans.debitedAccountId === localStorageData.id) {
                const name = await getUsername(+trans.creditedAccountId);
                trans['name'] = name;
            } else {
                const name = await getUsername(+trans.debitedAccountId);
                trans['name'] = name;
            }
        })        
        setTransactions(payload);
    };
    
    const getUsername = async (id: number): Promise<any> => {
        const otherPartName = await getUserById(id);        
        return otherPartName;       
    };
    
    const getTransDates = () => {
        let result: any = []
        transactions.map((trans: any) => result.push(dateFormat(trans.createdAt)));
        setTransDate(result);
    }
    
    useEffect(() => {
        getTransactions();
    }, []);
    
    useEffect(() => {
        getTransDates();
        // getTransactions();
        // setTransactions(transactions)
        setDateFilter('');
        setTypeFilter('all');
        
    }, [booleanRender])

    function dateFormat(date: string) {
        let day = date.slice(8, 10);
        let month = date.slice(5, 7);
        let year = date.slice(0, 4);
        let formatedDate = day + '/' + (month) + '/' + year;
        return formatedDate;
    };    

    return (
        <div>
            <button
                type="button"
                className={tailwind.transferTableButton}
                onClick={ () => booleanRender ? setBooleanRender(false) : setBooleanRender(true) }
            >Histórico de transações</button>
            {booleanRender
                && <div>
                    <input type="date" className={tailwind.dateInput} onChange={({ target }) => setDateFilter(target.value)} />
                    <select  className={tailwind.typeInput} onChange={ ({ target }) => setTypeFilter(target.value) } >
                        <option value="all" >Todas</option>
                        <option value="cash-in" >Entradas</option>
                        <option value="cash-out" >Saídas</option>
                    </select>
                    <table className={tailwind.transferTable}>
                        <thead>
                            <tr>
                                <th className={tailwind.tableHeader}>Data</th>
                                <th className={tailwind.tableHeader}>Tipo</th>
                                <th className={tailwind.tableHeader}>Valor</th>
                                <th className={tailwind.tableHeader}>Usuário</th>
                            </tr>
                        </thead>
                        <tbody className={tailwind.tableDatas}>
                            {transactions.map((trans: any) => (
                                dateFilter === ''
                                ? (typeFilter === 'cash-out' && trans.debitedAccountId === localStorageData.id
                                    ? <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>
                                    : typeFilter === 'cash-in' && trans.creditedAccountId === localStorageData.id
                                    ? <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>
                                    : typeFilter === 'all'
                                    && <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>)
                                : dateFilter !== '' && dateFormat(dateFilter) === dateFormat(trans.createdAt)
                                && (typeFilter === 'cash-out' && trans.debitedAccountId === localStorageData.id
                                ? <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>
                                    : typeFilter === 'cash-in' && trans.creditedAccountId === localStorageData.id
                                    ? <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>
                                    : typeFilter === 'all'
                                    && <tr key={ trans.id }>
                                    <td className={tailwind.tableDatas}>{dateFormat(trans.createdAt)}</td>
                                    <td className={tailwind.tableDatas}>{trans.debitedAccountId === localStorageData.id ? 'cash-out': 'cash-in' }</td>
                                    <td className={tailwind.tableDatas}>{trans.value}</td>
                                    <td className={tailwind.tableDatas}>{trans.name}</td>
                                </tr>)
                            ))}
                        </tbody>
                    </table>
                    {dateFilter !== '' 
                        && (transDate.indexOf(dateFormat(dateFilter)) === -1
                        && <p className={tailwind.errorMsgs}>Você não possui transações nesta data!</p>)
                    }
                </div>
            }
        </div>
            
    )
}

export default TransfersTable;
