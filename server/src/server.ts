import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler, {
  reqErrorHandler,
} from "@/common/middleware/errorHandler";
import requestLogger from "./common/middleware/requestLogger";
import { authRouter } from "./routes/auth/auth.routes";

import cookieParser from "cookie-parser";

import session from "express-session";

import { env } from "./common/utils/envConfig";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import {
  Strategy as FacebookStrategy,
  VerifyFunction,
  Profile as FacebookProfile,
} from "passport-facebook";
import { asyncHandler } from "./utils/asyncHandler";
import { db } from "./db/client";
import { sql } from "drizzle-orm";
import { adminRouter } from "./routes/admin/admin.routes";
import { seedUsers } from "./scripts/dummy-user-creation";
import { seedSocietyMembers } from "./scripts/dummy-societies";

const app: Express = express();

app.set("trust proxy", true);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  }),
);
app.use(helmet());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

interface User {
  name: string;
  email: string;
  photo: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.REDIRECT_URI,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void,
    ) => {
      try {
        const user: User = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value || "",
          photo: profile.photos?.[0]?.value || "",
        };

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

const verifyCallback: VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: FacebookProfile,
  done: (error: any, user?: any) => void,
): void => {
  try {
    const user: User = {
      name: profile.displayName,
      email: profile.emails?.[0]?.value || "",
      photo: profile.photos?.[0]?.value || "",
    };

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

db.execute(
  sql`
   select * from users
  `,
).then((user) => {
  console.log("====================================");
  console.log(user.rows);
  console.log("====================================");
});

passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_CLIENT_ID || "",
      clientSecret: env.FACEBOOK_CLIENT_SECRET || "",
      callbackURL: env.FACEBOOK_CALLBACK_URL || "",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    verifyCallback,
  ),
);

passport.serializeUser((user: any, done: (error: any, id?: any) => void) => {
  done(null, user);
});

passport.deserializeUser(
  (user: User, done: (error: any, user?: any) => void) => {
    done(null, user);
  },
);

// seedSocietyMembers({
//   societyId: "20f7c068-4df5-42cd-8953-829721814c67",
//   userIds: [
//     "bdeaf858-2a78-4b22-9b27-a9d4ff284335",
//     "1a01c852-011b-49d4-9862-81978fca049a",
//     "0376a9d5-d087-4b75-a741-473c925340c0",
//     "6782bcea-b27b-49e9-85fa-e78d82bcef74",
//     "e3177109-92d9-4aa8-bc77-88a09197acdc",
//     "87ea6031-975e-41d7-88cc-faeb7a213476",
//     "fd1233d9-28e9-444e-bf00-8cf886202d10",
//     "ae3685e3-4aad-4f05-a5cb-e153a3b069fa",
//     "b91d031b-52d9-495e-9dee-5e7f4f553126",
//     "d78a22f3-ca5d-4aca-9c85-4b9c0ddee9c7",
//     "847c6eab-7af5-44be-aaaf-ad696809731a",
//     "f39970bb-22b2-44d4-89d3-990bff859cb2",
//     "64692788-88f9-4f87-ab70-c8d8af8ded5a",
//     "2f2f7b7d-81bc-4f5b-8aab-3e1dc8903729",
//     "2897042b-2750-4d3c-9f73-46d8c0dd8d64",
//     "17fd27b2-6dc6-4f89-9391-d646ea17c4ef",
//     "4addec72-b806-43be-8900-3097ca9fffad",
//     "58843101-0466-44c2-abae-f4a1a5e18018",
//     "96fce33a-069a-49ee-968f-7fad795d0d19",
//     "8632fb92-a448-46a5-9ea0-93a5b5043d26",
//     "f19f259c-5d28-47b8-b936-5bb5e3844b32",
//     "242ab1a2-981f-40c9-a310-e9e578dbda2f",
//     "ebea6523-8d6b-408b-ad70-2619c028f106",
//     "39616c00-ccfb-44d3-a060-f6af1db717cf",
//     "f6a29d6d-ba74-43ce-a9f0-a4f38feb6fac",
//     "7d848b01-0ea2-4cf5-a5ed-a2c84df824bb",
//     "5d8e67c3-c769-41b6-acd8-d15242288323",
//     "0d66a34a-acdb-428a-949b-d48b00d254c4",
//     "2da03c33-37cd-4a5a-84b7-5d06009de2d4",
//     "1fa4281a-467d-4145-ba39-d3def58e5f6e",
//     "319a28b0-8902-41b3-a2ae-c8efdf4051b6",
//     "261344ff-f2d3-4f75-88da-292c978f0924",
//   ],
// });

app.use(requestLogger);

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());
app.use(reqErrorHandler);

export { app };
