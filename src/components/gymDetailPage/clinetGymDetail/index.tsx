'use client';

import classNames from 'classnames/bind';
import styles from './clinetGymDetail.module.scss';
import { useState } from 'react';
import HoldColorList from '../holdColorList';
import GymDetailSection from '../gymDetailSection';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { gymId: string };
};

const ClinetGymDetail = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  //로딩중 들어가야할 것
  return (
    <div className={cn('container')}>
      <HoldColorList
        type="list"
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <GymDetailSection params={params} activeColor={activeColor} />
    </div>
  );
};

export default ClinetGymDetail;
