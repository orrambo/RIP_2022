import React, {useState} from 'react';
import '../styles/LoginPage.css'


export function LoginPage() {

    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');

    function Login() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch("http://127.0.0.1:8000/rest-auth/login/",     {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            body: JSON.stringify(ob),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const token = res.key;
                sessionStorage.setItem('token', token);

                fetch(`http://127.0.0.1:8000/rest-auth/user/`, {
                    headers: {
                        "Authorization": `Token ${sessionStorage.getItem('token')}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('user_id', data.pk)
                        localStorage.setItem('user_login', data.username)
                    })

                setTimeout(() => {
                    window.location.replace("/")
                }, 50);
            })
            .catch(function (reason) {
                window.location.replace("/login")
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
                <a
                    href="/registration"
                    className="font-medium text-indigo-600 text-xl hover:underline"
                >
                    Зарегестрироваться
                </a>
            </p>
        </div>
    );
}