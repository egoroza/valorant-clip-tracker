import React from "react";
import { Button } from "@mui/material";

type UserProps = {
  name: string;
  id: number;
};

type Props = {
  users: UserProps[];
};

const UsersList = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
        <Button key={user.id} href={`/user/${user.id}`}>
          {user.name}
        </Button>
      ))}
    </>
  );
};

export default UsersList;
