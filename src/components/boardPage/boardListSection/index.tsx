'use client';
import styles from './boardListSection.module.scss';
import classNames from 'classnames/bind';
import BoardLists from '@/src/components/boardPage/boardLists';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { BoardResponseType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import { boardListGetDatas } from '@/src/app/(main)/board/api';

const cn = classNames.bind(styles);

type BoardListSectionProps = {
  searchName: string;
  selectSortOption: string;
  selectCategory: string;
};

const BoardListSection = ({
  searchName,
  selectSortOption,
  selectCategory,
}: BoardListSectionProps) => {
  const router = useRouter();
  const { showModalHandler } = useModal();
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

  const uploadClick = () => {
    if (myId === null) {
      showModalHandler('alert', '로그인 후 이용해 주세요', () =>
        router.push('/signin'),
      );
      return;
    }
    router.push('/board/upload');
  };

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <>
      {boardData.length === 0 ? (
        <></>
      ) : (
        <>
          <BoardLists lists={boardData} />
          <div ref={ref} />
        </>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
};

export default BoardListSection;
