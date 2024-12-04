'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminPost.module.scss';
import { fetchPostReports, deletePostData, keepPostData, resetPostStatus } from './api';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

interface PostReport {
  post_idx: number;
  reporter_user_idx: number;
  reporter_nickname: string;
  reported_user_idx: number;
  reported_nickname: string;
  content: string | null;
  category: 'violence_hate' | 'sexual' | 'ad_spam' | 'other';
  createdAt: string;
  report_count: number;
  is_deleted: boolean;
  status: 'pending' | 'confirmed' | 'deleted';
  gym_idx: number;  // gym_idx 추가

}

const PostPage = () => {
  const router = useRouter();
  const [reports, setReports] = useState<PostReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { showModalHandler } = useModal();

  const fetchReports = async () => {
    try {
      const data = await fetchPostReports();
      const reportsWithStatus = data.map((report: PostReport) => ({
        ...report,
        status: report.is_deleted ? 'deleted' : report.status || 'pending'
      }));
      setReports(reportsWithStatus);
    } catch (err) {
      setError('신고 내역을 불러오는데 실패했습니다.');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleKeep = async (post_idx: number) => {
    if (isDeleting) return;

    showModalHandler(
      'choice',
      '동영상을 유지하시겠습니까?',
      async () => {
        try {
          await keepPostData(post_idx);
          setReports(prevReports =>
            prevReports.map(report =>
              report.post_idx === post_idx
                ? { ...report, status: 'confirmed' }
                : report
            )
          );
          showModalHandler('alert', '동영상이 유지되었습니다.');
        } catch (error) {
          showModalHandler('alert', '처리에 실패했습니다.');
        }
      }
    );
  };

  const handleDelete = async (post_idx: number) => {
    if (isDeleting) return;

    const deletePost = async () => {
      try {
        setIsDeleting(true);
        await deletePostData(post_idx);
        await fetchReports();
        showModalHandler('alert', '동영상이 삭제되었습니다.');
      } catch (error) {
        showModalHandler('alert', '동영상 삭제에 실패했습니다.');
      } finally {
        setIsDeleting(false);
      }
    };
    
    showModalHandler(
      'choice',
      '동영상을 삭제하시겠습니까?',
      deletePost
    );
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredReports = reports.filter(report => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return !report.is_deleted && report.status !== 'confirmed';
    if (statusFilter === 'deleted') return report.is_deleted;
    if (statusFilter === 'confirmed') return report.status === 'confirmed';
    return true;
  });

  const handleKeptStatusClick = (post_idx: number) => {
    showModalHandler(
      'choice',
      '처리대기 상태로 변경하시겠습니까?',
      async () => {
        try {
          await resetPostStatus(post_idx);
          setReports(prevReports =>
            prevReports.map(report =>
              report.post_idx === post_idx
                ? { ...report, status: 'pending' }
                : report
            )
          );
          showModalHandler('alert', '처리대기 상태로 변경되었습니다.');
        } catch (error) {
          showModalHandler('alert', '상태 변경에 실패했습니다.');
        }
      }
    );
  };

  const formatCategory = (category: string) => {
    const categoryMap = {
      'violence_hate': '폭력/혐오',
      'sexual': '성적인 콘텐츠',
      'ad_spam': '광고/스팸',
      'other': '기타'
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  if (error) {
    return <div className={cn('error')}>{error}</div>;
  }

const handlePostClick = (post_idx: number, gym_idx: number, is_deleted: boolean) => {
  if (!is_deleted) {
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  }
};

  return (
    <div className={cn('container')}>
      <div className={cn('status-filter')}>
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">전체</option>
          <option value="pending">처리대기</option>
          <option value="deleted">삭제</option>
          <option value="confirmed">유지</option>
        </select>
      </div>
      <table className={cn('table')}>
        <thead>
          <tr>
            <th className={cn('report-count')}>신고 횟수</th>
            <th className={cn('post-idx')}>동영상 (post_idx)</th>
            <th className={cn('reported-user')}>피신고자 (user_idx)</th>
            <th className={cn('author')}>신고자 (user_idx)</th>
            <th className={cn('report-content')}>신고내용 (신고분류)</th>
            <th className={cn('status')}>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={index}>
              <td className={cn('report-count')}>{report.report_count}</td>
<td className={cn('post-idx')}>
  {report.is_deleted ? (
    <span>{`${report.post_idx}`}</span>
  ) : (
    <span 
      className={cn('post-link')}
      onClick={() => handlePostClick(report.post_idx, report.gym_idx, report.is_deleted)}
    >
      {`${report.post_idx}`}
    </span>
  )}
</td>
              <td className={cn('reported-user')}>
                {`${report.reported_nickname} (${report.reported_user_idx})`}
              </td>
              <td className={cn('author')}>
                {`${report.reporter_nickname} (${report.reporter_user_idx})`}
              </td>
              <td className={cn('report-content')}>
                {`${report.content || '내용 없음'} (${formatCategory(report.category)})`}
              </td>
              <td className={cn('status')}>
                {report.is_deleted ? (
                  '삭제됨'
                ) : report.status === 'confirmed' ? (
                  <span 
                    className={cn('status-text', 'kept')}
                    onClick={() => handleKeptStatusClick(report.post_idx)}
                  >
                    문제없음
                  </span>
                ) : (
                  <div className={cn('actionWrapper')}>
                    <span 
                      className={cn('actionText', 'keep')}
                      onClick={() => handleKeep(report.post_idx)}
                    >
                      유지
                    </span>
                    <span 
                      className={cn('actionText', 'delete')}
                      onClick={() => handleDelete(report.post_idx)}
                    >
                      삭제
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalChoice/>
    </div>
  );
};

export default PostPage;