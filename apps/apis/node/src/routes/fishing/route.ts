import { Request, Response, Router } from 'express';
import meta from './meta.json';

export const router = Router();

export type ForecastParams = {
  latitude?: string;
  longitude?: string;
  current?: string;
  hourly?: string;
  daily?: string;
  forecast_days?: string;
};

export const weatherClient = {
  async getForecast(urlParams: ForecastParams) {
    const paramObj = {
      latitude: urlParams.latitude?.toString() ?? '44.9417',
      longitude: urlParams.longitude?.toString() ?? '-93.4767',
      forecast_days: urlParams.forecast_days ?? '7',
      temperature_unit: urlParams.forecast_days ?? 'fahrenheit',
      current:
        urlParams.current ??
        ['temperature_2m', 'precipitation', 'wind_speed_10m'].join(','),
      hourly:
        urlParams.hourly ??
        ['temperature_2m', 'precipitation_probability'].join(','),
      daily: urlParams.daily ?? ['temperature_2m_mean'].join(','),
    };

    const params = new URLSearchParams(paramObj);

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }

    return response.json();
  },
};

router.get('/', async (req: Request, res: Response) => {
  const forecastData = await weatherClient.getForecast(req.params);
  const now = Date.now();
  const H = 60 * 60 * 1000;
  const filtered = forecastData.hourly.time
    .map((time: string, index: number) => ({
      time: new Date(time).getTime(),
      temp: forecastData.hourly.temperature_2m[index],
    }))
    .filter(
      (time: { time: number; temp: number }) =>
        time.time >= now - 6 * H && time.time <= now + 6 * H,
    );

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    meta,
    times: forecastData.hourly.time.length,
    filteredForcast: filtered,
    data: {
      temperature: forecastData.current.temperature_2m,
      unit: '°F',
      latitude: forecastData.latitude,
      longitude: forecastData.longitude,
    },
    forecastData,
    self: `${req.protocol}://${req.get('host')}/api/fishing`,
  });
});

export default router;
