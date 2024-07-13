import { AxiosError } from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Settings from '../../components/Settings/Settings';
import { useUser } from '../../hooks/useUser';
import styles from './PasswordSettings.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { FormEvent } from 'react';
import { UpdatePasswordUser, UserDto } from '../../api/@types/api';
import { useUpdateUserPassword } from '../../hooks/useUpdateUserPassword';
import Heading from '../../components/Heading/Heading';

export type ChangePasswordForm = {
    oldPassword: {
        value: string;
    };
    password: {
        value: string;
    };
};

/**
 * Renders the Password Settings component and allows the user to update their password.
 *
 * @return {JSX.Element} The JSX element representing the Password Settings component.
 */
const PasswordSettings = () => {
    const { data: user, isSuccess: isGettingUserSuccess, error: isGettingUserError } = useUser();

    const {
        mutate: updateUser,
        isSuccess: isUpdatingUserSuccess,
        error: updatingUserError,
        reset,
    } = useUpdateUserPassword();

    if (isGettingUserError instanceof AxiosError) {
        return <div className={styles.error}>{isGettingUserError.response?.data.message}</div>;
    }

    if (isGettingUserSuccess) {
        const submit = async (e: FormEvent) => {
            e.preventDefault();

            reset();

            const target = e.target as typeof e.target & ChangePasswordForm;

            const userDto: UserDto = {
                email: user.email,
                name: user.name,
                surname: user.surname,
                password: target.oldPassword.value,
            };

            const updatePasswordDto: UpdatePasswordUser = {
                user: userDto,
                newPassword: target.password.value,
                id: user?._id,
            };

            console.log(updatePasswordDto);

            updateUser(updatePasswordDto);
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
                        <Heading>Сменить пароль</Heading>
                        {isUpdatingUserSuccess && (
                            <div className={styles.success}>Данные обновлены</div>
                        )}
                        {updateUserErrorMessage && (
                            <div className={styles.error}>{updateUserErrorMessage}</div>
                        )}
                        <form className={styles.form} onSubmit={submit}>
                            <div className={styles.field}>
                                <label htmlFor='oldPassword'>Старый пароль</label>
                                <Input
                                    id='oldPassword'
                                    placeholder='Старый пароль'
                                    name='oldPassword'
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='password'>Новый пароль</label>
                                <Input
                                    id='password'
                                    name='password'
                                    placeholder='Новый пароль'
                                    required
                                />
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

export default PasswordSettings;
