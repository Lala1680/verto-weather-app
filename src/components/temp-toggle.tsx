// temperature-toggle.tsx
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

export function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="flex items-center space-x-3 rounded-lg border border-white/30 bg-white/40 px-4 py-2">
      <Label
        htmlFor="temperature-toggle"
        className={`text-sm font-medium ${unit === 'celsius' ? 'text-white' : 'text-white/60'}`}>
        °C
      </Label>
      <Switch
        id="temperature-toggle"
        checked={unit === 'fahrenheit'}
        onCheckedChange={onToggle}
      />
      <Label
        htmlFor="temperature-toggle"
        className={`text-sm font-medium ${unit === 'fahrenheit' ? 'text-white' : 'text-white/60'}`}>
        °F
      </Label>
    </div>
  );
}
