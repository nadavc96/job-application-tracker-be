export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

export type PublicUser = {
  id: string;
  email: string;
};
