import { ReactNode } from 'react';
import { css } from '@emotion/react';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  style?: 'solid' | 'outlined' | 'text';
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
