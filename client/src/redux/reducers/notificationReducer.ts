import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../interfaces/types";



interface NotificationState {
  list: Notification[];
}

const initialState: NotificationState = {
  list: [],
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const index = state.list.findIndex(n => n.id === action.payload);
      if (index !== -1) state.list[index].read = true;
    },
    clearNotifications: (state) => {
      state.list = [];
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addNotification, markAsRead, clearNotifications,setNotifications } =
  notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
