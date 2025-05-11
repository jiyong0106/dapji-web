'use client';
import styles from './clientBoardList.module.scss';
import classNames from 'classnames/bind';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import {
  categoryListData,
  sortOptionCategories,
} from '@/src/utils/categoryListDatas';
import { useState } from 'react';
import SearchBar from '@/src/components/common/searchBar';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import BoardListSection from '../boardListSection';

const cn = classNames.bind(styles);

const ClientBoardList = () => {
  const { myId } = useMyInfoStore();

  const [searchName, setSearchName] = useState('');
  const [selectSortOption, setSelectSortOption] = useState('recent');
  const [selectCategory, setSelectCategory] = useState('전체');

  const filteredSortOptionCategories = sortOptionCategories.filter(
    (item) => !(item.option === 'myBoards' && !myId),
  );

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <SearchBar
          placeholder="게시글을 검색해 보세요"
          searchName={searchName}
          onSearchChange={setSearchName}
        />
        <CategoryLists
          lists={filteredSortOptionCategories}
          selectCategory={selectSortOption}
          onCategorySelect={setSelectSortOption}
        />
        <CategoryLists
          lists={categoryListData}
          selectCategory={selectCategory}
          onCategorySelect={setSelectCategory}
        />
      </div>
      <BoardListSection
        searchName={searchName}
        selectSortOption={selectSortOption}
        selectCategory={selectCategory}
      />
    </div>
  );
};

export default ClientBoardList;
