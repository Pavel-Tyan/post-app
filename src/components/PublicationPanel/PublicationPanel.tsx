import { useState } from 'react';
import CardButton from '../CardButton/CardButton';
import Heading from '../Heading/Heading';
import Input from '../Input/Input';
import PublicationCartButton from '../PublicationCartButton/PublicationCartButton';
import styles from './PublicationPanel.module.css';
import { PublicationPanelProps } from './PublicationPanel.props';

const PublicationPanel = ({
    publications,
    createPost,
    displayPost,
    setPostCategory,
}: PublicationPanelProps) => {
    const [category, setCategory] = useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <Heading>Публикации</Heading>
            <Input
                className={styles.input}
                value={category}
                onChange={onChange}
                placeholder='Поиск по категории'
            />
            <CardButton onClick={() => setPostCategory(category)}>Поиск по категории</CardButton>
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
