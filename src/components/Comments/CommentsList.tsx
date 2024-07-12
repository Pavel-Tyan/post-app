import { FormEvent, useEffect } from 'react';
import { useComments } from '../../hooks/useComments';
import styles from './CommentsList.module.css';
import Comment from '../Comment/Comment';
import { CommentsListProps } from './CommentsList.props';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import { useCreateComment } from '../../hooks/useCreateComment';
import { CreateCommentDto } from '../../api/@types/api';

type CommentForm = {
    comment: {
        value: string;
    };
};

const CommentsList = ({ publicationId }: CommentsListProps) => {
    const { data: comments, mutate: getCommentsByPublicationId, isSuccess } = useComments();

    useEffect(() => {
        getCommentsByPublicationId(publicationId);
    }, [getCommentsByPublicationId, publicationId]);

    const { mutateAsync: createComment } = useCreateComment();

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & CommentForm;

        const comment: CreateCommentDto = {
            text: target.comment.value,
            publicationId: publicationId,
        };

        createComment(comment).then(() => {
            getCommentsByPublicationId(publicationId);
        });
    };

    if (isSuccess) {
        return (
            <div className={styles.wrapper}>
                <Heading>Комментарии</Heading>
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.field}>
                        <label htmlFor='password'>
                            <Heading className={styles.label}>Оставить комментарий</Heading>
                        </label>
                        <textarea
                            className={styles.textarea}
                            id='comment'
                            placeholder='Текст комментария'
                            name='comment'
                            required
                        />
                    </div>
                    <Button className={styles.button} size='small'>
                        Оставить комментарий
                    </Button>
                </form>
            </div>
        );
    }

    return <div className={styles.wrapper}>Loading ...</div>;
};

export default CommentsList;
