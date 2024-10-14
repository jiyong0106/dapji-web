import styles from './noDetailData.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const NodetailData = () => {
  return (
    <div className={cn('container')}>
      <span>아직 답지가 없네요!</span>
      <span> 회원님의 답지를 공유해보세요💡</span>
    </div>
  );
};

export default NodetailData;
