import { SET_INITIAL_ONLINE_USERS, UPDATE_USER_PRESENCE } from "../actions/presenceActions";

interface PresenceState {
  onlineUsers: { [email: string]: boolean };
}

const initialState: PresenceState = {
  onlineUsers: {},
};

const presenceReducer = (state = initialState, action: any): PresenceState => {
  switch (action.type) {

    case SET_INITIAL_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };

    
    case UPDATE_USER_PRESENCE:
      return {
        ...state,
        onlineUsers: {
          ...state.onlineUsers,
          [action.payload.email]: action.payload.online,
        },
      };
    default:
      return state;
  }
};

export default presenceReducer;
