import { AxiosError } from 'axios';
import PublicationPanel from '../../components/PublicationPanel/PublicationPanel';
import { useUser } from '../../hooks/useUser';
import styles from './Publications.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { usePublications } from '../../hooks/usePublications';
import { Publication, PublicationDto } from '../../api/@types/api';
import PublicationContent from '../../components/PublicationContent/PublicationContent';
import { FormEvent, useState } from 'react';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { useCreatePublication } from '../../hooks/useCreatePublication';

type PostForm = {
    title: { value: string };
    category: { value: string };
    text: { value: string };
};
const Publications = () => {
    const { data: user, isSuccess: isGettingUserSuccess, error: isGettingUserError } = useUser();

    const [currentPublication, setCurrentPublication] = useState<Publication | undefined>(
        undefined
    );

    const [isCreatingPublication, setIsCreatingPublication] = useState<boolean>(false);

    const {
        data: publications,
        isSuccess: isGettingPublicationSuccess,
        refetch: refetchPublications,
    } = usePublications();

    const { mutateAsync: createPublication } = useCreatePublication();

    if (isGettingUserError instanceof AxiosError) {
        return <div className={styles.loading}>{isGettingUserError.response?.data.message}</div>;
    }

    const createPost = () => {
        setCurrentPublication(undefined);
        setIsCreatingPublication(true);
    };

    const displayPost = (publication: Publication) => {
        setCurrentPublication(publication);
        setIsCreatingPublication(false);
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & PostForm;

        const publicationDto: PublicationDto = {
            title: target.title.value,
            category: target.category.value,
            text: target.text.value,
            userId: user?._id,
        };

        createPublication(publicationDto).then(() => {
            refetchPublications();
        });
    };

    if (isGettingUserSuccess && isGettingPublicationSuccess) {
        return (
            <div className={styles.wrapper}>
                <Navbar userSurname={user.surname} userName={user.name} />
                <div className={styles.publicationsWrapper}>
                    <PublicationPanel
                        publications={publications}
                        createPost={createPost}
                        displayPost={displayPost}
                    />
                    {!isCreatingPublication && (
                        <PublicationContent publication={currentPublication} />
                    )}
                    {isCreatingPublication && (
                        <form className={styles.form} onSubmit={submit}>
                            <Heading>Создать публикацию</Heading>
                            <div className={styles.field}>
                                <label htmlFor='title' />
                                <input
                                    className={styles.input}
                                    id='title'
                                    placeholder='Название'
                                    name='title'
                                    required
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor='category' />
                                <input
                                    className={styles.input}
                                    id='category'
                                    placeholder='Категория'
                                    name='category'
                                    required
                                />
                            </div>
                            <label htmlFor='text' />
                            <textarea
                                className={styles.textarea}
                                id='text'
                                placeholder='Текст публикации'
                                name='text'
                                required
                            />
                            <Button className={styles.button} size='small'>
                                Создать
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return <div className={styles.loading}>Loading...</div>;
};

export default Publications;
