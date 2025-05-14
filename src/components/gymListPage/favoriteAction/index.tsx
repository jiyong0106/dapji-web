import React from 'react';
import classNames from 'classnames/bind';
import styles from './favoriteAction.module.scss';
import { FavoriteIcon, FavoritedIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type FavoriteActionProps = {
  favoriteToggle: boolean;
  onClick: (e: React.MouseEvent) => void;
};

const FavoriteAction = ({ favoriteToggle, onClick }: FavoriteActionProps) => {
  return (
    <div className={cn('container')}>
      {favoriteToggle ? (
        <FavoritedIcon width="20" height="20" onClick={onClick} />
      ) : (
        <FavoriteIcon width="20" height="20" onClick={onClick} />
      )}
    </div>
  );
};

export default FavoriteAction;
