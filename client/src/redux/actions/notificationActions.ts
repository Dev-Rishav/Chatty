import axios from "axios";
import { Notification } from "../../interfaces/types";
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS, MARK_AS_READ, SET_NOTIFICATIONS } from "./notificationActionTypes";


// Action Creators
export const addNotification = (notification: Notification[]) => ({
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

export const setNotifications = (notifications: Notification[]) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

// Thunk: Fetch Notification History
export const fetchNotificationHistory = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get("http://localhost:8080/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch notifications");
      }

      const data:Notification[] =  response.data;
      // console.log("notifications",data);
      
      dispatch(setNotifications(data));
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };
};
