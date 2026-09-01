import app from "./app";
import env from "./config/env";
import { connectRedis } from "./config/redis";
import { connectPostgres } from "./db";

async function start() {
  try {
    await connectPostgres();
    await connectRedis();

    app.listen(env.PORT, () =>
      console.log(`server running on port ${env.PORT}`),
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
