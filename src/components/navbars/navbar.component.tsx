import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { MIDDLE_GRAY_HEX } from '../../constants/theme';
import { Link } from 'react-router-dom';

type NavbarProps = {
  children: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const styles = css({
    padding: '0.5em',
    backgroundColor: MIDDLE_GRAY_HEX,
    maxHeight: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  return <nav css={styles}>{children}</nav>;
};

type NavbarMainImageProps = {
  src: string;
  to?: string;
  alt?: string;
};

const MainImage = ({ src, to, alt }: NavbarMainImageProps) => {
  const styles = css({});

  if (to) {
    return (
      <Link css={styles} to={to}>
        <img src={src} alt={alt} />
      </Link>
    );
  } else {
    return <img css={styles} src={src} alt={alt} />;
  }
};

Navbar.MainImage = MainImage;
export { Navbar };
