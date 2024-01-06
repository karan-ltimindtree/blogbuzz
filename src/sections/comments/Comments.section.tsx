import { Comment } from '@/components/comment/Comment';
import { CommentProps } from '@/components/comment/Comment.types';
import { axiosPrivateInstance } from '@/config/axios.config';
import { Avatar, Button, Group, Stack, Text, TextInput, Textarea, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

export function CommentsSection({ post_id }: { post_id: string }) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [content, setContent] = useState('');

  function fetchComments() {
    axiosPrivateInstance
      .get(`/comment/${post_id}`)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err: any) => {
        console.log('err - comments - ', err);
      });
  }

  useEffect(() => {
    fetchComments();
  }, []);

  function onCommentPost() {
    axiosPrivateInstance
      .post('/comment', {
        post_id,
        content,
      })
      .then((res) => {
        if (res.data.success) {
          fetchComments();
        }
      })
      .catch((err) => {
        console.log('post err- comment - ', err);
      })
      .finally(() => {
        setContent('');
      });
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <Title order={3} mt="xl">
        Comments
      </Title>
      <Stack gap="lg" py="xl">
        {comments.length > 0 &&
          comments.map((item) => (
            <Comment
              created_by_ref={item.created_by_ref}
              content={item.content}
              timestamp={item.timestamp}
            />
          ))}
        <Stack>
          <Textarea
            rows={3}
            placeholder="Start typing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="outline" size="compact-md" ml="auto" onClick={onCommentPost}>
            Post
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
