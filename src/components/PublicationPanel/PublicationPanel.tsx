import CardButton from '../CardButton/CardButton';
import Heading from '../Heading/Heading';
import PublicationCartButton from '../PublicationCartButton/PublicationCartButton';
import styles from './PublicationPanel.module.css';
import { PublicationPanelProps } from './PublicationPanel.props';

const PublicationPanel = ({ publications, createPost, displayPost }: PublicationPanelProps) => {
    return (
        <div className={styles.wrapper}>
            <Heading>Публикации</Heading>
            <CardButton onClick={createPost}>
                <img src='./plus-icon.svg' alt='Создать новый пост' />
                Создать новый пост
            </CardButton>
            {publications?.map((publication) => (
                <PublicationCartButton
                    key={publication._id}
                    publication={publication}
                    onClick={() => displayPost(publication)}
                />
            ))}
        </div>
    );
};

export default PublicationPanel;
