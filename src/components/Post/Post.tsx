const Post = (props: any) => {
  const { post } = props;
  return (
    <div>
      <div>
        {post.headline} ({post.headlineUrl})
      </div>
    </div>
  );
};

export default Post;
