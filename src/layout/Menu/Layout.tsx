import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';

/**
 * Renders a layout component with the provided children.
 *
 * @param {LayoutProps} children - The children elements to be rendered within the layout.
 * @return {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }: LayoutProps) => {
    return <div className={styles.layout}>{children}</div>;
};

export default Layout;
