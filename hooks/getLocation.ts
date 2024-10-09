import { useState, useEffect } from "react";

interface LocationData {
  lat: number;
  lon: number;
}

interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: LocationData | null;
}

export const useGeoLocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    location: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        location: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    };

    const geoOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    // Only request location if we haven't got it yet
    if (!state.location && state.loading) {
      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
        geoOptions
      );
    }

    // No cleanup function needed as we're not setting up any persistent listeners
  }, [state.location, state.loading]);

  return state;
};
