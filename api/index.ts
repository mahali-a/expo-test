import { createRequestHandler } from "@expo/server/adapter/vercel";

import path from "path";

module.exports = createRequestHandler({
  build: path.join(__dirname, "../dist/server"),
});
