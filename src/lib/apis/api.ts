// ## ヾ(●ω●)ノ ##

const API_BASE_URL = "https://dwf-m7-looking-for-my-friend.herokuapp.com";

const searchQueryMapboxAPI = async (query: string) => {
  return await (
    await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${query}&format=json&limit=3`
    )
  ).json();
};
// # Check If User Exists.
const checkUserEmailAPI = async ({ email }: { email: string }): Promise<boolean> => {
  return await (await fetch(`${API_BASE_URL}/exists/${email}`)).json();
};

type CreateUserApiParams = { email: string; full_name: string; password: string };
// # Creater User.
const createUserApi = async ({
  email,
  full_name,
  password,
}: CreateUserApiParams): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, full_name, password }),
  });
};

type TokenApiParams = { email: string; password: string };
type TokenApiPromise = { token: string; full_name: string };
// # Auth User : Return TOKEN
const getTokenAPI = async ({ email, password }: TokenApiParams): Promise<TokenApiPromise> => {
  const res = await (
    await fetch(`${API_BASE_URL}/auth/token`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  ).json();

  return { token: res.isToken, full_name: res.full_name };
};

// ! Below here you need a TOKEN

type UpdateUserParams = { full_name: string; token: string; password: string };
// # Update User.
const updateUserAPI = ({ full_name, token, password }: UpdateUserParams): void => {
  fetch(`${API_BASE_URL}/user/update`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ full_name, password }),
  });
};

export {
  searchQueryMapboxAPI,
  checkUserEmailAPI,
  getTokenAPI,
  updateUserAPI,
  UpdateUserParams,
  TokenApiParams,
  TokenApiPromise,
  CreateUserApiParams,
  createUserApi,
};
