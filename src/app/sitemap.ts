import type { MetadataRoute } from 'next';
import { sitemapBoardList } from './(main)/board/api';
import { boardSitemapType } from '../utils/type';

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://climbdapji.kr';

const defaultSitemap: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/board`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  },
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const limit = 1000;
  const offset = 0; //일단 예시

  const sitemapBoardData = await sitemapBoardList({ offset, limit });

  const dynamicPages: MetadataRoute.Sitemap = sitemapBoardData.map(
    (board: boardSitemapType) => {
      return {
        url: `${BASE_URL}/board/${board.boardId}`,
        lastModified: new Date(board.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    },
  );

  return [...defaultSitemap, ...dynamicPages];
};
export default sitemap;
