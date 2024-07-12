import { Link, useNavigate } from 'react-router-dom';
import { NavbarProps } from './Navbar.props';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const Navbar = ({ userName, userSurname }: NavbarProps) => {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <nav className={styles.navbar} aria-label='Навигация по сайту'>
            <div className={styles.user}>{`${userSurname} ${userName}`}</div>
            <ul className={styles.linkList}>
                <li>
                    <Link className={styles.link} to='/'>
                        Новости
                    </Link>
                </li>
                <li>
                    <Link className={styles.link} to='/password'>
                        Настройки
                    </Link>
                </li>
                <li>
                    <Button onClick={logOut} className={styles.button}>
                        <img src='./logout-icon.svg' alt='Выйти' />
                        Выйти
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
