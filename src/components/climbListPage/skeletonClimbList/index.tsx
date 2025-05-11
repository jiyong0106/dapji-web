import classNames from 'classnames/bind';
import styles from './skeletonClimbList.module.scss';

const cn = classNames.bind(styles);

const SkeletonClimbList = () => {
  const placeholders = Array.from({ length: 20 });

  return (
    <div className={cn('container')}>
      {placeholders.map((_, idx) => (
        <div key={idx} className={cn('card')}>
          <div className={cn('imageWrapper')} />
          <div className={cn('textWrapper')}>
            <div className={cn('line', 'title')} />
            <div className={cn('line', 'address')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonClimbList;
