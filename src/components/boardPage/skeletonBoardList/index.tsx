import classNames from 'classnames/bind';
import styles from './skeletonBoardList.module.scss';

const cn = classNames.bind(styles);

const SkeletonBoardList = () => {
  const placeholders = Array.from({ length: 7 });

  return (
    <div className={cn('container')}>
      {placeholders.map((_, idx) => (
        <div key={idx} className={cn('mainWrapper')}>
          <div className={cn('leftSection')}>
            <div className={cn('profile')}>
              <div className={cn('profileImage')} />
              <div className={cn('textInfo')}>
                <div className={cn('nickname')} />
                <div className={cn('date')} />
              </div>
            </div>
            <div className={cn('title')} />
            <div className={cn('content')} />
          </div>
          <div className={cn('rightSection')}>
            <div className={cn('boardImage')} />
            <div className={cn('iconWrapper')}>
              <div className={cn('icon')} />
              <div className={cn('icon')} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonBoardList;
