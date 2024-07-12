import styles from './CardButton.module.css';
import { CardButtonProps } from './CardButton.props';

const CardButton = ({ children, ...props }: CardButtonProps) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};

export default CardButton;
