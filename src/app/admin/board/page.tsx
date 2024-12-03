'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './adminBoard.module.scss';
import { fetchBoardReports, deleteBoardData } from './api';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

interface BoardReport {
 board_idx: number;
 reporter_user_idx: number;
 reporter_nickname: string;
 reported_user_idx: number;
 reported_nickname: string;
 content: string | null;
 category: 'violence_hate' | 'sexual' | 'ad_spam' | 'other';
 createdAt: string;
 board_title: string;
 report_count: number;
 is_deleted: boolean;
 status?: 'pending' | 'deleted' | 'kept';
}

const BoardPage = () => {
 const router = useRouter();
 const [reports, setReports] = useState<BoardReport[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState(false);
 const { showModalHandler } = useModal();

 const fetchReports = async () => {
   try {
     const data = await fetchBoardReports();
     setReports(data);
   } catch (err) {
     setError('신고 내역을 불러오는데 실패했습니다.');
     console.error('Error:', err);
   }
 };

 useEffect(() => {
   fetchReports();
 }, []);

 const handleKeep = async (board_idx: number) => {
   if (isDeleting) return;

   showModalHandler(
     'choice',
     '게시글을 유지하시겠습니까?',
     async () => {
       try {
         setReports(prevReports =>
           prevReports.map(report =>
             report.board_idx === board_idx
               ? { ...report, status: 'kept' }
               : report
           )
         );
         showModalHandler('alert', '게시글이 유지되었습니다.');
       } catch (error) {
         showModalHandler('alert', '처리에 실패했습니다.');
       }
     }
   );
 };

 const handleDelete = async (board_idx: number) => {
   if (isDeleting) return;

   const deleteBoard = async () => {
     try {
       setIsDeleting(true);
       await deleteBoardData(board_idx);
       await fetchReports(); // 삭제 후 목록 새로고침
       showModalHandler('alert', '게시글이 삭제되었습니다.');
     } catch (error) {
       showModalHandler('alert', '게시글 삭제에 실패했습니다.');
     } finally {
       setIsDeleting(false);
     }
   };
   
   showModalHandler(
     'choice',
     '게시글을 삭제하시겠습니까?',
     deleteBoard
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

 const handleBoardClick = (board_idx: number, is_deleted: boolean) => {
   if (!is_deleted) {
     router.push(`/board/${board_idx}`);
   }
 };

 return (
   <div className={cn('container')}>
     <table className={cn('table')}>
       <thead>
         <tr>
           <th className={cn('report-count')}>신고 횟수</th>
           <th className={cn('board-title')}>게시글 제목 (board_idx)</th>
           <th className={cn('reported-user')}>피신고자 (user_idx)</th>
           <th className={cn('author')}>신고자 (user_idx)</th>
           <th className={cn('report-content')}>신고내용 (신고분류)</th>
           <th className={cn('status')}>처리 상태</th>
         </tr>
       </thead>
       <tbody>
         {reports.map((report, index) => (
           <tr key={index}>
             <td className={cn('report-count')}>{report.report_count}</td>
             <td className={cn('board-title')}>
               {report.is_deleted ? (
                 <span>{`${report.board_title} (${report.board_idx})`}</span>
               ) : (
                 <span 
                   className={cn('board-link')}
                   onClick={() => handleBoardClick(report.board_idx, report.is_deleted)}
                 >
                   {`${report.board_title} (${report.board_idx})`}
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
               ) : report.status === 'kept' ? (
                 '문제없음'
               ) : (
                 <div className={cn('actionWrapper')}>
                   <span 
                     className={cn('actionText', 'keep')}
                     onClick={() => handleKeep(report.board_idx)}
                   >
                     유지
                   </span>
                   <span 
                     className={cn('actionText', 'delete')}
                     onClick={() => handleDelete(report.board_idx)}
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

export default BoardPage;