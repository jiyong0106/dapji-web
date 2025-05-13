import styles from './skeletonGymDetail.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const SkeletonGymDetail = () => {
  const placeholders = Array.from({ length: 2 });

  return (
    <div className={cn('container')}>
      {placeholders.map((_, idx) => (
        <div key={idx} className={cn('mainWrapper')}>
          <div className={cn('header')}>
            <div className={cn('image')} />
            <div className={cn('nickname')} />
          </div>

          <div className={cn('video')} />

          <div className={cn('footer')}>
            <div className={cn('meta')} />
            <div className={cn('description')} />
            <div className={cn('date')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGymDetail;
