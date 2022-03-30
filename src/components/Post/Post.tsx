const Post = (props: any) => {
  const { post } = props;
  return (
    <div>
      <div className="max-w-2xl m-1 bg-white p-10 rounded-md shadow-lg">
        <span>{new Date(post.postDateTime).toDateString()}</span>
        <p> {post.headline} </p>
      </div>
    </div>
  );
};

export default Post;
