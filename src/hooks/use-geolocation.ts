import { useEffect, useState } from 'react';
import type { Coordinates } from '@/api/types';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

interface GeolocationResult {
  coordinates: Coordinates | null;
  error: string | null;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  });

  const getLocation = (): Promise<GeolocationResult> => {
    return new Promise((resolve) => {
      setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

      if (!navigator.geolocation) {
        const result = {
          coordinates: null,
          error: 'Geolocation is not supported by this browser',
        };
        setLocationData({ ...result, isLoading: false });
        resolve(result);
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const result = {
            coordinates: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            error: null,
          };
          setLocationData({ ...result, isLoading: false });
          resolve(result);
        },
        (error) => {
          let errorMessage: string;

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location permission denied. Enable location access in your browser settings (Settings → Privacy → Location).';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable. Please check your device's location services.";
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage =
                'Location access failed. Please enable location permissions in your browser.';
          }

          const result = { coordinates: null, error: errorMessage };
          setLocationData({ ...result, isLoading: false });
          resolve(result);
        },
        options
      );
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
