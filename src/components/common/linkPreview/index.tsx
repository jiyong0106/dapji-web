import styles from './linkPreview.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import useTruncateString from '@/src/hooks/useTruncateString';
import { PreviewType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type LinkPreviewProps = {
  previews: PreviewType[];
  singlePreview?: boolean;
};

const LinkPreview = ({ previews, singlePreview = false }: LinkPreviewProps) => {
  const truncateString = useTruncateString();

  const urlClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (!previews || previews.length === 0) return null;

  const previewsToRender = singlePreview ? [previews[0]] : previews;

  return (
    <div className={cn('linkPreviewWrapper')}>
      {previewsToRender.map((preview, idx) => (
        <div
          key={idx}
          className={cn('linkPreview')}
          onClick={() => urlClick(preview.url)}
        >
          <Image
            src={process.env.NEXT_PUBLIC_URL + '/icon/widelogo.png'}
            alt="링크 미리보기"
            height="50"
            width="50"
            className={cn('linkPreviewImage')}
          />
          <div className={cn('linkContentWrapper')}>
            <p>{truncateString(preview.title || '', 10)}</p>
            <span>{truncateString(preview.description || '', 20)}</span>
            <span>{truncateString(preview.url || '', 30)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkPreview;
