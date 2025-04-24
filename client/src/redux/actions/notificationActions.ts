// Action Types
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const MARK_AS_READ = "MARK_AS_READ";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

// Action Creators
export const addNotification = (notification:any) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const markAsRead = (notificationId:any) => ({
  type: MARK_AS_READ,
  payload: notificationId,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});
