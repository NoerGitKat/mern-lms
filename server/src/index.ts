import app from "./app";
import { HOST, PORT } from "./constants";

function startServer() {
  try {
    app.listen(PORT);

    console.log(`Server started on http://${HOST}:${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

startServer();
