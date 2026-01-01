import { createContext, useContext, useEffect, useReducer } from "react"
import userApi from "../api/user"

const UserContext = createContext();
const UserDispatchContext = createContext();
const UserActionsContext = createContext();

const userReducer = (user, action) => {
  switch (action.type) {
    case "user/init":
      return action.user;
    case "user/patch":
      return action.user;
    default:
      return user;
  }
};

const UserProvider = ({children}) => {
    const [ user, dispatch ] = useReducer(userReducer, [])
    const userId = 1;

    useEffect(() => {
        userApi.get(userId).then(userData => {
            dispatch({ type: "user/init", user: userData})
        })
    }, [])

    const actions = {
      addCoins: async (amount) => {
        const userData = await userApi.patch(userId, {coins: user.coins + amount})
        dispatch({ type: "user/patch", user: userData })
      },

      subCoins: async (amount) => {
        const userData = await userApi.patch(userId, {coins: user.coins - amount})
        dispatch({ type: "user/patch", user: userData })
      }
    }

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                <UserActionsContext.Provider value={actions}>
                    {children}
                </UserActionsContext.Provider>
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext)
const useDispatchuser = () => useContext(UserDispatchContext)
const useUserActions = () => useContext(UserActionsContext)

export { useUser, useDispatchuser, useUserActions, UserProvider };

