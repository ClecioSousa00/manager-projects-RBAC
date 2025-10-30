// import express from "express";
import { app } from "./app.ts";
import { env } from "./env.ts";

// const app = express();

app.get("/health", (_, res) => {
  res.send("OK");
});

app.listen(env.PORT, () => {
  console.log("Server is Running!!");
});
