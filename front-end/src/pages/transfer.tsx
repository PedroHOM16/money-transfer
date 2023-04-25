import { useEffect, useState } from "react";
import { createTransaction, getAllUsersNames, getBalanceById } from "../services/requestPost";
import { useNavigate } from 'react-router-dom';
import '../index.css'
import tailwind from "../style/tailwind";


function Transfer() {
    const [debitedAccountId, setDebitedAccountId] = useState('')
    const [username, setUsername] = useState('')
    const [msgBalanceBoolean, setMsgBalanceBoolean] = useState(false)
    const [msgNameBoolean, setMsgNameBoolean] = useState(false)
    const [msgNotFoundNameBool, setMsgNotFoundNameBool] = useState(false)
    const [value, setValue] = useState<any>('')
    const localStorageData = JSON.parse(localStorage.getItem('user')!);
    const navigate = useNavigate();

    const createTransfer = async () => {
        const { id } = localStorageData;
        const userBalance = await getBalanceById(id);
        const names = await getAllUsersNames();        
        if (+value > +userBalance) {
            setMsgBalanceBoolean(true);
            setMsgNameBoolean(false);
            setMsgNotFoundNameBool(false);
        } else if (username === localStorageData.username) {
            setMsgNameBoolean(true);
            setMsgBalanceBoolean(false);
            setMsgNotFoundNameBool(false)
        } else if (names.indexOf(username) === -1) {
            setMsgNotFoundNameBool(true);
            setMsgBalanceBoolean(false);
            setMsgNameBoolean(false);
        } else {
            setMsgBalanceBoolean(false);
            setMsgNameBoolean(false);
            setMsgNotFoundNameBool(false)
            await createTransaction('/transaction', { debitedAccountId, username, value });
            navigate('/home');
        } 
    }

    useEffect(() => {
        setDebitedAccountId(localStorageData.id);              
    })

    const handleCLick = (target: any) => {
        setValue(target.value.replace(',', '.'))
        return value;
    }

    return (
        <div className={tailwind.transferPage}>
            <input type="text" className={tailwind.transferNameInput} placeholder='Para quem deseja transferir?' onChange={({target}) => setUsername(target.value)}/>
            <input type="text" className={tailwind.transferValueInput} placeholder='Qual valor deseja transferir?' onChange={({target}) => handleCLick(target)}/>
            <button type="button" className={tailwind.transferButton} onClick={() => {createTransfer()}}>Transferir</button>
            <button type="button" className={tailwind.transferButton} onClick={() => navigate('/home')}>Voltar</button>
            {msgBalanceBoolean
                ? <p className={tailwind.errorMsgs}>Você não possui saldo o suficiente para esta transação.</p> : <br/>}
            {msgNameBoolean
                && <p className={tailwind.errorMsgs}>Você não pode transferir para si mesmo.</p>}
            {msgNotFoundNameBool
                && <p className={tailwind.errorMsgs}>Destinatário não existe.</p>}
        </div>
    )
}

export default Transfer;