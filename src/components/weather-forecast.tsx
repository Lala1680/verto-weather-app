import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets } from 'lucide-react';
import { format } from 'date-fns';
import type { ForecastData } from '@/api/types';

interface WeatherForecastProps {
  data: ForecastData;
  unit: 'celsius' | 'fahrenheit';
  convertTemp: (temp: number) => number;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function WeatherForecast({
  data,
  unit,
  convertTemp,
}: WeatherForecastProps) {
  const dailyForecasts = data.list.reduce(
    (acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

      if (!acc[date]) {
        acc[date] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          humidity: forecast.main.humidity,
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          forecast.main.temp_min
        );
        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          forecast.main.temp_max
        );
      }

      return acc;
    },
    {} as Record<string, DailyForecast>
  );

  const nextDays = Object.values(dailyForecasts).slice(1, 6);
  const formatTemp = (t: number) => `${Math.round(convertTemp(t))}°`;
  const getUnitSymbol = () => (unit === 'celsius' ? 'C' : 'F');

  return (
    <Card className="bg-white/40 !backdrop-blur-2xl">
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-1 items-center gap-4 rounded-lg border bg-white/60 p-4 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="relative aspect-square w-full max-w-[30px]">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                    alt={day.weather.description}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), 'EEE, MMM d')}
                  </p>
                  <p className="text-muted-foreground text-sm capitalize">
                    {day.weather.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:justify-end">
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_max)}
                  <span className="text-xs">{getUnitSymbol()}</span>
                </span>
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_min)}
                  <span className="text-xs">{getUnitSymbol()}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
