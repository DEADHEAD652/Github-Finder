import { createContext } from "react";
import { useEffect, useState } from "react";

const GithubContext = createContext();

const GithubURL = process.env.REACT_APP_GITHUB_API;
const GithubToken = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    const response = await fetch(
      `${GithubURL}/users`
      // {
      //   headers: {
      //     Authorization: `token ${GithubToken}`,
      //   },
      // }
    );

    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
