import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GithubURL = process.env.REACT_APP_GITHUB_API;
const GithubToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = { users: [], loading: false };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GithubURL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GithubToken}`,
      },
    });

    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  // clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
