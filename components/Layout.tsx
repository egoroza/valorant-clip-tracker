import React, { ReactNode, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { Card, CardContent, Container, Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryUpdate = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
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
              src="/Logo.png"
              alt="VALORANT Clip Tracker"
              width="800px"
              height="154px"
            />
          </div>
          <form
            onSubmit={() =>
              Router.push("/search/[query]", `/search/${searchQuery}`)
            }
          >
            <Paper
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
                value={searchQuery}
                onChange={handleSearchQueryUpdate}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </form>
          <Card>
            <CardContent>{props.children}</CardContent>
          </Card>
        </main>
      </Container>
    </>
  );
};

export default Layout;
