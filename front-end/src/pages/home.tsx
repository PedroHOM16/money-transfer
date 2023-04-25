import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getBalanceById, validateToken } from "../services/requestPost";
import tailwind from "../style/tailwind";
import TransfersTable from "./transfersTable";
import '../index.css'


function Home() {
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [validToken, setValidToken] = useState(false);

    const navigate = useNavigate();
    const localStorageData = JSON.parse(localStorage.getItem('user')!);
    
    const isTokenValid = async (): Promise<any> => {
        const validate = await validateToken('/login/validate', localStorageData.token);
        return 'error' in validate && setValidToken(true);
    };

    const getUserBalance = async () => {
        const { accountId } = localStorageData;
        const userBalance = await getBalanceById(accountId)
        setBalance(userBalance);
    };
    
    useEffect(() => {
        isTokenValid();
        // !localStorageData && navigate('/login');
        validToken && navigate('/login');      
        setUsername(localStorageData.data.username)
    });
    
    useEffect(() => {
        getUserBalance();
    }, [])

    

    return (
        <div className={tailwind.homePage}>
            <h1 className={tailwind.homeTitle}>{`Olá ${username}!`}</h1>
            <div className={tailwind.homeBalance}>{`Seu saldo é: R$${balance}`}</div>
            <TransfersTable />
            <button type="button" className={tailwind.transferNavButton} onClick={() => navigate('/transfer')}>Transferir</button>
            <button type="button" className={tailwind.outButton} onClick={() => {navigate('/login'); localStorage.setItem('user', '')}}>Sair</button>
        </div>
    )
}

export default Home;