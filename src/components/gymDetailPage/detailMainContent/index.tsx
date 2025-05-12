'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { RightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { PostDetailType } from '@/src/utils/type';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import LikeAction from '@/src/components/common/likeAction';

import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '@/src/components/common/commentCount';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchRenderSingleVideo } from '@/src/app/(main)/gym/api';
import { useState } from 'react';

const cn = classNames.bind(styles);

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    opacity: 0.5;
    padding: 0;
  }

  .slick-center {
    opacity: 1 !important;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
`;

export type DetailMainContentProps = {
  list: PostDetailType;
  gymName: string;
};

const DetailMainContent = ({ list, gymName }: DetailMainContentProps) => {
  const {
    color,
    User,
    clearday,
    content,
    post_idx,
    gym_idx,
    user_idx,
    createdAt,
    like_count,
    is_like,
    post_comment,
    post_comment_count,
    thumbnailUrl,
  } = list;

  //리스트 데이터들

  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const {
    data: currentVideoUrl, // 서버에서 받아온 동영상 URL
  } = useQuery({
    queryKey: ['singleVideoDatasKey', post_idx, currentIndex],
    queryFn: () => fetchRenderSingleVideo(post_idx, currentIndex),
    staleTime: 5 * 60 * 1000, // 5분
  });

  const timeAgo = useTimeAgo(createdAt);
  const cleartimeAgo = useTimeAgo(clearday);

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'posts',
    content_id: post_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'climbPost',
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    draggable: true,
    afterChange: (current: number) => {
      setCurrentIndex(current); // 슬라이더 인덱스 업데이트
      setIsVideoReady(false);
    },
  };
  //슬라이드 세팅
  const router = useRouter();

  const postDetailPage = () => {
    router.push(`/gym/${gym_idx}/${post_idx}`);
  };
  // 영상 상세 페이지 이동

  const deleteT = (date: string | null) => date?.split('T')[0];
  // 시간 가공

  const profileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${user_idx}`);
  };
  // 프로필 클릭

  return (
    <div className={cn('container')}>
      <div className={cn('userWrapper')}>
        <div className={cn('userInfo')} onClick={profileClick}>
          <Image
            src={User.img || '/icon/blueicon.png'}
            width="30"
            height="30"
            alt="userImg"
          />
          <div className={cn('dateWrapper')}>
            <span>{User?.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <RightArrowIcon width="15" height="15" onClick={postDetailPage} />
      </div>

      <div className={cn('videoWrapper')}>
        <StyledSlider {...settings}>
          {thumbnailUrl?.map((url, index) => (
            <div
              key={index}
              className={cn('videoBox')}
              style={{ position: 'relative' }}
            >
              {/* 현재 인덱스에 맞는 썸네일만 표시 */}
              {index === currentIndex && !isVideoReady && (
                <Image
                  src={url}
                  alt={`Thumbnail ${index}`}
                  width={900}
                  height={600}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    opacity: 1,
                  }}
                />
              )}
              <video
                src={currentVideoUrl}
                autoPlay
                muted
                playsInline
                onCanPlay={() => setIsVideoReady(true)} // 비디오 준비 상태 업데이트
                controls
                controlsList="nodownload"
              />
            </div>
          ))}
        </StyledSlider>
      </div>

      <div className={cn('contentWrapper')} onClick={postDetailPage}>
        <div className={cn('iconWrapper')}>
          <LikeAction
            likeToggle={likeToggle}
            likeCount={likeCount}
            onClick={handleLikeClick}
          />
          <CommentCount count={post_comment_count} />
        </div>
        <div className={cn('clearday')}>
          <div className={cn('difficultyWrapper')}>
            <span>{gymName} | </span>
            <span>난이도</span>
            <div className={cn('color', `color-${color}`)} />
          </div>

          <span>
            등반일 : {deleteT(clearday)} (
            {new Date(clearday).toDateString() === new Date().toDateString()
              ? '오늘'
              : cleartimeAgo}
            )
          </span>
        </div>
      </div>
      {content && <pre>{content}</pre>}
      {post_comment[0]?.content && (
        <div className={cn('commentWrapper')}>
          <span className={cn('allComment')}>
            <Link
              href={`/gym/${gym_idx}/${post_idx}`}
              style={{ textDecoration: 'none', color: 'gray' }}
            >
              댓글 모두 보기
            </Link>
          </span>
          <div className={cn('comment')}>
            <span>{post_comment[0].User?.nickname}</span>
            <span>{post_comment[0].content}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export type DetailMainContentListProps = {
  lists: PostDetailType[];
  gymName: string;
};

const DetailMainContentList = ({
  lists,
  gymName,
}: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {lists?.map((list: PostDetailType) => (
        <DetailMainContent key={list.post_idx} list={list} gymName={gymName} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
