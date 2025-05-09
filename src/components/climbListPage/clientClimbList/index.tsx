// 'use client';
// import SearchBar from '@/src/components/common/searchBar';
// import classNames from 'classnames/bind';
// import styles from './ClimbListPage.module.scss';
// import CardListData from '@/src/components/climbListPage/cardListData';
// import { ClimbListDatas } from '@/src/app/(main)/gym/api';
// import { ClimbLIstResponseType } from '@/src/utils/type';
// import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
// import { useState } from 'react';
// import LoadingSpinner from '@/src/components/common/loadingSpinner';
// import CategoryLists from '@/src/components/boardPage/categroyLists';
// import { favoritecategoryListData } from '@/src/utils/categoryListDatas';

// const cn = classNames.bind(styles);

// const ClimbListPage = () => {
// const [searchName, setSearchName] = useState('');
// const [selectSort, setSelectSort] = useState('latest');
// const {
//   data: climbListData,
//   ref,
//   isFetchingNextPage,
//   isLoading,
// } = useInfiniteScroll<ClimbLIstResponseType>({
//   queryKey: ['climbList', searchName, selectSort],
//   fetchFunction: (page = 1) =>
//     ClimbListDatas({
//       page,
//       search: searchName,
//       sort: selectSort,
//     }),

//   getNextPageParam: (lastPage) =>
//     lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
//   staleTime: 60 * 1000,
// });

// const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

// const handleSearchChange = (value: string) => {
//   setSearchName(value);
// };

// const handleSelectCategory = (sort: string) => {
//   setSelectSort(sort);
// };

// if (isLoading) {
//   return <LoadingSpinner />;
// }

// return (
//   <div className={cn('container')}>
//     <div className={cn('header')}>
//       <SearchBar
//         placeholder="클라이밍장을 검색해 보세요"
//         searchName={searchName}
//         onSearchChange={handleSearchChange}
//       />
//       <CategoryLists
//         lists={favoritecategoryListData}
//         selectCategory={selectSort}
//         onCategorySelect={handleSelectCategory}
//       />
//     </div>
//     {lists.length === 0 ? (
//       <p className={cn('noSearchData')}>검색 결과가 없습니다</p>
//     ) : (
//       <>
//         <CardListData lists={lists} />
//         <div ref={ref} />
//       </>
//     )}
//     {isFetchingNextPage && <LoadingSpinner />}
//   </div>
// );
// };

// export default ClimbListPage;

'use client';
import { GymsType } from '@/src/utils/type';
import React from 'react';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './clientClimbList.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { ClimbListDatas } from '@/src/app/(main)/gym/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { favoritecategoryListData } from '@/src/utils/categoryListDatas';

const cn = classNames.bind(styles);

type ClientClimbListProps = {
  initialData: GymsType;
};

const ClientClimbList = ({ initialData }: ClientClimbListProps) => {
  const [searchName, setSearchName] = useState('');
  const [selectSort, setSelectSort] = useState('latest');
  const {
    data: climbListData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<ClimbLIstResponseType>({
    queryKey: ['climbList', searchName, selectSort],
    fetchFunction: (page = 1) =>
      ClimbListDatas({
        page,
        search: searchName,
        sort: selectSort,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 60 * 1000,
  });

  const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  const handleSelectCategory = (sort: string) => {
    setSelectSort(sort);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <SearchBar
          placeholder="클라이밍장을 검색해 보세요"
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />
        <CategoryLists
          lists={favoritecategoryListData}
          selectCategory={selectSort}
          onCategorySelect={handleSelectCategory}
        />
      </div>
      {lists.length === 0 ? (
        <p className={cn('noSearchData')}>검색 결과가 없습니다</p>
      ) : (
        <>
          <CardListData lists={lists} />
          <div ref={ref} />
        </>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClientClimbList;
