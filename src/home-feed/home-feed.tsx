import { useEffect, useState } from 'react';
import { LinkInfo } from '../types';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { Feed } from '../shared/components/feed/feed';

export const HomeFeed = () => {
  const [links, setLinks] = useState<LinkInfo[]>([]);

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setLinks(links);
    })();
  }, []);

  return <Feed links={links} />;
};
