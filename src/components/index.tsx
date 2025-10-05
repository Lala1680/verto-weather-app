import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import SearchBar from './search-bar';
import { CurrentWeather } from './current-weather';
import { WeatherForecast } from './weather-forecast';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

export default function WeatherByCity() {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1440px] px-4 py-6 md:px-[3.1%] md:py-16">
        <div className="mb-12 text-center">
          <div className="mb-10">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:text-7xl">
              <span className="bg-gradient-to-r from-cyan-700 to-rose-500 bg-clip-text text-transparent">
                Verto{' '}
              </span>
              weather
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
              Experience weather like never before with real-time data,
              beautiful visuals, and precise forecasts for any location
              worldwide
            </p>
            <div className="mb-10 flex justify-center">
              <SearchBar />
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
              <div className="col-span-2">
                {weatherQuery?.isLoading ? (
                  <Skeleton className="h-[500px] w-full rounded-lg bg-white/40" />
                ) : (
                  weatherQuery?.data && (
                    <CurrentWeather data={weatherQuery?.data} />
                  )
                )}
              </div>
              <div className="col-span-2 lg:col-span-1">
                {forecastQuery?.isLoading ? (
                  <Skeleton className="h-[500px] w-full rounded-lg bg-white/40" />
                ) : (
                  forecastQuery?.data && (
                    <WeatherForecast data={forecastQuery?.data} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
