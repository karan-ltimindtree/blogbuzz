import { Header } from '@/components/header/Header';
import { Post, getMyPosts } from '@/redux/features/posts/post.feature';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { PostsSection } from '@/sections/posts/Posts.section';
import { useEffect, useState } from 'react';

export function MyPostsPage() {
  const dispatch = useAppDispatch();
  const postSelector = useAppSelector((state) => state.post);
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(getMyPosts());
    console.log('called my posts api');
  }, []);

  useEffect(() => {
    console.log('should come here');
    setData(postSelector.myPosts);
  }, [postSelector.myPosts]);

  return (
    <>
      <Header />
      {data && data.length > 0 && <PostsSection title="My Posts" posts={data} />}
    </>
  );
}
