import { Container, Grid, Title } from '@mantine/core';
import { PostCard } from '@/components/postCard/PostCard';
import { PostsSectionProps } from './Posts.types';
import React, { useEffect, useState } from 'react';
import { PostCardProps } from '@/components/postCard/PostCard.types';

export function PostsSection({ title, posts }: PostsSectionProps) {
  const [columns, setColumns] = useState<React.ReactNode[]>([]);
  console.log('post section rendered');
  useEffect(() => {
    if (posts && posts.length > 0) {
      setColumns([
        ...posts.map((item: PostCardProps, i: number) => {
          return (
            <Grid.Col
              key={i}
              span={{ base: 12, xs: 6, md: 4 }}
              mb={{ base: i + 1 === posts.length ? '0' : 'md', xs: '0' }}
            >
              <PostCard
                id={item.id}
                title={item.title}
                category={item.category}
                content=""
                created_by={item.created_by}
                created_by_ref={item.created_by_ref}
                created_at={item.created_at}
                sectionTitle={title}
              />
            </Grid.Col>
          );
        }),
      ]);
    }
  }, []);

  return (
    <Container size="90%" my="lg" py="lg">
      <Title order={3}>{title}</Title>
      <Grid align="stretch" justify="stretch" gutter={{ xs: 15, sm: 30 }} mt="md">
        {columns && columns.length > 0 && columns}
      </Grid>
    </Container>
  );
}
