import { useParams } from 'react-router-dom';

export const LinkDetail = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
