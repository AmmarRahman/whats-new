const Post = (props: any) => {
  const { post } = props;
  return (
    <div>
      <div className="max-w-2xl m-1 bg-white p-10 rounded-md shadow-lg">
        {post.headline} ({post.headlineUrl})
      </div>
    </div>
  );
};

export default Post;
