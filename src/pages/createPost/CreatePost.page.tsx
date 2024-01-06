import { Header } from '@/components/header/Header';
import {
  Button,
  Container,
  Divider,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import classes from './CreatePost.module.css';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { CreatPostFormValues } from './CreatePost.types';
import { createPost } from '@/redux/features/posts/post.feature';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreatePostPage() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.post);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: '',
      category: '',
      content: '',
    },
    validate: {
      title: (val: string) =>
        val.length > 0 && val.length < 200
          ? null
          : 'Please enter title between 1-200 characters only',
      category: (val: string | null) => (val ? null : 'Please select a category'),
      content: (val: string) =>
        val.length > 0 && val.length < 2000
          ? null
          : 'Please enter content between 1-2000 characters only',
    },
  });

  function onSubmit(values: CreatPostFormValues) {
    const { title, category, content } = values;
    dispatch(createPost({ title, category, content }));
    form.reset();
  }

  return (
    <>
      <Header onPublishClick={form.onSubmit(onSubmit)} />
      <Container size="lg" my="lg">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap="lg">
            <TextInput
              classNames={{ input: classes.titleTextInput }}
              placeholder="Title"
              size="lg"
              type="text"
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title && form.errors.title}
            />
            <Select
              classNames={{
                root: classes.selectRoot,
                wrapper: classes.selectWrapper,
                input: classes.selectInput,
                label: classes.selectLabel,
              }}
              placeholder="Select Category"
              data={['Food', 'Fashion', 'Coding', 'Travel']}
              value={form.values.category}
              onOptionSubmit={(value: string) => {
                form.setFieldValue('category', value);
              }}
              error={form.errors.category && form.errors.category}
            />
            <Divider />
            <Textarea
              classNames={{ input: classes.contentTextarea }}
              maxRows={15}
              autosize
              placeholder="Write your content..."
              value={form.values.content}
              onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
              error={form.errors.content && form.errors.content}
            />
            <Button
              type="submit"
              hiddenFrom="xs"
              className={classes.publishButton}
              loading={selector.status === 'loading'}
            >
              Publish
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
