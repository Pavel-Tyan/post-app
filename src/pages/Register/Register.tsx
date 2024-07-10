import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import Heading from '../../components/Heading/Heading';
import { FormEvent } from 'react';
import { useRegister } from '../../hooks/useRegister';

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
    const registerUser = useRegister();
    const navigate = useNavigate();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        registerUser.reset();

        const target = e.target as typeof e.target & RegisterForm;
        const userDto = {
            name: target.name.value,
            surname: target.surname.value,
            email: target.email.value,
            password: target.password.value,
        };

        registerUser.mutate(userDto);
        navigate('/');
    };

    return (
        <div className={styles.auth}>
            <Heading>Регистрация</Heading>
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваша фамилия</label>
                    <Input id='surname' placeholder='Фамилия' name='surname' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='name'>Ваше имя</label>
                    <Input id='name' placeholder='Имя' name='name' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' placeholder='Email' name='email' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваше пароль</label>
                    <Input id='password' name='password' placeholder='Пароль' />
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
