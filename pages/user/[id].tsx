import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import UsersList from "../../components/UsersList";
import prisma from "../../lib/prisma";
import { UserProps } from "../../prop-types/props";

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
      <h2>{props.name}</h2>
      {props.clips.map((clip) => (
        <div>
          <h3>{clip.title}</h3>
          <iframe
            src={clip.clipUrl}
            width="440"
            height="280"
            allow="autoplay"
          ></iframe>
          Weapon: {clip.weaponId}, Map: {clip.mapId}
        </div>
      ))}
    </Layout>
  );
};

export default UserPage;
