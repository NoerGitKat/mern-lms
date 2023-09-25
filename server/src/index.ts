import app from "./app";
import { HOST, PORT } from "./constants";
import { connectDB } from "./db";

async function startServer() {
  try {
    app.listen(PORT);
    await connectDB();

    console.log(`Server started on http://${HOST}:${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

startServer();
