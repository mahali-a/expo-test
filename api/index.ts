#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { createRequestHandler } = require("@expo/server/adapter/express");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");

const path = require("path");

const SERVER_BUILD_DIR = path.join(process.cwd(), "dist/server");

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

process.env.NODE_ENV = "production";

app.use(morgan("tiny"));

app.all(
  "*",
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  }),
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

module.exports = app;
