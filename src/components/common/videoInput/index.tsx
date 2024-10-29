// front/src/components/videoInput/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    opacity: 0.5;
    padding: 0 15px;
  }

  .slick-center {
    opacity: 1 !important;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
`;

type VideoInputProps = {
  mediaFiles: File[];
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const VideoInput = ({ mediaFiles, setMediaFiles }: VideoInputProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { showModalHandler } = useModal();

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
  };

  useEffect(() => {
    // Blob URL 생성
    const urls = mediaFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // 컴포넌트 언마운트 시 Blob URL 해제
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaFiles]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 500 * 1024 * 1024;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      // 최대 10개의 동영상만 허용
      if (mediaFiles.length + fileArray.length > 10) {
        showModalHandler('alert', '최대 10개까지 업로드가 가능해요.');
        return;
      }

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        if (file.size > maxSize) {
          showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요');
          return;
        }
      }

      // 선택한 파일들을 상태에 저장
      setMediaFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleRemoveVideo = (index: number) => {
    // 선택한 동영상 제거 및 Blob URL 해제
    URL.revokeObjectURL(previewUrls[index]); // 미리보기 URL 해제
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('container')}>
      {mediaFiles.length === 10 ? (
        <span className={cn('maxVideo')}>최대 10개까지 업로드가 가능해요</span>
      ) : (
        <>
          <label htmlFor="fileUpload">
            <PlusIcon />
          </label>
          <input
            type="file"
            id="fileUpload"
            className={cn('filetextInput')}
            multiple
            accept="video/*"
            onChange={handleFileUpload}
          />
        </>
      )}
      <div className={styles.uploadInput}>
        <div className={cn('videoWrapper')}>
          <StyledSlider {...settings}>
            {previewUrls.map((url, index) => (
              <div key={index} className={cn('videoBox')}>
                <CircleXIcon
                  className={cn('close')}
                  onClick={() => handleRemoveVideo(index)}
                />
                <video
                  src={url}
                  controls
                  playsInline
                  muted
                  controlsList="nodownload"
                  className={cn('video')}
                />
              </div>
            ))}
          </StyledSlider>
        </div>
      </div>
    </div>
  );
};

export default VideoInput;
