import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading, clearError, error, request} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    return (
        <div className={"row"}>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div className="input-field">
                            <input
                                placeholder="Введите email"
                                id="email"
                                type="text"
                                name={"email"}
                                className={"yellow-input"}
                                value={form.email}
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Введите пароль"
                                id="password"
                                type="password"
                                name={"password"}
                                className={"yellow-input"}
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={"btn yellow darken-4"}
                            style={{marginRight: "10px"}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className={"btn grey lighten-1 black-text"}
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;