import { Avatar, Group, Text } from '@mantine/core';
import { CommentProps } from './Comment.types';
import moment from 'moment';

export function Comment({ created_by_ref, timestamp, content }: CommentProps) {
  const init = created_by_ref.name.split(' ');
  let initials = 'N/A';
  if (init.length > 1) {
    initials = `${init[0][0]}${init[1][0]}`.toUpperCase();
  } else {
    initials = `${init[0][0]}${init[0][1]}`.toUpperCase();
  }

  return (
    <div>
      <Group>
        <Avatar color="blue" radius="xl">
          {initials}
        </Avatar>
        <div>
          <Text size="sm">{created_by_ref.name}</Text>
          <Text size="xs" c="dimmed">
            {moment(timestamp).fromNow()}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {content}
      </Text>
    </div>
  );
}
