import { NavLink } from 'react-router-dom';
import styles from './Settings.module.css';
import cn from 'classnames';

/**
 * Renders the navigation panel of settings.
 *
 * @return {JSX.Element} The rendered settings component.
 */
const Settings = () => {
    return (
        <nav className={styles.navbar} aria-label='Навигация по настройкам пользователя'>
            <ul className={styles.linkList}>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                        to='/password'
                    >
                        Пароль
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                        to='/personalData'
                    >
                        Личные данные
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Settings;
