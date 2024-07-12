import { useEffect } from 'react';
import styles from './PublicationContent.module.css';
import { useAuthor } from '../../hooks/usePublicationAuthor';
import { PublicationContentProps } from './PublicationContent.props';
import Heading from '../Heading/Heading';
import CommentsList from '../Comments/CommentsList';

const PublicationContent = ({ publication }: PublicationContentProps) => {
    const {
        mutate: getPublicationAuthor,
        data: author,
        isSuccess: isGettingPublicationAuthorSuccess,
    } = useAuthor();

    useEffect(() => {
        console.log('publication', publication);
        if (publication) {
            getPublicationAuthor(publication);
        }
    }, [getPublicationAuthor, publication]);

    if (!publication) {
        return <></>;
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU').format(new Date(publication.createdAt));

    return (
        <div className={styles.wrapper}>
            <Heading>{publication.title}</Heading>
            <div className={styles.publicationDataWrapper}>
                <div className={styles.publicationData}>Дата:</div>
                <div className={styles.publicationData}>{formattedDate}</div>
            </div>
            <div className={styles.publicationDataWrapper}>
                <div className={styles.publicationData}>Автор:</div>
                <div className={styles.publicationData}>
                    {isGettingPublicationAuthorSuccess && author.name}
                    {!isGettingPublicationAuthorSuccess && <>Loading ...</>}
                </div>
            </div>
            <div className={styles.publicationDataWrapper}>
                <div className={styles.publicationData}>Категория</div>
                <div className={styles.publicationData}>{publication.category}</div>
            </div>
            <p className={styles.text}>{publication.text}</p>
            <CommentsList publicationId={publication._id} />
        </div>
    );
};

export default PublicationContent;
