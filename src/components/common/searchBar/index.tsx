'use client';
import classNames from 'classnames/bind';
import styles from './searchBar.module.scss';
import CommonInput from '@/src/components/common/commonInput';
import { GlassIcon, AddIcon, CloseIcon } from '@/public/icon';
import { useState, useEffect } from 'react';
import useDebounce from '@/src/hooks/useDebounce';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type SearchBarProps = {
  onSearchChange: (value: string) => void;
  searchName: string;
  showAdd?: boolean;
  placeholder: string;
};

const SearchBar = ({
  onSearchChange,
  searchName,
  showAdd,
  placeholder,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchName);
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 0.6초 지연
  const router = useRouter();
  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === '') {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    setInputValue(searchName);
  }, [searchName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const uploadClick = () => {
    router.replace('/board/upload');
  };

  const resetClick = () => {
    setInputValue('');
  };

  return (
    <div className={cn('container')}>
      <CommonInput
        placeholder={placeholder}
        suffix={
          searchName.length === 0 ? (
            <GlassIcon
              width="15"
              height="15"
              className={cn('glass')}
              fill="black"
            />
          ) : (
            <CloseIcon
              width="15"
              height="15"
              className={cn('glass')}
              fill="black"
              onClick={resetClick}
            />
          )
        }
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      {showAdd && <AddIcon width="30" height="30" onClick={uploadClick} />}
    </div>
  );
};
export default SearchBar;
