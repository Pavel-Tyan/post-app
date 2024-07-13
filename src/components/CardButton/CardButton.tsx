import styles from './CardButton.module.css';
import { CardButtonProps } from './CardButton.props';

/**
 * Renders a CardButton component for displaying buttons and publications.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the button.
 * @param {object} props - Additional props to be spread onto the button element.
 * @return {JSX.Element} The rendered CardButton component.
 */
const CardButton = ({ children, ...props }: CardButtonProps) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};

export default CardButton;
