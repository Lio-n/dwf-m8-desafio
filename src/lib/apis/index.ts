import {
  searchQueryMapboxAPI,
  checkUserEmailAPI,
  getTokenAPI,
  TokenApiParams,
  TokenApiPromise,
  updateUserAPI,
  UpdateUserParams,
  CreateUserApiParams,
  createUserApi,
} from "./api";

const searchQuery = (query: string): Promise<any[]> => searchQueryMapboxAPI(query);

const checkUser = ({ email }: { email: string }): Promise<boolean> => checkUserEmailAPI({ email });

const createUser = ({ email, full_name, password }: CreateUserApiParams): Promise<void> =>
  createUserApi({ email, full_name, password });

const authUser = ({ email, password }: TokenApiParams): Promise<TokenApiPromise> =>
  getTokenAPI({ email, password });

// ! Below here you need a TOKEN

const updateUser = ({ full_name, token, password }: UpdateUserParams): void =>
  updateUserAPI({ full_name, token, password });

export { searchQuery, checkUser, createUser, authUser, updateUser };
