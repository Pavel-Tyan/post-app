import { Publication } from '../../api/@types/api';

export interface PublicationPanelProps extends React.ComponentPropsWithRef<'div'> {
    publications: Publication[];
    createPost: () => void;
    setPostCategory: (category: string) => void;
    displayPost: (publication: Publication) => void;
}
