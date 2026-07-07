const initialState = {
  users: [],
  singleUser: {},
  loggedUser: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER': {
      return { ...state, users: [...state.users, action.data] }
    }

    case 'GET_USERS': {
      return { ...state, users: action.data }
    }

    case 'GET_ARTISTS': {
      return { ...state, users: action.data }
    }

    case 'DELETE_USER': {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.data.id),
      }
    }

    case 'UPDATE_USER': {
      return {
        ...state,
        loggedUser: action.data,
        singleUser: action.data,
      }
    }

    case 'UPDATE_ROLE': {
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.data.id ? { ...u, role: action.data.role } : u,
        ),
      }
    }

    case 'INIT_SINGLE_USER': {
      return { ...state, singleUser: action.data }
    }

    case 'DELETE_ARTWORK': {
      const deletedArtworkId = action.data.id

      return {
        ...state,
        users: state.users.map((user) => ({
          ...user,
          artworks: Array.isArray(user.artworks)
            ? user.artworks.filter((artwork) => artwork.id !== deletedArtworkId)
            : user.artworks,
        })),
        singleUser: {
          ...state.singleUser,
          artworks: Array.isArray(state.singleUser?.artworks)
            ? state.singleUser.artworks.filter(
                (artwork) => artwork.id !== deletedArtworkId,
              )
            : state.singleUser?.artworks,
        },
      }
    }

    default:
      return state
  }
}

export default userReducer
