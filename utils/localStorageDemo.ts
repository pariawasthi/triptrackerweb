import { Trip, Expense, Suggestion } from '../types';
import { demoTrips, demoExpenses, demoSuggestions } from './demoData';

const TRIPS_KEY = 'trips';
const EXPENSES_KEY = 'expenses';
const SUGGESTIONS_KEY = 'suggestions';

export const initializeDemoData = () => {
  if (!localStorage.getItem(TRIPS_KEY)) {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(demoTrips));
  }
  if (!localStorage.getItem(EXPENSES_KEY)) {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(demoExpenses));
  }
  if (!localStorage.getItem(SUGGESTIONS_KEY)) {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(demoSuggestions));
  }
};

export const getTrips = (): Trip[] => {
  const data = localStorage.getItem(TRIPS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTrip = (trip: Trip) => {
  const trips = getTrips();
  trips.push(trip);
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const getExpenses = (): Expense[] => {
  const data = localStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getSuggestions = (): Suggestion[] => {
  const data = localStorage.getItem(SUGGESTIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearAllData = () => {
  localStorage.removeItem(TRIPS_KEY);
  localStorage.removeItem(EXPENSES_KEY);
  localStorage.removeItem(SUGGESTIONS_KEY);
};
