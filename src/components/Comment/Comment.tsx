import { useEffect } from 'react';
import { useAuthor } from '../../hooks/usePublicationAuthor';
import styles from './Comment.module.css';
import { CommentProps } from './Comment.props';

const Comment = ({ comment }: CommentProps) => {
    const { data: author, mutate: getAuthor, isSuccess } = useAuthor();

    useEffect(() => {
        getAuthor(comment);
    }, [comment, getAuthor]);

    const formattedDate = new Intl.DateTimeFormat('ru-RU').format(new Date(comment.createdAt));
    return (
        <div className={styles.wrapper}>
            <div className={styles.commentDataWrapper}>
                <div>Дата:</div>
                <div>{formattedDate}</div>
            </div>
            <div className={styles.commentDataWrapper}>
                <div>Автор:</div>
                <div>
                    {isSuccess && author.name}
                    {!isSuccess && <>Loading ...</>}
                </div>
            </div>
            <p className={styles.text}>{comment.text}</p>
        </div>
    );
};

export default Comment;
