'use client';
import { useState } from 'react';
import { useCreateSyncPost, useFetchInstaUsers, useFetchUserShortcodes } from '../api';
import styles from './instasync.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const InstaSyncPage = () => {
  const [selectedInstaName, setSelectedInstaName] = useState<string>('');
  const [selectedShortcode, setSelectedShortcode] = useState('');
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  
  // 인스타그램 아이디가 있는 사용자 목록 조회
  const { data: usersData, isLoading: isUsersLoading } = useFetchInstaUsers();
  
  // 선택한 사용자의 숏코드 목록 조회
  const { 
    data: shortcodesData,
    isLoading: isShortcodesLoading,
    refetch: refetchShortcodes,
    isFetching: isShortcodesFetching
  } = useFetchUserShortcodes(selectedInstaName);
  
  const { mutate: createSyncPost, isPending } = useCreateSyncPost();

  // 특정 사용자 선택
  const handleUserSelect = (instaName: string) => {
    setSelectedInstaName(instaName);
    setSelectedShortcode('');
  };

  // 동기화 목록 조회 버튼 클릭
  const handleFetchShortcodes = () => {
    if (selectedInstaName) {
      refetchShortcodes();
    }
  };

  // 숏코드 동기화 처리
  const handleSync = (shortcode: string) => {
    setSelectedShortcode(shortcode);
    createSyncPost(shortcode);
  };

  // 전체 숏코드 동기화 처리 (미구현 - 향후 백엔드 API 개발 후 연결)
  const handleSyncAll = () => {
    // 미구현 상태이므로 일단 전체 동기화 중임을 표시
    setIsSyncingAll(true);
    setTimeout(() => {
      // 3초 후 상태 초기화 (실제 구현 시 제거)
      setIsSyncingAll(false);
      alert('전체 동기화 기능은 아직 개발 중입니다.');
    }, 3000);
  };

  if (isUsersLoading) {
    return <div className={cn('loading')}>사용자 목록 로딩 중...</div>;
  }

  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>인스타그램 동기화 관리</h1>

      <div className={cn('content-container')}>
        <div className={cn('users-list')}>
          <h2 className={cn('section-title')}>인스타그램 계정</h2>
          <div className={cn('user-cards')}>
            {usersData?.data.map((user: any) => (
              <div 
                key={user.user_idx} 
                className={cn('user-card', { active: selectedInstaName === user.insta_name })}
                onClick={() => handleUserSelect(user.insta_name)}
              >
                <h3 className={cn('user-name')}>{user.insta_name}</h3>
              </div>
            ))}
          </div>
        </div>

        {selectedInstaName ? (
          <div className={cn('user-details')}>
            <div className={cn('selected-user-header')}>
              <h2 className={cn('section-title')}>선택 계정: {selectedInstaName}</h2>
              <div className={cn('action-buttons')}>
                <button 
                  className={cn('sync-all-btn')}
                  onClick={handleSyncAll}
                  disabled={isSyncingAll || isPending || !shortcodesData || Object.keys(shortcodesData.shortcodes_with_dates || {}).length === 0}
                >
                  {isSyncingAll ? '전체 동기화 중...' : '전체 동기화'}
                </button>
                <button 
                  className={cn('fetch-btn')}
                  onClick={handleFetchShortcodes}
                  disabled={isShortcodesFetching}
                >
                  {isShortcodesFetching ? '조회 중...' : '새로고침'}
                </button>
              </div>
            </div>

            {isShortcodesFetching ? (
              <div className={cn('loading')}>숏코드 목록 로딩 중...</div>
            ) : shortcodesData ? (
              shortcodesData.is_valid ? (
                <div className={cn('shortcodes-container')}>
                  {Object.keys(shortcodesData.shortcodes_with_dates).length > 0 ? (
                    <>
                      <h3 className={cn('section-title')}>동기화 필요 ({Object.keys(shortcodesData.shortcodes_with_dates).length}개)</h3>
                      <div className={cn('shortcodes-grid')}>
                        {Object.entries(shortcodesData.shortcodes_with_dates).map(([shortcode, date]: [string, any]) => (
                          <div key={shortcode} className={cn('shortcode-item')}>
                            <div className={cn('shortcode-info')}>
                              <p className={cn('shortcode')}>{shortcode}</p>
                              <span className={cn('date-small')}>{date}</span>
                            </div>
                            <button 
                              className={cn('sync-btn')} 
                              onClick={() => handleSync(shortcode)}
                              disabled={isPending && selectedShortcode === shortcode}
                            >
                              {isPending && selectedShortcode === shortcode ? '처리중' : '동기화'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className={cn('no-data')}>동기화가 필요한 게시물이 없습니다.</p>
                  )}

                  {Object.keys(shortcodesData.synced_shortcodes).length > 0 && (
                    <>
                      <h3 className={cn('section-title', 'synced-title')}>동기화 완료 ({Object.keys(shortcodesData.synced_shortcodes).length}개)</h3>
                      <div className={cn('shortcodes-grid', 'synced')}>
                        {Object.entries(shortcodesData.synced_shortcodes).map(([shortcode, date]: [string, any]) => (
                          <div key={shortcode} className={cn('shortcode-item', 'synced')}>
                            <div className={cn('shortcode-info')}>
                              <p className={cn('shortcode')}>{shortcode}</p>
                              <span className={cn('date-small')}>{date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className={cn('error-message')}>{shortcodesData.error || "유효하지 않은 인스타그램 계정입니다."}</p>
              )
            ) : (
              <div className={cn('empty-state')}>
                <p>계정을 선택하고 새로고침 버튼을 클릭하면 동기화 목록이 표시됩니다.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={cn('user-details', 'empty')}>
            <p className={cn('empty-message')}>좌측에서 인스타그램 계정을 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstaSyncPage; 