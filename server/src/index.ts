require("dotenv-safe").config();
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

import { ActivateStrategy } from "./auth/GithubStrategy";

async function main() {
  const port = process.env.PORT;

  ActivateStrategy();

  passport.serializeUser((user: any, done: any) => {
    done(null, user.accessToken);
  });

  const app = express();
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({ origin: "*", maxAge: 86400 }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    (req: any, res) => {
      if (!req.user.accessToken || !req.user.refreshToken) {
        res.send(`something went wrong`);
        return;
      }
      res.redirect(
        `${process.env.SERVER_URL}/callback/${req.user.accessToken}/${req.user.refreshToken}`
      );
    }
  );

  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on("error", console.error);
}

main();
