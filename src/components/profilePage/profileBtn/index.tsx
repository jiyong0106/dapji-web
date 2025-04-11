import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from './profileBtn.module.scss';

type PorfileBtn = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const cn = classNames.bind(styles);

const ProfileBtn = ({ children, className, ...rest }: PorfileBtn) => {
  return (
    <button className={cn('base', className)} {...rest}>
      {children}
    </button>
  );
};

export default ProfileBtn;
