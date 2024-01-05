import { useToggle, upperFirst, useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Container,
  Grid,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './Auth.module.css';
import { LoginFormValues, RegisterFormValues } from './Auth.types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';
import { loginUser, registerUser } from '@/redux/features/auth/auth.feature';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function AuthPage(props: PaperProps) {
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const isMD = useMediaQuery('(min-width: 48em)');
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (val: string) =>
        type === 'register' && (val.length > 150 ? 'Name should be maximum 150 characters' : null),
      email: (val: string) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ? null : 'Invalid Email',
      password: (val: string) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
      confirmPassword: (val: string) => {
        if (type === 'login') return null;
        if (val.length <= 6) return 'Password should include at least 6 characters';
        if (val !== form.values.password) return 'Password mismatch';
        return null;
      },
    },
  });

  function onSubmit(values: LoginFormValues | RegisterFormValues) {
    if (type === 'login') {
      const { email, password } = values as LoginFormValues;
      dispatch(loginUser({ email, password }));
    } else {
      const { name, email, password } = values as RegisterFormValues;
      dispatch(registerUser({ name, email, password }));
    }
  }

  // show notification based on api action
  useEffect(() => {
    if (authSelector.loggedIn) {
      if (type === 'register' && authSelector.loggedIn) {
        toggle('login');
      } else if (type === 'login' && authSelector.loggedIn) {
        const from = location?.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } else if (sessionStorage.getItem('accessToken')) {
      console.log('in here');
      navigate('/', { replace: true });
    }
  }, [authSelector]);

  // reset form values when user navigates between login and register
  useEffect(() => {
    form.reset();
  }, [type]);

  return (
    <Container size="lg">
      <Grid
        align="center"
        justify="center"
        styles={isMD ? { inner: { height: '100vh' } } : undefined}
        gutter={{ sm: 20 }}
      >
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack my="lg">
            <Title className={classes.title}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'blue', to: colorScheme === 'dark' ? 'white' : 'black' }}
              >
                BlogBuzz
              </Text>
            </Title>
            <Text c="dimmed" ta="center" size="lg">
              A new blogging destination. Dive into a world of vibrant stories, trending thoughts
              and engaging conversations.
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500} mb="lg">
              {upperFirst(type)}
            </Text>

            <form onSubmit={form.onSubmit(onSubmit)}>
              <Stack>
                {type === 'register' && (
                  <TextInput
                    required
                    label="Name"
                    placeholder="Your name"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name && form.errors.name}
                    radius="md"
                  />
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="name@example.com"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid Email'}
                  radius="md"
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password && 'Password should include at least 6 characters'}
                  radius="md"
                />

                {type === 'register' && (
                  <PasswordInput
                    required
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={form.values.confirmPassword}
                    onChange={(event) =>
                      form.setFieldValue('confirmPassword', event.currentTarget.value)
                    }
                    error={form.errors.confirmPassword && form.errors.confirmPassword}
                    radius="md"
                  />
                )}
              </Stack>

              <Group justify="space-between" mt="xl">
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  onClick={() => toggle()}
                  size="xs"
                >
                  {type === 'register'
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}
                </Anchor>
                <Button type="submit" radius="xl">
                  {upperFirst(type)}
                </Button>
              </Group>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
