import React from "react";
import { GetStaticProps } from "next";
import View from "../components/View";
import Layout from "../components/Layout";
import UsersList from "../components/UsersList";
import prisma from "../lib/prisma";

type User = {
  name: string;
  id: number;
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return { props: { users } };
};

type Props = {
  users: User[];
};

const ValorantClipTracker: React.FC<Props> = (props) => {
  return (
    <Layout>
      <UsersList users={props.users} />
      <View />
    </Layout>
  );
};

export default ValorantClipTracker;
