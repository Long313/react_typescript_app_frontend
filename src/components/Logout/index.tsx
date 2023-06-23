import { useEffect } from "react";
function Logout() {
  useEffect(() => {
    localStorage.removeItem("loggedInUser");
  }, []);
  return <></>;
}

export default Logout;
