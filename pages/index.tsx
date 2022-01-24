import React from "react";
import { GetStaticProps } from "next";
import View from "../components/View";
import Layout from "../components/Layout";
import UsersList from "../components/UsersList";
import prisma from "../lib/prisma";
import { UserProps, WeaponProps, MapProps } from "../prop-types/props";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
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
  return { props: { users, weapons, maps } };
};

type Props = {
  users: UserProps[];
  weapons: WeaponProps[];
  maps: MapProps[];
};

const ValorantClipTracker: React.FC<Props> = (props) => {
  return (
    <Layout>
      <UsersList users={props.users} />
      <View users={props.users} weapons={props.weapons} maps={props.maps} />
    </Layout>
  );
};

export default ValorantClipTracker;
