'use client';
import classNames from 'classnames/bind';
import styles from './admin.module.scss';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const AdminPage = () => {
  const router = useRouter();

  const pageClick = (page: string) => {
    router.push(`${page}`);
  };

  return (
    <div className={cn('container')}>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => pageClick('/admin/adnotice')}
      >
        답지 공지 관리
      </h3>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => pageClick('/admin/list')}
      >
        클라이밍장 리스트 관리
      </h3>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => pageClick('/admin/board')}
      >
        자유게시판 신고 관리
      </h3>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => pageClick('/admin/post')}
      >
        동영상 신고 관리
      </h3>
      <h3>유저 관리</h3>
    </div>
  );
};

export default AdminPage;
