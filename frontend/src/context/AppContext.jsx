import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { USER_ACTIONS, ACTIVITY_ACTIONS } from '../constants/actionTypes';
import apiService from '../utils/api';

const AppContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
  activities: [],
  filters: { category: 'all', difficulty: 'all' },
  userProgress: { points: 0, completedActivities: [], achievements: [], level: 'Beginner' }
};

function appReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return { ...state, user: action.payload, loading: false, error: null };
    case USER_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case USER_ACTIONS.LOGOUT:
      return { ...initialState, loading: false };
    case ACTIVITY_ACTIONS.SET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case ACTIVITY_ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIVITY_ACTIONS.ADD_ACTIVITY:
      const activityId = action.payload._id || action.payload.id;
      if (state.userProgress.completedActivities.includes(activityId)) {
        return state;
      }
      return { 
        ...state, 
        userProgress: {
          ...state.userProgress,
          points: state.userProgress.points + action.payload.points,
          completedActivities: [...state.userProgress.completedActivities, activityId]
        }
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PROGRESS':
      return { ...state, userProgress: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch({ type: USER_ACTIONS.SET_USER, payload: JSON.parse(user) });
      apiService.setToken(token);
    }
  }, []);

  const value = {
    state,
    dispatch,
    actions: {
      setUser: (user) => {
        dispatch({ type: USER_ACTIONS.SET_USER, payload: user });
        localStorage.setItem('user', JSON.stringify(user));
      },
      setLoading: (loading) => dispatch({ type: USER_ACTIONS.SET_LOADING, payload: loading }),
      logout: () => {
        dispatch({ type: USER_ACTIONS.LOGOUT });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        apiService.logout();
      },
      setFilters: (filters) => dispatch({ type: ACTIVITY_ACTIONS.SET_FILTERS, payload: filters }),
      addActivity: (activity) => dispatch({ type: ACTIVITY_ACTIONS.ADD_ACTIVITY, payload: activity }),
      setActivities: (activities) => dispatch({ type: ACTIVITY_ACTIONS.SET_ACTIVITIES, payload: activities }),
      setProgress: (progress) => dispatch({ type: 'SET_PROGRESS', payload: progress })
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};