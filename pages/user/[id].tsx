import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import UsersList from "../../components/UsersList";
import prisma from "../../lib/prisma";
import {
  UserProps,
  ClipProps,
  WeaponProps,
  MapProps,
} from "../../prop-types/props";
import { Typography, Autocomplete, TextField } from "@mui/material";

type Props = {
  name: string;
  clips: Array<ClipProps>;
  imgUrl: string;
  usersList: Array<UserProps>;
  weapons: Array<WeaponProps>;
  maps: Array<MapProps>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const usersList = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    select: {
      name: true,
      clips: {
        select: {
          title: true,
          clipUrl: true,
          weaponId: true,
          mapId: true,
          weapon: true,
          map: true,
        },
      },
      imgUrl: true,
    },
  });
  const weapons = await prisma.weapon.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const maps = await prisma.map.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return {
    props: { ...user, usersList, weapons, maps },
  };
};

const UserPage: React.FC<Props> = (props) => {
  const { usersList, name, weapons, maps, clips } = props;
  const [displayClips, setDisplayClips] = useState(clips);
  const [filteredWeapons, setFilteredWeapons] = useState(weapons);
  const [filteredMaps, setFilteredMaps] = useState(maps);

  useEffect(() => {
    if (clips) {
      const filteredClips = clips.filter(
        (clip) =>
          filteredWeapons.some((weapon) => weapon.id === clip.weaponId) &&
          filteredMaps.some((map) => map.id === clip.mapId)
      );
      setDisplayClips(filteredClips);
    }
  }, [filteredWeapons, filteredMaps]);

  const handleWeaponsFilter = (e, values) => {
    setFilteredWeapons(values);
  };

  const handleMapsFilter = (e, values) => {
    setFilteredMaps(values);
  };

  return (
    <Layout>
      <UsersList users={usersList} />
      <div style={{ marginTop: "18px" }}>
        <Typography variant="h5" component="div">
          {name} Clips
        </Typography>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%", margin: "8px" }}>
            <Autocomplete
              multiple
              limitTags={2}
              id="Filter by Weapon"
              options={weapons}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Filter by Weapon"
                />
              )}
              value={filteredWeapons}
              onChange={handleWeaponsFilter}
            />
          </div>
          <div style={{ width: "50%", margin: "8px" }}>
            <Autocomplete
              multiple
              limitTags={2}
              id="Filter by Map"
              options={maps}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Filter by Map"
                />
              )}
              value={filteredMaps}
              onChange={handleMapsFilter}
            />
          </div>
        </div>
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ClipGrid name={name} clips={clips} displayClips={displayClips} />
        </div>
      </div>
    </Layout>
  );
};

const ClipGrid = ({ name, clips, displayClips }) => {
  if (!name)
    return (
      <Typography variant="body1" component="div">
        Sorry, this user does not exist!
      </Typography>
    );
  return (
    <>
      {" "}
      {clips.length === 0 && (
        <Typography variant="body1" component="div">
          {name} doesn't have any clips... yet!
        </Typography>
      )}
      {displayClips.length === 0 && clips.length !== 0 && (
        <Typography variant="body1" component="div">
          {name} doesn't have any clips matching that criteria.
        </Typography>
      )}
      {displayClips.map((clip) => (
        <div key={clip.id}>
          <Typography variant="h6" component="div">
            {clip.title}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            <b>Weapon </b> {clip.weapon?.name} |<b> Map </b>
            {clip.map?.name}
          </Typography>
          <div
            style={{
              margin: "5px",
              borderRadius: "25px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={clip.clipUrl}
              width="440"
              height="280"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserPage;
