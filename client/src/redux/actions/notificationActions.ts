import axios from "axios";

// Action Types
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const MARK_AS_READ = "MARK_AS_READ";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// Action Creators
export const addNotification = (notification: any) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const markAsRead = (notificationId: any) => ({
  type: MARK_AS_READ,
  payload: notificationId,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});

export const setNotifications = (notifications: any[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

// Thunk: Fetch Notification History
export const fetchNotificationHistory = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const token = getState().auth.token; // adjust path if needed
      const response = await axios.get("http://localhost:8080/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.data;
      console.log("notifications",data);
      
      dispatch(setNotifications(data));
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };
};
