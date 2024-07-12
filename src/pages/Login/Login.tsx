import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import Heading from '../../components/Heading/Heading';
import { FormEvent } from 'react';
import { AxiosError } from 'axios';
import { useLogin } from '../../hooks/useLogin';
import { UserDto } from '../../api/@types/api';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

const Login = () => {
    const { mutate: loginUser, isError, isSuccess, reset, error } = useLogin();
    const navigate = useNavigate();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        reset();

        const target = e.target as typeof e.target & LoginForm;
        const userDto: Pick<UserDto, 'email' | 'password'> = {
            email: target.email.value,
            password: target.password.value,
        };

        loginUser(userDto);
    };

    if (isSuccess) {
        navigate('/');
    }

    let errorMessage = error?.message;

    if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
    }

    return (
        <div className={styles.auth}>
            <Heading>Вход</Heading>
            {isError && <div className={styles.error}>{errorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' placeholder='Email' name='email' required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваше пароль</label>
                    <Input id='password' name='password' placeholder='Пароль' required />
                </div>
                <Button size='large'>Войти</Button>
            </form>
            <div className={styles.links}>
                <div>Нет аккаунта?</div>
                <div>
                    <Link to='/register'>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
