'use client';

const MAX_ACTIONS = 3;
let userActions: { timestamp: Date; action: string; path: string; }[] = [];

export const trackUserAction = (action: string, path: string) => {
  userActions.unshift({ timestamp: new Date(), action, path });
  if (userActions.length > MAX_ACTIONS) {
    userActions = userActions.slice(0, MAX_ACTIONS);
  }
};

export const getUserActions = () => {
  return [...userActions];
};

export const clearUserActions = () => {
  userActions = [];
};