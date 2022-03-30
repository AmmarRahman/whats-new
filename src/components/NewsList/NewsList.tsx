import { gql, useQuery } from '@apollo/client';
import Post from '../Post/Post';

const NEWS_QUERY = gql`
  query MyQuery {
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
  console.log(data);
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
