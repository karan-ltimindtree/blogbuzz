import { Header } from '@/components/header/Header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { Anchor, Badge, Breadcrumbs, Container, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classes from './PostDetails.module.css';
import { Post, getSinglePost } from '@/redux/features/posts/post.feature';
import { PostDetailsPageProps } from './PostDetails.types';

export function PostDetailsPage() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.post);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    let data: Post[] = [];
    if (location.state) {
      if (location.state.from === 'My Posts') {
        data = [...selector.myPosts];
      } else if (location.state.from === 'Recent Posts') {
        data = [...selector.recentPosts];
      } else if (location.state.from === 'All Posts') {
        data = [...selector.posts];
      }

      if (data && data.length > 0) {
        const foundIndex = data.findIndex((item) => item.id === params.id);
        if (foundIndex !== -1) {
          setPost(data[foundIndex]);
        } else {
          dispatch(getSinglePost(params.id ?? '-1'));
        }
      }
    } else {
      dispatch(getSinglePost(params.id ?? '-1'));
    }
  }, []);

  useEffect(() => {
    if (selector.singlePost && !post) setPost((oldPost) => oldPost ?? selector.singlePost);
  }, [selector.singlePost]);

  return (
    <>
      <Header />
      <Container size="lg" my="lg">
        {location.state && location.state.from === 'My Posts' && (
          <Breadcrumbs separator=">">
            {location.state.breadcrumbs.map((item: { path: string; name: string }, i: number) => (
              <Anchor key={i} component={Link} to={item.path} replace>
                {item.name}
              </Anchor>
            ))}
          </Breadcrumbs>
        )}
        {post ? (
          <Stack gap="lg">
            <Text className={classes.titleText} size="lg">
              {post.title}
            </Text>
            <Badge size="lg">{post.category}</Badge>
            <Text>{post.content}</Text>
          </Stack>
        ) : (
          <Text>Post not found</Text>
        )}
      </Container>
    </>
  );
}
