import { createContext, useContext, useEffect, useReducer } from "react"
import userApi from "../api/user"

const UserContext = createContext();
const UserDispatchContext = createContext();
const UserActionsContext = createContext();

function userServerToClient(user) {
    const mapping = {
        tickets_very_hard: "ticketsVeryHard",
        tickets_hard: "ticketsHard",
        tickets_normal: "ticketsNormal",
        tickets_easy: "ticketsEasy",
        tickets_very_easy: "ticketsVeryEasy",
        created_at: "createdAt",
        updated_at: "updatedAt",
    };
    const result = { ...user };
    for (const [serverKey, clientKey] of Object.entries(mapping)) {
        if (user[serverKey] !== undefined) {
            result[clientKey] = user[serverKey];
        }
    }
    return result;
}

function userClientToServer(user) {
    const mapping = {
        ticketsVeryHard: "tickets_very_hard",
        ticketsHard: "tickets_hard",
        ticketsNormal: "tickets_normal",
        ticketsEasy: "tickets_easy",
        ticketsVeryEasy: "tickets_very_easy",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };
    const result = { ...user };
    for (const [clientKey, serverKey] of Object.entries(mapping)) {
        if (user[clientKey] !== undefined) {
            result[serverKey] = user[clientKey];
        }
    }
    return result;
}

const DIFFICULTY_NAME_MAP = {
    1: 'ticketsVeryEasy',
    2: 'ticketsEasy',
    3: 'ticketsNormal',
    4: 'ticketsHard',
    5: 'ticketsVeryHard',
}


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
    const userId = 4;

    useEffect(() => {
        userApi.get(userId).then(res => {
            dispatch({ type: "user/init", user: userServerToClient(res)})
        })
    }, [])

    const actions = {
      
      addCoins: async (amount) => {
        const res = await userApi.patch(userId, {coins: user.coins + amount})
        dispatch({ type: "user/patch", user: userServerToClient(res) })
      },
      subCoins: async (amount) => {
        const res = await userApi.patch(userId, {coins: user.coins - amount})
        dispatch({ type: "user/patch", user: userServerToClient(res) })
      },
      addTickets: async (difficulty, amount) => {
        const difficultyName = DIFFICULTY_NAME_MAP[difficulty]
        const currentTickets = user[difficultyName]
        const updates = { [difficultyName]: currentTickets + amount }
        const res =  await userApi.patch(userId, userClientToServer(updates))
        dispatch({ type:"user/patch", user: userServerToClient(res)})
      },
      subTickets: async (difficulty, amount) => {
        const difficultyName = DIFFICULTY_NAME_MAP[difficulty]
        const currentTickets = user[difficultyName]
        const updates = { [difficultyName]: currentTickets - amount }
        const res =  await userApi.patch(userId, userClientToServer(updates))
        dispatch({ type:"user/patch", user: userServerToClient(res)})
      },
      hasEnoughCoins: (price) => {
        return user.coins >= price
      },
      hasEnoughTickets: (difficulty) => {
        const difficultyName = DIFFICULTY_NAME_MAP[difficulty]
        return user[difficultyName] > 0
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

