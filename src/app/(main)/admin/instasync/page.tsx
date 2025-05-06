'use client';
import { useState } from 'react';
import { useCreateSyncPost, useFetchInstaSyncStatus } from '../api';
import styles from './instasync.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const InstaSyncPage = () => {
  const [selectedShortcode, setSelectedShortcode] = useState('');
  const { data: syncStatus, isLoading } = useFetchInstaSyncStatus();
  const { mutate: createSyncPost, isPending } = useCreateSyncPost();

  const handleSync = (shortcode: string) => {
    createSyncPost(shortcode);
  };

  // 선택한 사용자의 숏코드 처리
  const handleUserSelect = (user_idx: number) => {
    const selectedUser = syncStatus?.data.find((user: any) => user.user_idx === user_idx);
    setSelectedShortcode('');
    return selectedUser;
  };

  if (isLoading) {
    return <div className={cn('loading')}>로딩 중...</div>;
  }

  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>인스타그램 동기화 관리</h1>

      <div className={cn('users-grid')}>
        {syncStatus?.data.map((user: any) => (
          <div key={user.user_idx} className={cn('user-card')}>
            <h2 className={cn('user-name')}>
              {user.insta_name} 
              {!user.is_valid && <span className={cn('invalid')}>유효하지 않은 계정</span>}
            </h2>
            <p>생성일: {user.created_at}</p>
            
            {user.is_valid ? (
              <>
                <h3 className={cn('section-title')}>동기화 필요한 게시물</h3>
                {Object.keys(user.shortcodes_with_dates).length > 0 ? (
                  <div className={cn('shortcodes-grid')}>
                    {Object.entries(user.shortcodes_with_dates).map(([shortcode, date]: [string, any]) => (
                      <div key={shortcode} className={cn('shortcode-item')}>
                        <p className={cn('shortcode')}>{shortcode}</p>
                        <p className={cn('date')}>{date}</p>
                        <button 
                          className={cn('sync-btn')} 
                          onClick={() => handleSync(shortcode)}
                          disabled={isPending}
                        >
                          {isPending && selectedShortcode === shortcode ? '동기화 중...' : '동기화'}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={cn('no-data')}>동기화가 필요한 게시물이 없습니다.</p>
                )}

                <h3 className={cn('section-title')}>동기화 완료된 게시물</h3>
                {Object.keys(user.synced_shortcodes).length > 0 ? (
                  <div className={cn('shortcodes-grid', 'synced')}>
                    {Object.entries(user.synced_shortcodes).map(([shortcode, date]: [string, any]) => (
                      <div key={shortcode} className={cn('shortcode-item', 'synced')}>
                        <p className={cn('shortcode')}>{shortcode}</p>
                        <p className={cn('date')}>{date}</p>
                        <span className={cn('synced-tag')}>동기화 완료</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={cn('no-data')}>동기화된 게시물이 없습니다.</p>
                )}
              </>
            ) : (
              <p className={cn('error-message')}>{user.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstaSyncPage; 