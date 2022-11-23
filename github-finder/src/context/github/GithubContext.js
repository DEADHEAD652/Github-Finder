import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GithubURL = "https://api.github.com/users";
//const GithubToken = "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";

export const GithubProvider = ({ children }) => {
  const initialState = { users: [], loading: false };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //get initial users
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(
      `${GithubURL}`
      // , {
      //   headers: {
      //     Authorization: `token ${GithubToken}`,
      //   },
      // }
    );

    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
