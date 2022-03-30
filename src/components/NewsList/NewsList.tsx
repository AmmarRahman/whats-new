import { gql, useQuery } from '@apollo/client';
import Post from '../Post/Post';

const NEWS_QUERY = gql`
  query GetLatestNews {
    listAWSNews {
      items {
        sk
        additionalFields {
          headline
          headlineUrl
        }
        name
      }
    }
  }
`;

export const NewsList = () => {
  const { data } = useQuery(NEWS_QUERY);
  const items = data?.listAWSNews?.items;

  return (
    <div>
      {items && (
        <>
          {items.map((post: any) => (
            <Post key={post.sk} post={post.additionalFields} />
          ))}
        </>
      )}
    </div>
  );
};
