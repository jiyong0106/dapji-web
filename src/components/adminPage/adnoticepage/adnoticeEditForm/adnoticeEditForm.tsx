'use client';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './adnoticeEditForm.module.scss';
import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';
import CommonButton from '../../../common/commonButton';
import {
  fetchadNoticeEdit,
  fetchadNoticeImage,
} from '@/src/app/admin/adnotice/api';
import { useMutation } from '@tanstack/react-query';

import CommonInput from '@/src/components/common/commonInput';
import { useModal } from '@/src/hooks/useModal';
import { OfficialResultType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type AdNoticeFormType = {
  id: string;
  type: string;
  value: string;
};
type FormValues = {
  notice_idx: number; // 수정할 공지의 ID
  title: string;
  content: AdNoticeFormType[];
};
type AdNoticeEditFormProps = {
  initialData: OfficialResultType;
};

const AdNoticeEditForm = ({ initialData }: AdNoticeEditFormProps) => {
  const { showModalHandler } = useModal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      notice_idx: 0,
      title: '',
      content: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'content', // `content` 필드를 관리
  });
  // 텍스트 추가
  const addText = () => {
    append({ id: Date.now().toString(), type: 'text', value: '' });
  };

  // 이미지 추가
  const addImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      for (const file of Array.from(files)) {
        try {
          const response = await fetchadNoticeImage(file); // S3 URL 받기
          const imageUrl = response.imageUrl; // API에서 반환된 S3 URL

          append({ id: Date.now().toString(), type: 'image', value: imageUrl });
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    }
  };

  //공지 수정
  const { mutate: postadNoticeEdit } = useMutation({
    mutationKey: ['adNoticeEditKey'],
    mutationFn: ({ formData, noticeId }: { formData: any; noticeId: string }) =>
      fetchadNoticeEdit(formData, noticeId),
    onSuccess: () => {
      router.replace('/admin/adnotice');
    },
    onError: () => {
      showModalHandler('alert', '다시시도해주세요');
    },
  });

  const onSubmit = async (data: {
    title: string;
    content: AdNoticeFormType[];
  }) => {
    const formattedData = {
      title: data.title,
      content: data.content.map((item) => ({
        type: item.type,
        value: item.value,
      })),
    };

    showModalHandler('choice', '공지 수정?', () =>
      postadNoticeEdit({
        formData: formattedData,
        noticeId: String(initialData.notice_idx), // 혹은 data에서 notice_idx를 꺼내도 됩니다.
      }),
    );
  };

  useEffect(() => {
    if (initialData) {
      reset({
        notice_idx: initialData.notice_idx, // 어디 공지인지 식별용
        title: initialData.title,
        content: initialData.content.map((item, idx) => ({
          id: `${item.type}-${idx}`, // 임시로 id 부여
          type: item.type,
          value: item.value,
        })),
      });
    }
  }, [initialData, reset]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <CommonInput
        placeholder="제목을 입력해 주세요"
        register={register('title', {
          required: '제목을 입력해 주세요',
        })}
      />
      <div className={cn('button-row')}>
        <button type="button" className={cn('button')} onClick={addText}>
          텍스트 추가
        </button>
        <label htmlFor="file-upload" className={cn('button')}>
          이미지 추가
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={addImages}
          />
        </label>
      </div>

      <div className={cn('content-list')}>
        {fields.map((item, index) => (
          <div key={item.id} className={cn('content-item')}>
            {/* X 버튼: 클릭하면 해당 인덱스의 콘텐츠를 제거 */}
            <button
              type="button"
              className={cn('delete-button')}
              onClick={() => remove(index)}
            >
              X
            </button>

            {/* 텍스트 콘텐츠 */}
            {item.type === 'text' && (
              <textarea
                className={cn('text-input')}
                placeholder="내용 입력"
                {...register(`content.${index}.value`)}
              />
            )}

            {/* 이미지 콘텐츠 */}
            {item.type === 'image' && (
              <div className={cn('image-container')}>
                <Image
                  src={item.value}
                  alt={`Uploaded content ${index}`}
                  layout="responsive"
                  width={500}
                  height={300}
                  className={cn('image')}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <CommonButton name="공지 업로드" type="submit" />
    </form>
  );
};

export default AdNoticeEditForm;
