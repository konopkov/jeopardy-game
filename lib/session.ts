import { User, getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
  return {
    ...session,
    user: {
      ...session.user,
      id: session.user.email,
      accessToken: token.accessToken,
    },
  };
};

export type Credentials = {
  accessToken: string;
};

export type UserSession = User & Credentials;

export const getUserSession = async (): Promise<UserSession> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });

  return authUserSession?.user;
};
