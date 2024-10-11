'use client';
import classNames from 'classnames/bind';
import styles from './anonymousToggle.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';

const cn = classNames.bind(styles);

type AnonymousToggleProps = {
  isAnonymous: boolean;
  setIsAnonymous: Dispatch<SetStateAction<boolean>>;
  type?: string;
};

const AnonymousToggle = ({
  isAnonymous,
  setIsAnonymous,
  type,
}: AnonymousToggleProps) => {
  const anonymousClick = () => {
    setIsAnonymous((prev) => !prev);
  };

  return (
    <div className={cn('container', { commentContainer: type === 'comment' })}>
      <div
        className={cn('isAnonymousBtnWrapper', { isAnonymous })}
        onClick={anonymousClick}
      >
        <div className={cn('isAnonymousBtn')} />
      </div>
      <span className={cn('isAnonymousText', { isAnonymous })}>익명</span>
    </div>
  );
};

export default AnonymousToggle;
