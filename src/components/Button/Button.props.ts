import { ReactNode } from 'react';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: ReactNode;
    size?: 'large' | 'small';
}
