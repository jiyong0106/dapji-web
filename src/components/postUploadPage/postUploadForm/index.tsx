// src/components/postUploadPage/postUploadForm/index.tsx
import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import VideoInput from '@/src/components/common/videoInput';
import React, { useState, useEffect } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
import { useFormPostUploadProps, PostDetailDataType } from '@/src/utils/type';
import {
  useDetailUploadDatas,
  usePostDetailUpdate,
  useVideoUpload,
} from '@/src/app/climbList/api';
import CommonButton from '../../common/commonButton';
import { useModal } from '@/src/hooks/useModal';
import LoadingSpinner from '../../common/loadingSpinner';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string;
  initialData?: PostDetailDataType;
};

const PostUploadForm = ({ gymId, initialData }: PostUploadFormProps) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [activeColor, setActiveColor] = useState<string | null>(
    initialData?.color || null,
  );
  const { showModalHandler, closeModal } = useModal();

  const maxLength = 100;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<useFormPostUploadProps>({
    defaultValues: {
      ...initialData,
    },
  });
  const text = watch('content', '');

  const { mutate: detailUploadDatas, isPending } = useDetailUploadDatas(gymId);
  const { mutate: postDetailUpdate } = usePostDetailUpdate(
    String(initialData?.post_idx),
    String(gymId),
  );
  const { mutate: videoUpload, isPending: isUploading } = useVideoUpload();

  const onSubmit = (data: useFormPostUploadProps) => {
    if (!activeColor) {
      showModalHandler('alert', '난이도를 선택해 주세요.');
      return;
    }
    if (mediaFiles.length === 0 && !initialData) {
      showModalHandler('alert', '동영상을 업로드해 주세요.');
      return;
    }

    const message = initialData
      ? '답지를 수정 하시나요?'
      : '답지를 업로드 하시나요?';

    showModalHandler('choice', message, () => {
      if (mediaFiles.length > 0) {
        // 동영상 업로드를 위한 FormData 생성
        const formData = new FormData();
        mediaFiles.forEach((file) => {
          formData.append('videos', file);
        });

        // 동영상 업로드
        videoUpload(formData, {
          onSuccess: (uploadData) => {
            // 업로드된 동영상 URL을 이용하여 게시글 생성
            const postData = {
              ...data,
              media: uploadData.videoUrls,
              thumbnailUrl: uploadData.thumbnailUrls,
              color: activeColor,
              gym_idx: Number(gymId),
            };

            if (initialData) {
              postDetailUpdate(postData);
            } else {
              detailUploadDatas(postData);
            }
          },
          onError: (error) => {
            // 에러 처리
            showModalHandler('alert', '동영상 업로드에 실패했어요');
          },
        });
      } else {
        // 동영상 파일이 없는 경우 (수정 시 기존 동영상 유지)
        const postData = {
          ...data,
          color: activeColor,
          gym_idx: Number(gymId),
        };

        if (initialData) {
          postDetailUpdate(postData);
        } else {
          detailUploadDatas(postData);
        }
      }
    });
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = () => {
    return formatDate(new Date());
  };

  useEffect(() => {
    if (initialData) {
      setValue('clearday', formatDate(new Date(initialData.clearday)));
      setValue('content', initialData.content);
    } else {
      setValue('clearday', getTodayDate());
    }
  }, [initialData, setValue]);

  // if (isPending || isUploading) {
  //   return <LoadingSpinner />;
  // }

  // 업로드 상태 변화에 따라 모달을 제어하는 useEffect 훅을 추가합니다.
  useEffect(() => {
    if (isPending || isUploading) {
      // 업로드 중일 때 모달을 표시하고, 닫을 수 없도록 설정
      showModalHandler('alert', '업로드가 진행 중입니다.', undefined);

      // 의도적으로 closeModal을 제한하기 위해 기존 closeModal 함수의 호출을 막습니다.
      const preventModalClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault(); // ESC 키로 모달 닫기 막기
        }
      };
      window.addEventListener('keydown', preventModalClose);

      return () => {
        window.removeEventListener('keydown', preventModalClose);
        closeModal();
      };
    }
  }, [isPending, isUploading]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <VideoInput mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
      <CommonInput
        id="clearday"
        type="date"
        label="등반일을 선택해 주세요"
        defaultValue={getTodayDate()}
        register={register('clearday', {
          required: '날짜를 선택해주세요',
          validate: (value) =>
            value <= getTodayDate() ||
            '날짜는 오늘 또는 이전 날짜로만 설정할 수 있어요!.',
        })}
      />
      <div className={styles.error_text_wrapper}>
        {errors.clearday && (
          <small className={styles.error_text}>{errors.clearday.message}</small>
        )}
      </div>
      <HoldColorList
        type="submit"
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('limitedTextarea')}
          maxLength={maxLength}
          {...register('content', {
            required: '내용을 입력해 주세요.',
          })}
        />
        <div className={cn('charCount')}>
          {text?.length}/{maxLength}
        </div>
      </div>
      <div className={styles.error_text_wrapper}>
        {errors.content && (
          <small className={styles.error_text}>{errors.content.message}</small>
        )}
      </div>
      <CommonButton
        name={initialData ? '수정하기' : '답지 올리기'}
        type="submit"
      />
    </form>
  );
};

export default PostUploadForm;
