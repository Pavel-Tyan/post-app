import CardButton from '../CardButton/CardButton';
import styles from './PublicationCartButton.module.css';
import { PublicationCartButtonProps } from './PublicationCartButton.props';

const PublicationCartButton = ({ publication, ...props }: PublicationCartButtonProps) => {
    const title: string = publication.title;
    const date = new Intl.DateTimeFormat('ru-RU').format(new Date(publication.createdAt));

    return (
        <CardButton {...props}>
            <div className={styles.wrapper}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>{date}</div>
            </div>
        </CardButton>
    );
};

export default PublicationCartButton;
