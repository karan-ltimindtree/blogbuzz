import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Container,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { IconToolsKitchen2, IconTie, IconCodeCircle2, IconGps } from '@tabler/icons-react';
import classes from './Categories.module.css';

interface CardProps {
  icon: JSX.Element;
  title: string;
  bgColor: string;
  textColor: string;
}

function Card({ icon, title, bgColor, textColor }: CardProps) {
  return (
    <Paper
      shadow="sm"
      p="lg"
      radius="md"
      className={classes.card}
      style={{ backgroundColor: bgColor }}
    >
      <Group wrap="nowrap" gap="lg" align="center" justify="center">
        <Title order={4} className={classes.title} style={{ color: textColor }}>
          {icon}
        </Title>
        <Title order={4} className={classes.title} style={{ color: textColor }}>
          {title}
        </Title>
      </Group>
    </Paper>
  );
}

const data = [
  {
    icon: <IconToolsKitchen2 />,
    title: 'Food',
    bgColor: 'var(--mantine-color-violet-light)',
    textColor: 'var(--mantine-color-violet-light-color)',
  },
  {
    icon: <IconTie />,
    title: 'Fashion',
    bgColor: 'var(--mantine-color-red-light)',
    textColor: 'var(--mantine-color-red-light-color)',
  },
  {
    icon: <IconCodeCircle2 />,
    title: 'Coding',
    bgColor: 'var(--mantine-color-blue-light)',
    textColor: 'var(--mantine-color-blue-light-color)',
  },
  {
    icon: <IconGps />,
    title: 'Travel',
    bgColor: 'var(--mantine-color-teal-light)',
    textColor: 'var(--mantine-color-teal-light-color)',
  },
];

export function CategoriesSection() {
  const slides = data.map((item, i) => <Card key={i} {...item} />);

  return (
    <Container size="90%" my="lg" py="lg">
      <Title order={3}>Categories</Title>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md" mt="md">
        {slides}
      </SimpleGrid>
    </Container>
  );
}
