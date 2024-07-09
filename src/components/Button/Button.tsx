import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({ children, className, size = 'small', ...props }: ButtonProps) => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
            })}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
