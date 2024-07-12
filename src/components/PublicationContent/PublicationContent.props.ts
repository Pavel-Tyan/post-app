import { Publication } from '../../api/@types/api';

export interface PublicationContentProps extends React.ComponentPropsWithRef<'div'> {
    publication: Publication | undefined;
}
