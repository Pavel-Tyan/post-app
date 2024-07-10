import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import Heading from '../../components/Heading/Heading';
import { FormEvent } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { AxiosError } from 'axios';

export type RegisterForm = {
    name: {
        value: string;
    };
    surname: {
        value: string;
    };
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

const Register = () => {
    const { mutate: registerUser, isError, isSuccess, reset, error } = useRegister();
    const navigate = useNavigate();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        reset();

        const target = e.target as typeof e.target & RegisterForm;
        const userDto = {
            name: target.name.value,
            surname: target.surname.value,
            email: target.email.value,
            password: target.password.value,
        };

        registerUser(userDto);
    };

    if (isSuccess) {
        navigate('/auth/login');
    }

    let errorMessage = error?.message;

    if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
    }

    return (
        <div className={styles.auth}>
            <Heading>Регистрация</Heading>
            {isError && <div className={styles.error}>{errorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваша фамилия</label>
                    <Input id='surname' placeholder='Фамилия' name='surname' required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='name'>Ваше имя</label>
                    <Input id='name' placeholder='Имя' name='name' required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' placeholder='Email' name='email' required />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваше пароль</label>
                    <Input id='password' name='password' placeholder='Пароль' required />
                </div>
                <Button size='large'>Зарегистрироваться</Button>
            </form>
            <div className={styles.links}>
                <div>Есть аккаунт?</div>
                <div>
                    <Link to='/auth/login'>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
