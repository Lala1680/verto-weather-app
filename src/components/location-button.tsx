// location-button.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useGeolocation } from '@/hooks/use-geolocation';
import { toast } from 'sonner';

export function LocationButton() {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();
  const { getLocation } = useGeolocation();

  const handleLocationClick = async () => {
    setIsGettingLocation(true);
    try {
      const result = await getLocation();
      if (result.coordinates) {
        navigate(
          `/city/Current Location?lat=${result.coordinates.lat}&lon=${result.coordinates.lon}`
        );
        toast.success('Location found successfully!');
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error('Failed to get location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <Button
      onClick={handleLocationClick}
      disabled={isGettingLocation}
      variant="outline"
      size="lg"
      className="border-white/30 bg-white/40 text-white hover:bg-white/60 hover:text-black"
      aria-label="Use current location"
      title="Use current location">
      {isGettingLocation ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <MapPin className="h-5 w-5" />
      )}
    </Button>
  );
}
