import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './Hero.module.css';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Ignite your{' '}
          <Text component="span" className={classes.highlight} inherit>
            voice,
          </Text>
          {` amplify your `}
          <Text component="span" className={classes.highlight} inherit>
            thoughts
          </Text>
          !
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            A new blogging destination. Dive into a world of vibrant stories, trending thoughts and
            engaging conversations.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to="/createPost">
            <Button className={classes.control} size="lg">
              Create Post
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
