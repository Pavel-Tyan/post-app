import { AxiosError } from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Settings from '../../components/Settings/Settings';
import { useUser } from '../../hooks/useUser';
import styles from '../PasswordSettings/PasswordSettings.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent } from 'react';
import { UpdateDataUser, UserDto } from '../../api/@types/api';
import Heading from '../../components/Heading/Heading';
import { useUpdateUserData } from '../../hooks/useUpdateUserData';

export type ChangePersonalDataForm = {
    name: {
        value: string;
    };
    surname: {
        value: string;
    };
    password: {
        value: string;
    };
};

/**
 * Renders the page for changing personal data.
 *
 * @return {JSX.Element} The JSX element representing the PersonalDataSettings component.
 */
const PersonalDataSettings = () => {
    const { data: user, isSuccess: isGettingUserSuccess, error: isGettingUserError } = useUser();

    const {
        mutate: updateUser,
        isSuccess: isUpdatingUserSuccess,
        error: updatingUserError,
        reset: resetUpdateUser,
    } = useUpdateUserData();

    if (isGettingUserError instanceof AxiosError) {
        return <div className={styles.loading}>{isGettingUserError.response?.data.message}</div>;
    }

    if (isGettingUserSuccess) {
        const submit = async (e: FormEvent) => {
            e.preventDefault();

            resetUpdateUser();

            const target = e.target as typeof e.target & ChangePersonalDataForm;

            const updatedUserDto: UserDto = {
                email: user.email,
                name: target.name.value,
                surname: target.surname.value,
                password: target.password.value,
            };

            const updatedDataDto: UpdateDataUser = {
                user: updatedUserDto,
                id: user?._id,
            };

            updateUser(updatedDataDto);
        };

        let updateUserErrorMessage = updatingUserError?.message;

        if (updatingUserError instanceof AxiosError) {
            updateUserErrorMessage = updatingUserError.response?.data.message;
        }

        return (
            <div className={styles.wrapper}>
                <Navbar userName={user.name} userSurname={user.surname} />
                <div className={styles.settingsWrapper}>
                    <Settings />
                    <main className={styles.formWrapper}>
                        <Heading>Сменить личные данные</Heading>
                        {isUpdatingUserSuccess && (
                            <div className={styles.success}>Данные обновлены</div>
                        )}
                        {updateUserErrorMessage && (
                            <div className={styles.error}>{updateUserErrorMessage}</div>
                        )}
                        <form className={styles.form} onSubmit={submit}>
                            <div className={styles.field}>
                                <label htmlFor='password'>Текущий пароль</label>
                                <Input
                                    id='password'
                                    name='password'
                                    placeholder='Текущий пароль'
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='surname'>Фамилия</label>
                                <Input id='surname' placeholder='Фамилия' name='surname' required />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='name'>Имя</label>
                                <Input id='name' name='name' placeholder='Имя' required />
                            </div>
                            <Button size='large'>Сохранить</Button>
                        </form>
                    </main>
                </div>
            </div>
        );
    }

    return <div className={styles.loading}>Loading...</div>;
};

export default PersonalDataSettings;
