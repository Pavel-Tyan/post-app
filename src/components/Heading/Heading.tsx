import { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';
import cn from 'classnames';

/**
 * Renders a custom h1 element with the provided children and class name.
 *
 * @param {HeadingProps} children - The children to be rendered inside the heading element.
 * @param {string} className - The class name to be applied to the heading element.
 * @return {JSX.Element} The heading element with the specified children and class name.
 */
const Heading = ({ children, className }: HeadingProps) => {
    return <h1 className={cn(className, styles.h1)}>{children}</h1>;
};

export default Heading;
