import { Comment } from '../../api/@types/api';
export interface CommentProps extends React.ComponentPropsWithRef<'div'> {
    comment: Comment;
}
