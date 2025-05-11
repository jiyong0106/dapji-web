import React from 'react';
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import SidebarItems from '../sidebarItems';
import {
  pageMenuItems,
  bottomMenuItems,
} from '@/src/utils/options/sidebarOptions';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

const SideBar = () => {
  const { myId } = useMyInfoStore();

  return (
    <div className={cn('container')}>
      <nav>
        {pageMenuItems(myId).map((item) => (
          <SidebarItems key={item.label} {...item} />
        ))}
      </nav>
      <div className={cn('divider')} />
      <nav>
        {bottomMenuItems.map((item) => (
          <SidebarItems key={item.label} {...item} />
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
