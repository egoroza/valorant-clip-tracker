// @ts-nocheck
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

type Props = {
  users: UserProps[];
  weapons: WeaponProps[];
  maps: MapProps[];
};

const View = ({ users, weapons, maps }: Props) => {
  // states for uploading...

  const [title, setTitle] = useState("");
  const [clipUrl, setClipUrl] = useState("");
  const [user, setUser] = useState(users[0]);
  const [weapon, setWeapon] = useState(weapons[0]);
  const [map, setMap] = useState(maps[0]);

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [userToAdd, setUserToAdd] = useState(null);

  const handleAddUserClickOpen = () => {
    setAddUserModalOpen(true);
  };

  const handleAddUserClickClose = () => {
    setAddUserModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClipUrlChange = (e) => {
    setClipUrl(e.target.value);
  };

  const addUserToDatabase = (value) => {
    console.log(value);
    setAddUserModalOpen(false);
  };

  return (
    <div style={{ margin: "8px" }}>
      <Typography variant="h6">
        Hey there, carry! Got a clip to upload?
      </Typography>
      <Typography variant="body2">Upload your clip below. 😎</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "95%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="clip-title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            required
            id="clip-url"
            label="GDrive Clip URL"
            value={clipUrl}
            onChange={handleClipUrlChange}
          />

          <Autocomplete
            disablePortal
            id="user"
            options={users}
            getOptionLabel={(user) => user.name}
            renderInput={(params) => <TextField {...params} label="User" />}
            value={user}
            onChange={(event, newValue) => {
              setUser(newValue);
            }}
          />

          <Autocomplete
            disablePortal
            id="weapon"
            options={weapons}
            getOptionLabel={(weapon) => weapon.name}
            renderInput={(params) => <TextField {...params} label="Weapon" />}
            value={weapon}
            onChange={(event, newValue) => {
              setWeapon(newValue);
            }}
          />

          <Autocomplete
            disablePortal
            id="map"
            options={maps}
            getOptionLabel={(map) => map.name}
            renderInput={(params) => <TextField {...params} label="Map" />}
            value={map}
            onChange={(event, newValue) => {
              setMap(newValue);
            }}
          />
        </div>
        <div style={{ margin: "20px" }}>
          <Button
            variant="contained"
            onClick={() => console.log(title, clipUrl, user, weapon, map)}
          >
            Upload
          </Button>
        </div>
        <div style={{ margin: "20px" }}>
          <Button color="primary" onClick={handleAddUserClickOpen}>
            My name isn't on this list!
          </Button>
        </div>
        <Dialog open={addUserModalOpen} onClose={handleAddUserClickClose}>
          <DialogTitle>Add a user?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ooh, another top fragger! Let's get you added to our database! ✨
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addUserToDatabase}>Add User</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default View;
