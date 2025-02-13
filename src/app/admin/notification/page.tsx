'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import instance from '@/src/utils/axios';
import styles from './notification.module.scss';

type FormData = {
  title: string;
  body: string;
};

const NotificationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await instance.post('/send-notification', data);
      alert('알림 전송 성공!');
      reset();
    } catch (error) {
      console.error('알림 전송 실패:', error);
      alert('알림 전송에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>푸시 알림 발송 (전체)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">타이틀</label>
          <input
            id="title"
            type="text"
            placeholder="알림 제목"
            {...register('title', { required: '타이틀은 필수입니다.' })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="body">내용</label>
          <textarea
            id="body"
            placeholder="알림 내용"
            {...register('body', { required: '내용은 필수입니다.' })}
          />
          {errors.body && <p>{errors.body.message}</p>}
        </div>

        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default NotificationPage;
