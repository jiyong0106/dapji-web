'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './notification.module.scss';
import axios from 'axios';
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);

const NotificationPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // 버튼 클릭 시 백엔드에 알림 데이터 전송
  const handleSendNotification = async () => {
    try {
      await instance.post('/send-notification', {
        title,
        body,
      });
      alert('알림 전송 성공!');
    } catch (error) {
      console.error('알림 전송 실패:', error);
      alert('알림 전송에 실패했습니다.');
    }
  };

  return (
    <div className={cn('container')}>
      <h1 className={cn('header')}>푸시 알림 발송</h1>

      <div className={cn('form-group')}>
        <label htmlFor="title">타이틀</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="알림 제목을 입력하세요"
        />
      </div>

      <div className={cn('form-group')}>
        <label htmlFor="body">내용</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="알림 본문을 입력하세요"
        />
      </div>

      <button className={cn('send-button')} onClick={handleSendNotification}>
        전송
      </button>
    </div>
  );
};

export default NotificationPage;
