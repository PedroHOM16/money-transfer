import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Start(): any {
    const navigate = useNavigate();
    useEffect(() => { navigate('/login') }, []);
}

export default Start;