import styles from './commonInput.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';
import { HTMLAttributes } from 'react';

const cn = classNames.bind(styles);

interface inputProps extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // 추가
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  suffix?: React.ReactNode;
  left?: React.ReactNode;
}

const CommonInput = ({
  label,
  id,
  suffix,
  register,
  className,
  left,
  ...rest
}: inputProps) => {
  return (
    <div className={cn('container')}>
      {left}
      {label && <label htmlFor={id}>{label}</label>}
      <input className={cn('input', className)} id={id} {...register} {...rest} />
      {suffix}
    </div>
  );
};

export default CommonInput;
