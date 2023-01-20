export interface CreateUser {
  username: String;
  email: String;
  password: String;
  profile?: String;
  favorites?: any[];
  verified?: Boolean;
  isAdmin?: Boolean;
}
