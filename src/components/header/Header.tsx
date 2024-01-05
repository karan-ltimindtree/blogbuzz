import { useEffect, useState } from 'react';
import {
  Container,
  Group,
  Burger,
  Text,
  Drawer,
  ScrollArea,
  rem,
  Divider,
  UnstyledButton,
  Center,
  Box,
  Title,
  useMantineColorScheme,
  Avatar,
  Switch,
  useMantineTheme,
  ActionIcon,
  useComputedColorScheme,
  Button,
} from '@mantine/core';
import cx from 'clsx';
import { useDisclosure, useToggle } from '@mantine/hooks';
import classes from './Header.module.css';
import { ProfileMenu } from '../profileMenu/ProfileMenu';
import { IconSun, IconMoonStars, IconMoon } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderProps } from './Header.types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/redux.hooks';

const links = [
  { link: '/', label: 'Home' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header({ onPublishClick }: HeaderProps) {
  const location = useLocation();
  const selector = useAppSelector((state) => state.post);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <Container size="90%" className={classes.inner}>
          <Title className={classes.headerTitle}>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'blue', to: colorScheme === 'dark' ? 'white' : 'black' }}
            >
              <Link to="/">BlogBuzz</Link>
            </Text>
          </Title>
          <Group gap={20} visibleFrom="xs">
            {location.pathname !== '/createPost' ? (
              <Link to="/createPost">
                <Button variant="light">Create Post</Button>
              </Link>
            ) : (
              <Button
                variant="filled"
                className={classes.publishButton}
                loading={selector.status === 'loading'}
                onClick={onPublishClick}
              >
                Publish
              </Button>
            )}
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="md"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
            <ProfileMenu />
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={toggle}
        size="80%"
        padding="md"
        title="Menus"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>

          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </>
  );
}
