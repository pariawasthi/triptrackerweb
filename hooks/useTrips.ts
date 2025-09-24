import { useState, useEffect } from 'react';
import { Trip } from '../types';
import { demoTrips } from '../utils/demoData';

const STORAGE_KEY = 'geo-journey-trips';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const storedTrips = localStorage.getItem(STORAGE_KEY);
      if (storedTrips) {
        return JSON.parse(storedTrips);
      } else {
        // Initialize with demo trips if nothing in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoTrips));
        return demoTrips;
      }
    } catch (error) {
      console.error('Error reading trips from localStorage:', error);
      return demoTrips;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (error) {
      console.error('Error saving trips to localStorage:', error);
    }
  }, [trips]);

  const addTrip = (trip: Trip) => {
    setTrips(prevTrips => [trip, ...prevTrips]);
  };
  
  const clearTrips = () => {
    setTrips([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { trips, addTrip, clearTrips };
};
