import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import WeatherByCity from './components';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WeatherByCity />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
