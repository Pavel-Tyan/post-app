import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

/**
 * Renders a button component with dynamic styling based on size.
 *
 * @param {ButtonProps} children - The content of the button.
 * @param {string} className - Additional classes for styling.
 * @param {'large' | 'small'} size - The size variant of the button.
 * @param {any} props - Additional props to be spread to the button element.
 * @return {JSX.Element} The rendered button component.
 */
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
