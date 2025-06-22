// reducer.ts
import { ADD_NOTIFICATION, MARK_AS_READ, CLEAR_NOTIFICATIONS, SET_NOTIFICATIONS } from '../actions/notificationActionTypes';
import { Notification } from "../../interfaces/types";

interface NotificationState {
  list: Notification[];
}

const initialState: NotificationState = {
  list: [],
};

const notificationReducer = (state = initialState, action: any): NotificationState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case MARK_AS_READ:
      return {
        ...state,
        list: state.list.map((notification) =>
          notification.id === action.payload ? { ...notification, read: true } : notification
        ),
      };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        list: [],
      };

    case SET_NOTIFICATIONS:
      // console.log("reducer not", action.payload); // Log for debugging
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
