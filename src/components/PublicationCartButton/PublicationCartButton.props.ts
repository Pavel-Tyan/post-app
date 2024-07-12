import { Publication } from '../../api/@types/api';

export interface PublicationCartButtonProps extends React.ComponentPropsWithRef<'button'> {
    publication: Publication;
}
