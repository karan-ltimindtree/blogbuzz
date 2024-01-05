import { Avatar, Card, Group, Stack, Text } from '@mantine/core';
import classes from './PostCard.module.css';
import { PostCardProps } from './PostCard.types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PostCard({
  id,
  title,
  category,
  content,
  created_at,
  created_by,
  created_by_ref,
  sectionTitle,
}: PostCardProps) {
  const path = sectionTitle === 'My Posts' ? '/myPosts' : '/';
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (created_at) {
      const date = new Date(created_at);
      setTimestamp(date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    }
  }, []);

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/post/${id}`}
      state={{
        from: sectionTitle,
        breadcrumbs: [
          { path: '/', name: 'Home' },
          { path, name: sectionTitle },
        ],
      }}
    >
      <Card withBorder shadow="sm" radius="md" p={0} className={classes.card}>
        <Stack p="md" gap={0} h="100%" align="stretch">
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {category}
          </Text>
          <Text className={classes.title} lineClamp={2} mt="xs" mb="md" h="100%">
            {title}
          </Text>
          <Group wrap="nowrap" gap="xs" justify="space-between">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={20}
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              />
              <Text size="xs">{created_by_ref.name}</Text>
            </Group>
            <Text size="xs" c="dimmed">
              {timestamp}
            </Text>
          </Group>
        </Stack>
      </Card>
    </Link>
  );
}
