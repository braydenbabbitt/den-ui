import { css } from '@emotion/react';
import { ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  style?: 'solid' | 'outlined' | 'text';
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      css={css`
        background-color: red;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
