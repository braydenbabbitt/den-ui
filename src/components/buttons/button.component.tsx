import { css } from '@emotion/react';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { MIDDLE_GRAY_HEX, THEME_PRIMARY } from '../../constants/theme';
import { convertHexToTransparency, getColorForTextContrastFromHex, getHexFromColorString } from '../../utils/colors';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'solid' | 'outlined';
  color?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'solid', color = THEME_PRIMARY, ...rest },
  ref,
) {
  const colorHex = getHexFromColorString(color);
  const baseStyles = css({
    padding: '0.5em 0.7em',
    cursor: 'pointer',
    borderRadius: '0.35em',
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'box-shadow 0.15s',
    '&:hover': {
      boxShadow: `2px 2px 3px ${convertHexToTransparency(MIDDLE_GRAY_HEX, 0.5)}`,
    },
  });

  const variantStyles =
    variant === 'outlined'
      ? // Outlined styles
        css({
          border: `2px solid ${colorHex}`,
          color: colorHex,
        })
      : // Solid styles
        css({
          backgroundColor: colorHex,
          color: getColorForTextContrastFromHex(colorHex),
        });

  return (
    <button css={[baseStyles, variantStyles]} ref={ref} {...rest}>
      {children}
    </button>
  );
});
