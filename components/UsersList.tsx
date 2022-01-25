import React from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

type UserProps = {
  name: string;
  id: number;
};

type Props = {
  users: UserProps[];
};

const UsersList = ({ users }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Button href="/">
        <FileUploadIcon fontSize="small" />
      </Button>
      <ButtonGroup variant="text">
        {users.map((user) => (
          <Button key={user.id} href={`/user/${user.id}`}>
            {user.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default UsersList;
