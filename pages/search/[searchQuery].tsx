// @ts-nocheck
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
import { Typography, Link } from "@mui/material";

type Props = {
  clips: Array<ClipProps>;
  imgUrl: string;
  usersList: Array<UserProps>;
  weapons: Array<WeaponProps>;
  maps: Array<MapProps>;
  searchQuery: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const searchQuery = params?.searchQuery;
  const usersList = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const clips = await prisma.clip.findMany({
    where: {
      title: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
    select: {
      title: true,
      clipUrl: true,
      weapon: true,
      map: true,
      author: true,
    },
  });
  return {
    props: { usersList, clips, searchQuery: searchQuery },
  };
};

const SearchPage: React.FC<Props> = (props) => {
  const { usersList, clips, searchQuery } = props;

  return (
    <Layout>
      <UsersList users={usersList} />
      <div style={{ marginTop: "18px" }}>
        <Typography variant="h5" component="div">
          Clips matching "{searchQuery}"
        </Typography>
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {clips.length === 0 && clips.length !== 0 && (
            <Typography variant="body1" component="div">
              No clips matching that title criteria.
            </Typography>
          )}
          {clips.map((clip) => (
            <div key={clip.id}>
              <Typography variant="h6" component="div">
                {clip.title}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                <b>Weapon </b> {clip.weapon.name} |<b> Map </b>
                {clip.map.name} | <b>Player </b>{" "}
                <Link href={`/user/${clip.author.id}`} underline="hover">
                  {clip.author.name}
                </Link>
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
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
