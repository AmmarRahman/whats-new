const Post = (props: any) => {
  const { post } = props;
  return (
    <div>
      <div className=" border-b border-gray-400  bg-white rounded-b p-4 flex flex-col justify-between leading-norma">
        <div className="lg:h-auto bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden">
          <p className="text-sm text-gray-600 flex items-center">
            {new Date(post.postDateTime).toDateString()}
          </p>
          <div className="text-sm text-gray-600 flex items-center">
            <p> {post.headline} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
