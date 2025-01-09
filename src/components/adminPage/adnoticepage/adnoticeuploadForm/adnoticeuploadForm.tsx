'use client';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './adnoticeuploadForm.module.scss';
import Image from 'next/image';
import { useFieldArray, useForm } from 'react-hook-form';
import CommonButton from '../../../common/commonButton';
import {
  fetchadNoticeUpload,
  fetchadNoticeImage,
} from '@/src/app/admin/adnotice/api';
import { useMutation } from '@tanstack/react-query';

import CommonInput from '@/src/components/common/commonInput';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

type AdNoticeFormType = {
  id: string;
  type: 'text' | 'image';
  value: string;
};

const AdNoticeUploadForm = () => {
  const { showModalHandler } = useModal();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    content: AdNoticeFormType[];
  }>({
    defaultValues: {
      title: '',
      content: [],
    },
  });
  const { fields, append } = useFieldArray({
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

  //공지 업로드
  const { mutate: postadNoticeUpload } = useMutation({
    mutationKey: ['adNoticeUploadKey'],
    mutationFn: (formData: any) => fetchadNoticeUpload(formData),
    onSuccess: () => {
      reset({
        title: '',
        content: [],
      });
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

    showModalHandler('choice', '공지 업로드?', () =>
      postadNoticeUpload(formattedData),
    );
  };

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
            {item.type === 'text' && (
              <textarea
                className={cn('text-input')}
                placeholder="내용 입력"
                {...register(`content.${index}.value`)}
              />
            )}
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

export default AdNoticeUploadForm;
