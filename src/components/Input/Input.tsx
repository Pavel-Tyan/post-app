import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

/**
 * Renders an input element with customizable styles and validation state.
 *
 * @param {string} className - Additional CSS class names for the input element.
 * @param {boolean} isValid - Indicates whether the input value is valid or not.
 * @param {object} props - Additional props to be spread onto the input element.
 * @return {JSX.Element} The rendered input element.
 */
const Input = ({ className, isValid = true, ...props }: InputProps) => {
    return (
        <input
            className={cn(styles.input, className, {
                [styles.invalid]: isValid,
            })}
            {...props}
        />
    );
};

export default Input;
