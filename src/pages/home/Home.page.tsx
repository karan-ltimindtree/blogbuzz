import { Header } from '@/components/header/Header';
import { HeroSection } from '@/sections/hero/Hero.section';
import { PostsSection } from '@/sections/posts/Posts.section';
import { CategoriesSection } from '@/sections/categories/Categories.section';
import { Divider } from '@mantine/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { getAllPosts, getRecentPosts } from '@/redux/features/posts/post.feature';

export function HomePage() {
  const dispatch = useAppDispatch();
  const postSelector = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(getRecentPosts());
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <CategoriesSection />
      {postSelector.recentPosts && postSelector.recentPosts.length > 0 && (
        <PostsSection title="Recent Posts" posts={postSelector.recentPosts} />
      )}
      {postSelector.posts && postSelector.posts.length > 0 && (
        <PostsSection title="All Posts" posts={postSelector.posts} />
      )}
    </>
  );
}
