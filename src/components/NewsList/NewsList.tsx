import { gql, useQuery } from '@apollo/client';
import Post from '../Post/Post';

const NEWS_QUERY = gql`
  {
    items {
      sk
      additionalFields {
        headline
        headlineUrl
      }
    }
  }
`;

export const NewsList = () => {
  const { data } = useQuery(NEWS_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.items.map((post: any) => (
            <Post key={post.sk} post={post.additionalFields} />
          ))}
        </>
      )}
    </div>
  );
};
