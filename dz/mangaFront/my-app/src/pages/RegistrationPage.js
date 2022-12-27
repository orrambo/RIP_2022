import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../styles/RegistrationPage.css'
import {useHistory} from "react-router";

function RegistrationPage() {
    const history = useHistory()
    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');

    function Create() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch('http://127.0.0.1:8000/api/user/create', {
            method: "post",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                history.push("/login")
            })
            .catch(function (reason) {
                console.log(reason)
                history.push('/login')
            })
    }

    return (
        <div className="register-block">
            <h1 className="title-block">
                Регистрация
            </h1>
            <form className="form-block">
                <div className="">
                    <label
                        htmlFor="login"
                        className="text-block33"
                    >
                        Логин
                    </label>
                    <input
                        type="login"
                        onChange={(event) => setLog(event.target.value)}
                        value={log}
                        className="input-block33"
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="password"
                        className="text-block33"
                    >
                        Пароль
                    </label>
                    <input
                        type="password"
                        onChange={(event) => setPass(event.target.value)}
                        value={pass}
                        className="input-block33"
                    />
                </div>
                <br />
                <div className="">
                    <Link to="/login"
                          className="action-block33"
                          onClick={() => Create()}
                    >
                        Зарегестрироваться
                    </Link>
                </div>
            </form>

            <p className="repage-block">
                {" "}
                Уже есть аккаунт?{" "}
                <Link to={`/login`}>
                    <a className="login">
                        Войти
                    </a>
                </Link>
            </p>
        </div>
    )
}
export default RegistrationPage;