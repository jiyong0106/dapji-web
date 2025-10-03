import classNames from 'classnames/bind';
import styles from './holdColor.module.scss';
import { CheckIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type HolderColorProps = {
  color: string;
  onClick: () => void;
  active: boolean;
};

const colorLabelMap: Record<string, string> = {
  red: '빨강',
  orange: '주황',
  yellow: '노랑',
  green: '초록',
  blue: '파랑',
  indigo: '남색',
  purple: '보라',
  white: '흰색',
  gray: '회색',
  black: '검정',
  pink: '분홍',
  brown: '갈색',
};

const HolderColor = ({ color, onClick, active }: HolderColorProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 새로고침 동작 방지
    onClick(); // 클릭 시 필터링 처리
  };

  return (
    <button
      type="button"
      className={cn('chip', { active })}
      onClick={handleClick}
      aria-pressed={active}
    >
      <span className={cn('dot', `color-${color}`)} />
      <span className={cn('label')}>{colorLabelMap[color] ?? color}</span>
      {active && <CheckIcon className={cn('checkIcon')} />}
    </button>
  );
};

export default HolderColor;
