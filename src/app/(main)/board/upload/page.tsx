import styles from './uploadPage.module.scss';
import classNames from 'classnames/bind';
import BoardUploadForm from '@/src/components/boardUploadPage/boardUploadForm';

const cn = classNames.bind(styles);

type BoardUploadPageProsp = {
  params: {
    boardId: string;
  };
};

const BoardUploadPage = ({ params }: BoardUploadPageProsp) => {
  return (
    <div className={cn('container')}>
      <BoardUploadForm params={params} />
    </div>
  );
};

export default BoardUploadPage;
