import React, { ReactNode } from "react";
import Head from "next/head";
import { Card, CardContent, Container, Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

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
        background-color: #ddd;
      }
    `}</style>
    <Container maxWidth="lg">
      <main>
        <div style={{ textAlign: "center" }}>
          <Image
            src="/logo.png"
            alt="VALORANT Clip Tracker"
            width="800px"
            height="154px"
          />
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            m: "20px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search clips..."
            inputProps={{ "aria-label": "search VALORANT clip tracker" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Card>
          <CardContent>{props.children}</CardContent>
        </Card>
      </main>
    </Container>
  </>
);

export default Layout;
