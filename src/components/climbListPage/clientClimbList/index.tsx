'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './clientClimbList.module.scss';
import SearchBar from '@/src/components/common/searchBar';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { favoritecategoryListData } from '@/src/utils/categoryListDatas';
import ClimbListSection from '../climbListSection';

const cn = classNames.bind(styles);

const ClientClimbList = () => {
  const [searchName, setSearchName] = useState('');
  const [selectSort, setSelectSort] = useState('latest');

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <SearchBar
          placeholder="클라이밍장을 검색해 보세요"
          searchName={searchName}
          onSearchChange={setSearchName}
        />
        <CategoryLists
          lists={favoritecategoryListData}
          selectCategory={selectSort}
          onCategorySelect={setSelectSort}
        />
      </div>

      {/* 여기서만 리스트 관련 로직이 재렌더링 */}
      <ClimbListSection searchName={searchName} selectSort={selectSort} />
    </div>
  );
};

export default ClientClimbList;
