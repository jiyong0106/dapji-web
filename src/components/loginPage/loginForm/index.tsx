'use client';

import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import CommonButton from '@/src/components/common/commonButton';
import CommonInput from '@/src/components/common/commonInput';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ModalChoice from '@/src/components/common/moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import { useMutation } from '@tanstack/react-query';
import { isServerError } from '@/src/utils/axiosError';
import { fetchSignIn, fetchSignInType } from '@/src/app/(home)/api';

const cn = classNames.bind(styles);

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fetchSignInType>();
  const router = useRouter();
  const { showModalHandler } = useModal();

  const { mutate: userSignIn } = useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: (formData: fetchSignInType) => fetchSignIn(formData),
    onSuccess: (data: any) => {
      if (data.user.nickname === null) {
        router.replace('/join');
        return;
      }
      router.replace(`/gym`);
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 401) {
        showModalHandler('alert', '이메일이나 비밀번호가 잘못되었습니다');
        return;
      }

      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '잠시후 다시 시도해 주세요');
        return;
      }
    },
  });

  const onSubmit = (data: fetchSignInType) => {
    const formData = {
      ...data,
    };
    userSignIn(formData);
  };

  return (
    <div className={cn('container')}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn('signInForm')}>
        <CommonInput
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          type="email"
          register={register('email', {
            required: '이메일 꼭 필요함',
          })}
        />
        {errors.email && <span>{errors.email.message as string}</span>}
        <CommonInput
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          register={register('password', {
            required: '비밀번호 꼭 필요함',
          })}
        />
        {errors.password && <span>{errors.password.message as string}</span>}
        <CommonButton name="답지 로그인" type="submit" />
      </form>
      <ModalChoice />
    </div>
  );
};

export default LoginForm;
