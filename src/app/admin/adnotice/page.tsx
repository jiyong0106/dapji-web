'use client';
import classNames from 'classnames/bind';
import styles from './adNoticePage.module.scss';
import { useRouter } from 'next/navigation';
import ModalChoice from '@/src/components/common/moadlChoice';
import { fetchadNoticeData, deleteOfficialNoticeData } from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OfficialnoticeType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

const AdNoticePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  const {
    data: officialnoitceDatas,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<OfficialnoticeType>({
    queryKey: ['officialnoitceDatasKey'],
    fetchFunction: (page = 1) => fetchadNoticeData({ page }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const noitceDatas =
    officialnoitceDatas?.pages.flatMap((page) => page.notices) ?? [];
  const noitceId = noitceDatas.flatMap((item) => item.notice_idx) ?? [];

  const { mutate: deletenotice } = useMutation({
    mutationKey: ['officialnoitcedeleteKey'],
    mutationFn: (noitceId: number) => deleteOfficialNoticeData(noitceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officialnoitceDatasKey'] });
    },
  });

  const adNoticedelteClick = (noticeId: number) => {
    showModalHandler('choice', '공지 삭제?', () => deletenotice(noticeId));
  };

  const adNoticeUploadPage = () => {
    router.push('/admin/adnotice/upload');
  };

  return (
    <div className={cn('container')}>
      <div className={cn('hedaer')}>
        <div className={cn('status-filter')}></div>
        <div className={cn('upload')} onClick={adNoticeUploadPage}>
          공지 업로드
        </div>
      </div>
      <table className={cn('table')}>
        <thead>
          <tr>
            <th className={cn('noticeId')}>공지Id</th>
            <th className={cn('noticeTitle')}>공지 타이틀</th>
            <th className={cn('noticeContent')}>공지 내용</th>
            <th className={cn('status')}> 상태</th>
          </tr>
        </thead>

        <tbody>
          {noitceDatas.map((notice) => (
            <tr key={notice.notice_idx}>
              <td
                className={cn('noticeId')}
                onClick={() =>
                  router.push(`/officialnotice/${notice.notice_idx}`)
                }
              >
                <span className={cn('noticeIdText')}>{notice.notice_idx}</span>
              </td>
              <td className={cn('noticeTitle')}>{notice.title}</td>
              <td className={cn('noticeContent')}>{notice.content[0].value}</td>
              <td className={cn('status')}>
                <div className={cn('actionWrapper')}>
                  <span
                    className={cn('actionText', 'keep')}
                    onClick={() =>
                      router.push(`/admin/adnotice/${notice.notice_idx}/edit`)
                    }
                  >
                    수정
                  </span>
                  <span
                    className={cn('actionText', 'delete')}
                    onClick={() => adNoticedelteClick(notice.notice_idx)}
                  >
                    삭제
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
      <ModalChoice />
    </div>
  );
};

export default AdNoticePage;
