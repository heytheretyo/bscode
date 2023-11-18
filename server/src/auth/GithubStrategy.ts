import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { createTokens } from "../utils/createToken";
import prisma from "../utils/db";

export function ActivateStrategy() {
  passport.use(
    new GitHubStrategy(
      {
        scope: ["user:follow"],
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: `http://localhost:4040/auth/github/callback`,
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) {
        if (profile.id === "32990164") {
          done(new Error("you are banned"));
          return;
        }

        try {
          let user = await prisma.user.findFirst({
            where: {
              githubId: profile.id,
            },
          });

          const data = {
            accessToken,
            displayName: profile.displayName,
            githubId: profile.id,
            photoUrl:
              profile.photos?.[0].value ||
              (profile._json as any).avatar_url ||
              "",
            profileUrl: profile.profileUrl,
            username: profile.username,
          };

          if (user) {
            await prisma.user.update({ where: { id: user.id }, data });
          } else {
            user = await prisma.user.create({
              data,
            });
          }

          done(undefined, createTokens(user));
        } catch (err) {
          console.log(err);
          done(new Error("internal error"));
        }
      }
    )
  );
}
