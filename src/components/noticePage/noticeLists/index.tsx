import classNames from 'classnames/bind';
import styles from './noticeLists.module.scss';
import LinkifyText from '@/src/hooks/useLinkifyText';
import { noticeDataType } from '@/src/utils/type';
import Image from 'next/image';
const cn = classNames.bind(styles);

type NoticeListProps = {
  noticeDatas: noticeDataType;
};

const NoticeLists = ({ noticeDatas }: NoticeListProps) => {
  const { title, content, createdAt, img } = noticeDatas;
  const deleteT = (date: string | null) => date?.split('T')[0];
  return (
    <div className={cn('container')}>
      <header>
        <span>{deleteT(createdAt)}</span>
        <h1>{title}</h1>
      </header>
      <pre className={cn('contentWrapper')}>
        <LinkifyText text={content} />
      </pre>
      {img?.length > 0 &&
        img.map((image, index) => (
          <Image
            key={index}
            src={image || process.env.NEXT_PUBLIC_URL + '/icon/blueicon.png'}
            width={100}
            height={100}
            alt={`게시물 이미지 ${index + 1}`}
            className={cn('boardImage')}
            priority
          />
        ))}
    </div>
  );
};

export default NoticeLists;
