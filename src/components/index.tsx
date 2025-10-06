import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import SearchBar from './search-bar';
import { CurrentWeather } from './current-weather';
import { WeatherForecast } from './weather-forecast';
import { EmptyState } from './empty-state';
import { LocationButton } from './location-button';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';
import { useTemperatureUnit } from '@/hooks/use-temperature-unit';
import { TemperatureToggle } from './temp-toggle';

export default function WeatherByCity() {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  const { unit, toggleUnit, convertTemp } = useTemperatureUnit();

  const hasValidCoordinates =
    !Number.isNaN(lat) && !Number.isNaN(lon) && lat !== 0 && lon !== 0;
  const coordinates = hasValidCoordinates ? { lat, lon } : null;

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
      <div className="absolute bottom-2 w-full px-4 text-center text-xs text-white/70">
        Disclaimer: Location services may be blocked or unreliable in
        privacy-focused browsers (e.g., Brave). Please enable location
        permissions in your browser settings or use the search bar above.
      </div>

      <div className="relative z-10 mx-auto mb-16 min-h-screen w-full max-w-[1440px] px-4 py-6 text-center md:px-[3.1%] md:py-16">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white drop-shadow-2xl md:text-7xl">
          <span className="bg-gradient-to-r from-cyan-700 to-rose-500 bg-clip-text text-transparent">
            Verto{' '}
          </span>
          weather
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
          Experience weather like never before with real-time updates, stunning
          visualizations, and highly accurate forecasts tailored for any
          location across the globe.
        </p>

        <div className="mb-10 flex-wrap items-center justify-center gap-4 space-y-2 sm:flex sm:space-y-0">
          <div className="max-w-2xl flex-1">
            <SearchBar />
          </div>
          <div className="flex gap-4">
            <LocationButton />
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">
            {!hasValidCoordinates ? (
              <EmptyState />
            ) : weatherQuery?.isLoading ? (
              <Skeleton className="h-[500px] w-full rounded-lg bg-white/40" />
            ) : (
              weatherQuery?.data && (
                <CurrentWeather
                  data={weatherQuery.data}
                  unit={unit}
                  convertTemp={convertTemp}
                />
              )
            )}
          </div>

          <div className="col-span-2 lg:col-span-1">
            {!hasValidCoordinates ? (
              <EmptyState />
            ) : forecastQuery?.isLoading ? (
              <Skeleton className="h-[500px] w-full rounded-lg bg-white/40" />
            ) : (
              forecastQuery?.data && (
                <WeatherForecast
                  data={forecastQuery.data}
                  unit={unit}
                  convertTemp={convertTemp}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
