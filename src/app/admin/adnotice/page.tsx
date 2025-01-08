'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adNoticePage.module.scss';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';
import { noticeDummy, noticeDummyType } from '@/src/utils/dummy';

const cn = classNames.bind(styles);

const AdNoticePage = () => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all'); // 기본값: 전체 보기

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredNotice = noticeDummy.filter((notice) => {
    if (statusFilter === 'all') return true; // '전체' 선택 시 모든 데이터 표시
    if (statusFilter === '긴급') return notice.type === '긴급'; // '전체' 선택 시 모든 데이터 표시
    return notice.type === statusFilter; // '일반' 또는 '긴급'과 일치하는 항목만 표시
  });

  const formatCategory = (category: string) => {
    const categoryMap = {
      violence_hate: '폭력/혐오',
      sexual: '성적인 콘텐츠',
      ad_spam: '광고/스팸',
      other: '기타',
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  const handleNoticeClick = () => {
    alert('수정페이지 이동');
  };

  const adNoticeEditPage = () => {
    alert('수정페이지 이동');
  };
  const adNoticedelteClick = () => {
    alert('공지 삭제');
  };
  const adNoticeUploadPage = () => {
    router.push('/admin/adnotice/upload');
  };

  return (
    <div className={cn('container')}>
      <div className={cn('hedaer')}>
        <div className={cn('status-filter')}>
          <select value={statusFilter} onChange={handleStatusChange}>
            <option value="all">전체</option>
            <option value="pending">일반</option>
            <option value="deleted">긴급</option>
          </select>
        </div>
        <div className={cn('upload')} onClick={adNoticeUploadPage}>
          공지 업로드
        </div>
      </div>
      <table className={cn('table')}>
        <thead>
          <tr>
            <th className={cn('noticeId')} onClick={handleNoticeClick}>
              공지Id
            </th>
            <th className={cn('noticeId')}>공지 타입</th>
            <th className={cn('noticeTitle')}>공지 타이틀</th>
            <th className={cn('noticeContent')}>공지 내용</th>
            <th className={cn('status')}> 상태</th>
          </tr>
        </thead>

        <tbody>
          {filteredNotice.map((notice) => (
            <tr key={notice.notice_idx}>
              <td className={cn('noticeId')}>{notice.notice_idx}</td>
              <td className={cn('noticeId')}>{notice.type}</td>
              <td className={cn('noticeTitle')}>{notice.title}</td>
              <td className={cn('noticeContent')}>{notice.content}</td>
              <td className={cn('status')}>
                <div className={cn('actionWrapper')}>
                  <span
                    className={cn('actionText', 'keep')}
                    onClick={adNoticeEditPage}
                  >
                    수정
                  </span>
                  <span
                    className={cn('actionText', 'delete')}
                    onClick={adNoticedelteClick}
                  >
                    삭제
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalChoice />
    </div>
  );
};

export default AdNoticePage;
