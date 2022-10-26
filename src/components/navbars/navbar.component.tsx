import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { MIDDLE_GRAY_HEX } from '../../constants/theme';

type NavbarProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const styles = css({
    padding: '0.75em',
    backgroundColor: MIDDLE_GRAY_HEX,
    maxHeight: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  return <nav css={styles}>{children}</nav>;
};

type NavbarMainImageProps = {
  children: ReactNode;
};

const MainImage = ({ children }: NavbarMainImageProps) => {
  return <>{children}</>;
};

type NavLinkProps = {
  label: string;
  to: string;
};

type MainLinksProps = NavLinkProps[];

Navbar.MainImage = MainImage;
export { Navbar };
