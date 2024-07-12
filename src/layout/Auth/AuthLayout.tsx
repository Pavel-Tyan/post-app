import styles from './AuthLayout.module.css';
import { AuthLayoutProps } from './AuthLayout.props';

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return <div className={styles.layout}>{children}</div>;
};

export default AuthLayout;
