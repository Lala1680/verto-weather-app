import { MapPin, Search } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function EmptyState() {
  return (
    <Card className="overflow-hidden bg-white/40 p-0 !backdrop-blur-2xl">
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-6 rounded-full bg-white/20 p-6">
          <Search className="h-12 w-12 text-white/60" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Start Exploring Weather
        </h2>
        <p className="mb-6 max-w-md text-white/80">
          Search for any city worldwide or use your current location to get
          real-time weather updates and forecasts.
        </p>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <MapPin className="h-4 w-4" />
          <span>Use the location button or search above</span>
        </div>
      </CardContent>
    </Card>
  );
}
