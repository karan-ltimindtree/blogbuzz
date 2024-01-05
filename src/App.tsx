import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <Notifications position="top-right" />
        <Router />
      </Provider>
    </MantineProvider>
  );
}
