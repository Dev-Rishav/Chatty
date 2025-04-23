export const SET_INITIAL_ONLINE_USERS = "SET_INITIAL_ONLINE_USERS";
export const UPDATE_USER_PRESENCE = "UPDATE_USER_PRESENCE";



export const setInitialOnlineUsers = (users: Record<string, boolean>) => ({
    type: SET_INITIAL_ONLINE_USERS,
    payload: users,
  });

export const updateUserPresence = (email: string, online: boolean) => ({
  type: UPDATE_USER_PRESENCE,
  payload: { email, online },
});
