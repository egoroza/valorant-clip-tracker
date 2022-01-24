import React, { ReactNode } from "react";
import Head from "next/head";
import { Card, CardContent, Container, Typography } from "@mui/material";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Head>
      <title>val clip tracker | topfra.gg</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <style jsx global>{`
      body {
        background-color: #eee;
      }
    `}</style>
    <Container maxWidth="lg">
      <main>
        <Typography variant="h5" component="div">
          VALORANT Clip Tracker
        </Typography>
        <Card>
          <CardContent>{props.children}</CardContent>
        </Card>
      </main>
    </Container>
  </>
);

export default Layout;
