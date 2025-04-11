import classNames from 'classnames/bind';
import styles from './holdColorList.module.scss';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';
import { useState } from 'react';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type HoldColorListProps = {
  activeColor?: string | null;
  setActiveColor: React.Dispatch<React.SetStateAction<string | null>>;
  type: 'submit' | 'list';
};

const HoldColorList = ({
  activeColor,
  setActiveColor,
  type,
}: HoldColorListProps) => {
  // 빨, 주, 노, 초, 파, 남, 보, 흰, 회, 검, 분, 갈
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'gray',
    'black',
    'white',
    'pink',
    'brown',
  ];

  // 박스를 보여줄지 여부를 관리하는 상태

  const activeClick = (color: string) => {
    setActiveColor((prev: string | null) => (prev === color ? null : color));
  };

  const renderColors = () => (
    <div className={cn('innerContainer')}>
      {colors.map((color: string, index: number) => (
        <HolderColor
          key={index}
          color={color}
          active={color === activeColor}
          onClick={() => activeClick(color)}
        />
      ))}
    </div>
  );

  return (
    <div className={cn('outerContainer')}>
      <p className={cn('holdText')}>난이도</p>
      {renderColors()}
    </div>
  );
};

export default HoldColorList;
