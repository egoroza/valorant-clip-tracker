import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import UsersList from "../../components/UsersList";
import prisma from "../../lib/prisma";
import { UserProps } from "../../prop-types/props";
import { Typography } from "@mui/material";

// move to someplace better
type ClipProps = {
  id: number;
  title: string;
  clipUrl: string;
  weaponId: number;
  mapId: number;
};

type Props = {
  name: string;
  clips: Array<ClipProps>;
  imgUrl: string;
  usersList: Array<UserProps>;
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
      clips: true,
      imgUrl: true,
    },
  });
  return {
    props: { ...user, usersList },
  };
};

const UserPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <UsersList users={props.usersList} />
      <Typography variant="h5" component="div">
        {props.name} Clips
      </Typography>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {props.clips.length === 0 && (
          <Typography variant="body2" component="div">
            {props.name} doesn't have any clips... yet!
          </Typography>
        )}
        {props.clips.map((clip) => (
          <div key={clip.id}>
            <Typography variant="h6" component="div">
              {clip.title}
            </Typography>
            <Typography variant="body2">
              Weapon: {clip.weaponId}, Map: {clip.mapId}
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
    </Layout>
  );
};

export default UserPage;
