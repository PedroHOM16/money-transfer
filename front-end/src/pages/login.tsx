import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, requestLogin } from '../services/requestPost';
import tailwind from '../style/tailwind';
import '../index.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [renderError, setRenderError] = useState('');
    const navigate = useNavigate();
    
    const validateLogin = async () => {
        const result = await requestLogin('/login', { username, password });
        
        if (result.error) {
            setRenderError(result.error.message)
        } else {
            const userData = await getUser('/user', result.token);
            setRenderError('');
            localStorage.setItem('user', JSON.stringify({ ...result, ...userData}));
            if (!result) return false;
            navigate('/home');
        }
    }

    useEffect(() => console.log(typeof tailwind.loginButton));

    return (
        <div className={tailwind.loginPage}>
            <h1 className={tailwind.loginLabels}>Faça seu Login:</h1>
            <input
                type="text"
                className={tailwind.loginInputs}
                placeholder='Nome de usuário'
                onChange={ ({ target }) => {
                    setUsername(target.value);
                } }
            />            
            <input
                type="password"
                className={tailwind.loginInputs}
                placeholder='Senha'
                onChange={ ({ target }) => {
                    setPassword(target.value);
                } }            
            />
            <button
                type="button"
                className={ tailwind.loginButton }
                onClick={ validateLogin }
            >Entrar</button>
            <button
                type="button"
                className={tailwind.registerNavButton}
                onClick={ () => navigate('/register') }
            >Cadastrar</button>
            { renderError ? <p className={tailwind.errorMsgs}>{renderError}</p> : <br />}            
        </div>
    );
}

export default Login;