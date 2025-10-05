import type { GeocodingResponse, WeatherData } from '@/api/types';
import { Card, CardContent } from './ui/card';
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Thermometer,
  Wind,
  Sunrise,
  Sunset,
  Compass,
  Gauge,
} from 'lucide-react';
import { format } from 'date-fns';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed, deg },
    sys: { sunrise, sunset, country },
    name,
  } = data;

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  // Format time using date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: 'Feels like',
      value: formatTemp(feels_like),
      icon: Thermometer,
      color: 'text-orange-500',
    },
    {
      title: 'Humidity',
      value: `${humidity}%`,
      icon: Droplets,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Speed',
      value: `${speed} m/s`,
      icon: Wind,
      color: 'text-blue-500',
    },
    {
      title: 'Sunrise',
      value: formatTime(sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(deg)} (${deg}°)`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ];

  return (
    <Card className="overflow-hidden bg-white/40 p-0 !backdrop-blur-2xl">
      <CardContent className="p-6">
        <h1 className="mb-2 text-left text-xl font-bold tracking-tight md:mb-6 md:text-3xl">
          {name}, {country}
        </h1>
        <div className="space-y-3 md:space-y-6">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center space-y-2 text-left">
              <p className="text-5xl font-bold tracking-tighter md:text-7xl">
                {formatTemp(temp)} <span className="font-normal">c</span>
              </p>
              <p className="text-sm font-medium capitalize">
                {currentWeather.description}
              </p>
              <div className="flex gap-2 text-sm font-medium">
                High:
                <span className="flex items-center gap-1 text-blue-500">
                  <ArrowDown className="h-3 w-3" />
                  {formatTemp(temp_min)}
                </span>
                Low:
                <span className="flex items-center gap-1 text-red-500">
                  <ArrowUp className="h-3 w-3" />
                  {formatTemp(temp_max)}
                </span>
              </div>
            </div>
            <div className="relative aspect-square w-full max-w-[130px]">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {details.map((detail) => (
              <div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg border bg-white/60 p-3">
                <div className="rounded-full border border-black/10 bg-white/80 p-1.5">
                  <detail.icon className={`h-5 w-5 ${detail.color}`} />
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-sm leading-none font-medium">
                    {detail.title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
