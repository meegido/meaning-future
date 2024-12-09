import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDocuments } from '../shared/infrastructure/firestore-client.tsx';
import { LinkInfo } from '../types.ts';
import { Feed } from '../shared/components/feed/feed.tsx';

export const UserFeed = () => {
  const [links, setlinks] = useState<LinkInfo[]>([]);
  const { user } = useParams();

  useEffect(() => {
    (async () => {
      const userLinks = await getUserDocuments(user!);
      setlinks(userLinks);
    })();
  }, [user]);

  return <Feed links={links} />;
};
