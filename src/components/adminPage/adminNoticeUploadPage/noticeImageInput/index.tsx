import { useState } from 'react';
import styles from './noticeImageInput.module.scss';
import classNames from 'classnames/bind';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import instance from '@/src/utils/axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

type NoiceImageInputProps = {
  fileUrl: string[];
  setFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
  setDeleteUrl: React.Dispatch<React.SetStateAction<string[]>>;
};

const NoiceImageInput = ({
  fileUrl,
  setFileUrl,
  setDeleteUrl,
}: NoiceImageInputProps) => {
  const [progress, setProgress] = useState(0);
  const { showModalHandler } = useModal();
  const { mutate: noticeImageUpload, isPending } = useMutation({
    mutationKey: ['noticeImageUpload'],
    mutationFn: async (image: FormData) => {
      const res = await instance.post(`/images/notice-image`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentCompleted);
          }
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      // 서버에서 받은 최종 URL을 미리보기 URL과 대체
      setFileUrl((prev) =>
        Array.isArray(prev)
          ? [...prev, ...data.imageUrls]
          : [...data.imageUrls],
      );
    },
    onError: (e) => {
      console.log('공지 이미지 업로드 에러');
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('image', file); // 각 파일을 FormData에 추가
      });

      // 서버로 파일 업로드 요청
      noticeImageUpload(formData);
    }
  };

  const handleRemoveImage = (index: number) => {
    setDeleteUrl((prev: string[]) => [...prev, fileUrl[index]]);
    setFileUrl((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  if (isPending) {
    return (
      <div style={{ width: '100px', marginTop: '10px' }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    );
  }
  return (
    <div className={cn('container')}>
      <label htmlFor="noticeImageFile" className={cn('noticeUploadLabel')}>
        <PlusIcon />
      </label>
      <input
        type="file"
        id="noticeImageFile"
        multiple
        accept="image/*"
        className={cn('noticeImageInput')}
        onChange={handleFileUpload}
      />
      <div className={styles.uploadInput}>
        {fileUrl?.map((url: string, index: number) => (
          <div key={index} className={cn('imageBox')}>
            <CircleXIcon
              className={cn('close')}
              onClick={() => handleRemoveImage(index)}
            />
            <Image
              src={url}
              width="50"
              height="50"
              alt="게시물 이미지"
              className={cn('noticeImage')}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoiceImageInput;
