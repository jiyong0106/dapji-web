'use client';
import { useRouteProgress } from '@/src/utils/store/useRouteProgress';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const SmartLink = ({ onClick, ...rest }: Props) => {
  const { start } = useRouteProgress();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    start();
  };

  return (
    <Link
      {...rest}
      onClick={handleClick}
      style={{ textDecoration: 'none', color: 'inherit' }}
    />
  );
};

export default SmartLink;
