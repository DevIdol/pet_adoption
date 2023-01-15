export interface CreateUser {
  username: String;
  email: String;
  password: String;
  profile?: String;
  verified?: Boolean;
  isAdmin?: Boolean;
}
