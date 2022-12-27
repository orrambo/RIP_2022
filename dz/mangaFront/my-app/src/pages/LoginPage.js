import React, {useState} from 'react';
import '../styles/LoginPage.css'
import {useHistory} from "react-router";
import {Link} from "react-router-dom";


export function LoginPage() {

    const history = useHistory()
    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');

    function Login() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch('/api/authorize/',{
            method: "post",
            body: JSON.stringify(ob),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                localStorage.setItem('user_id', res[1])
                localStorage.setItem('user_login', log)
                localStorage.setItem('is_staff', res[0])
                if (res[0]) {
                    //window.location.replace("/manga/managers")
                    history.push('/manager_purchases')
                }
                else{
                    history.push('/')
                }
            })
            .catch(function (reason) {
                console.log(reason)
                //window.location.replace("/login")
                history.push('/login')
            })
    }
    return (
        <div className="register-block1">
            <h1 className="title-block">
                Вход
            </h1>
            <form className="form-block1">
                <div className="">
                    <label
                        htmlFor="login"
                        className="text-block331"
                    >
                        Логин
                    </label>
                    <input
                        type="login"
                        onChange={(event) => setLog(event.target.value)}
                        value={log}
                        className="input-block331"
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="password"
                        className="text-block331"
                    >
                        Пароль
                    </label>
                    <input
                        type="password"
                        onChange={(event) => setPass(event.target.value)}
                        value={pass}
                        className="input-block331"
                    />
                </div>
            </form>
            <div className="log_in_btn">
                <button
                    className="action-block331"
                    onClick={() => Login()}
                >
                    Войти
                </button>
            </div>

            <p className="repage-block1">
                {" "}
                Отсутствует аккаунт?{" "}
                <br/>
                <Link to={`/registration`}>
                    <a className="font-medium text-indigo-600 text-xl hover:underline">
                        Зарегестрироваться
                    </a>
                </Link>
            </p>
        </div>
    );
}