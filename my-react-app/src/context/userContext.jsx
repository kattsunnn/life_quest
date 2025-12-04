import { createContext, useContext, useEffect, useReducer } from "react"
import userApi from "../api/user"

const UserContext = createContext();
const UserDispatchContext = createContext();

const userReducer = (user, action) => {
  switch (action.type) {
    case "user/init":
      return action.user;
    case "user/add/coin":
      return {...user, coins: user.coins + action.amount };
    case "user/sub/coin":
      return {...user, coins: user.coins - action.amount };
    case "user/add/level":
      return {...user, level: user.level + action.amount };
    case "user/add/exp":
      return {...user, exp: user.exp + action.amount };
    case "user/add/ticket":
      return {  ...user,
                tickets: { ...user.tickets, [action.ticketType]: user.tikets[action.ticketType] + action.amount } };    
    case "user/sub/ticket":
      return {  ...user,
                tickets: { ...user.tickets, [action.ticketType]: user.tikets[action.ticketType] - action.amount } };
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

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext)
const useDispatchuser = () => useContext(UserDispatchContext)

export { useUser, useDispatchuser, UserProvider };

