import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"

import prisma from '../lib/prisma';

type User = {
  name: string;
  id: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      name: true
    }
  })
  return { props: { users } }
}

type Props = {
  users: User[]
}

const ValorantClipTracker: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Valorant Clip Tracker</h1>
        <main>
          {props.users.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default ValorantClipTracker;
