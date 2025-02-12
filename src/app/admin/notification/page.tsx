'use client';
import React from 'react';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import styles from './notification.module.scss';
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);

type FormData = {
  title: string;
  body: string;
  target: string;
};

const NotificationPage = () => {
  // useForm 훅 초기화
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      body: '',
      target: 'ALL', // 기본값
    },
  });

  // 폼 전송 시 호출될 함수
  const onSubmit = async (data: FormData) => {
    try {
      await instance.post('/send-notification', data);
      alert('알림 전송 성공!');
      // 전송 후 폼 초기화
      reset();
    } catch (error) {
      console.error('알림 전송 실패:', error);
      alert('알림 전송에 실패했습니다.');
    }
    console.log(data);
  };

  return (
    <div className={cn('container')}>
      <h1 className={cn('header')}>푸시 알림 발송</h1>

      {/* handleSubmit(onSubmit)으로 폼 전체 감싸기 */}
      <form onSubmit={handleSubmit(onSubmit)} className={cn('form')}>
        {/* 타이틀 입력 */}
        <div className={cn('form-group')}>
          <label htmlFor="title">타이틀</label>
          <input
            id="title"
            type="text"
            placeholder="알림 제목을 입력하세요"
            // register 함수에 'title' 필드 + required 유효성 검사
            {...register('title', { required: '타이틀은 필수입니다.' })}
          />
          {/* 에러 메시지 표시 */}
          {errors.title && (
            <p className={cn('error-message')}>{errors.title.message}</p>
          )}
        </div>

        {/* 본문 입력 */}
        <div className={cn('form-group')}>
          <label htmlFor="body">내용</label>
          <textarea
            id="body"
            placeholder="알림 본문을 입력하세요"
            {...register('body', { required: '내용은 필수입니다.' })}
          />
          {errors.body && (
            <p className={cn('error-message')}>{errors.body.message}</p>
          )}
        </div>

        {/* 대상 선택 */}
        <div className={cn('form-group')}>
          <label htmlFor="target">대상</label>
          <select id="target" {...register('target')}>
            <option value="ALL">전체 사용자</option>
            <option value="VIP">VIP 사용자</option>
            <option value="TEST_USER">특정 사용자(예: 테스트)</option>
          </select>
        </div>

        {/* 전송 버튼 */}
        <button type="submit" className={cn('send-button')}>
          전송
        </button>
      </form>
    </div>
  );
};

export default NotificationPage;
