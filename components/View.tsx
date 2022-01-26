// @ts-nocheck
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  users: UserProps[];
  weapons: WeaponProps[];
  maps: MapProps[];
};

const LoadingOverlay = () => (
  <div style={{ display: "inline" }}>
    <CircularProgress size="20px" />
  </div>
);

const View = ({ users, weapons, maps }: Props) => {
  // states for uploading...

  const [title, setTitle] = useState("");
  const [clipUrl, setClipUrl] = useState("");
  const [user, setUser] = useState(users[0]);
  const [weapon, setWeapon] = useState(weapons[0]);
  const [map, setMap] = useState(maps[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [userToAdd, setUserToAdd] = useState("");

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

  const handleAddUserChange = (e) => {
    setUserToAdd(e.target.value);
  };

  const handleCloseUploadSuccess = () => {
    setShowUploadSuccess(false);
  };

  const uploadSuccessAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseUploadSuccess}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const uploadClip = async (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const body = { title, clipUrl, user, weapon, map };
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response) {
        setShowUploadSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const addUserToDatabase = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { userToAdd };
      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
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
              console.log("new map value", newValue);
              setMap(newValue);
            }}
          />
        </div>
        <div style={{ margin: "20px" }}>
          <Button variant="contained" onClick={uploadClip}>
            Upload
          </Button>
          {isLoading && (
            <div style={{ display: "inline-block", marginLeft: "15px" }}>
              <LoadingOverlay />
            </div>
          )}
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
              value={userToAdd}
              onChange={handleAddUserChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addUserToDatabase}>Add User</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={showUploadSuccess}
          autoHideDuration={6000}
          onClose={handleCloseUploadSuccess}
          message="Upload successful"
          action={uploadSuccessAction}
        />
      </Box>
    </div>
  );
};

export default View;
