import React, { useState, Fragment, useEffect } from "react";
import feathersClient from "./feathers";

export function PlayerRankings() {
  // const result = ;
  const [users, setUsers] = useState([] as Array<{ingame_name:string}>);

  useEffect(() => {
    (async () => {
      const result = await feathersClient.service("users").find();
      setUsers(result);
    })();

    return () => {
      // Component unmount code.
    };
  }, []);

  return (
    <>
    <h1> Player Rankings</h1>
      <ul>
          {users.map(user => <li>{user.ingame_name}</li>)}
      </ul>
    </>
  );
}
