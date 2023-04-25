import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getUser, requestLogin } from "../services/requestPost";
import tailwind from "../style/tailwind";
import '../index.css'


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [renderError, setRenderError] = useState('');
    const [booleanWarning, setBooleanWarning] = useState(false);
    const navigate = useNavigate();

    const validateLogin = async () => {
        const result = await requestLogin('/register', { username, password });
        if (result.error) {
            setRenderError(result.error.message);            
        } else {
            const userData = await getUser('/user', result.token);
            setRenderError('');
            // localStorage.setItem('user', JSON.stringify({ ...result, ...userData}));
            // navigate('/home')
            localStorage.setItem('user', '');
            navigate('/login');
        }
    };

    return (
        <div className={tailwind.registerPage}>
            <div className={tailwind.flexingLabels}>
                <label htmlFor="username" className={tailwind.labels}>Digite um nome de usuário:</label>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    className={tailwind.registerInputs}
                    onChange={({ target }) => {
                        setUsername(target.value);
                    }}
                />
            </div>
            <div className={tailwind.flexingLabels}>
                <label htmlFor="password" className={tailwind.labels}>Crie sua senha:</label>
                <input
                    type="password"
                    placeholder="Senha"
                    className={tailwind.registerInputs}
                    onChange={({ target }) => {
                        setPassword(target.value);
                    }}
                />
                <button 
                    onClick={ () => booleanWarning ? setBooleanWarning(false) : setBooleanWarning(true) }
                    className={tailwind.warningBtnMsg}
                >&#9940;</button>
                
            </div>
                 { booleanWarning ? <p
                        className={tailwind.warningMsg}
                        >Sua senha deve conter 8 caracteres, com ao menos uma(1) letra maiúscula e um(1) número.</p> : <br/>}
            <button
                type="button"
                className={tailwind.registerButton}
                onClick={ validateLogin }
            >Cadastrar</button>
            <button
                onClick={() => navigate('/login')}
                className={tailwind.backButton}
                >Voltar
            </button>
            { renderError ? <p className={tailwind.errorMsgs}>{ renderError }</p> : <br/> }
        </div>
    )
}

export default Register;