'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import {
  categoryListData,
  sortOptionCategories,
} from '@/src/utils/categoryListDatas';
import { useState } from 'react';
import BoardLists from '@/src/components/boardPage/boardLists';
import SearchBar from '@/src/components/common/searchBar';
import { boardListGetDatas } from './api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { BoardResponseType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState('전체');
  const [selectSortOption, setSelectSortOption] = useState('recent');
  const [searchName, setSearchName] = useState('');
  const { myId } = useMyInfoStore();
  const {
    data: boardListGetData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<BoardResponseType>({
    queryKey: ['boardListData', selectCategory, searchName, selectSortOption],
    fetchFunction: (page = 1) =>
      boardListGetDatas({
        page,
        search: searchName,
        category: selectCategory,
        sortOption: selectSortOption,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 60 * 1000,
  });

  const boardData =
    boardListGetData?.pages.flatMap((page) => page.boards) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  const filteredSortOptionCategories = sortOptionCategories.filter(
    (item) => !(item.option === 'myBoards' && !myId),
  );
  const handleSelectSortCategory = (sortOption: string) => {
    setSelectSortOption(sortOption);
  };

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <SearchBar
        placeholder="게시글을 검색해 보세요"
        searchName={searchName}
        onSearchChange={handleSearchChange}
      />
      <CategoryLists
        lists={filteredSortOptionCategories}
        selectCategory={selectSortOption}
        onCategorySelect={handleSelectSortCategory}
      />
      <CategoryLists
        lists={categoryListData}
        selectCategory={selectCategory}
        onCategorySelect={handleSelectCategory}
      />
      {boardData.length === 0 ? (
        <></>
      ) : (
        <>
          <BoardLists lists={boardData} />
          <div ref={ref} />
        </>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default BoardPage;
