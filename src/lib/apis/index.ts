// ## ヾ(●ω●)ノ ##

const API_BASE_URL = "https://dwf-m7-looking-for-my-friend.herokuapp.com";

// # search Autocomplete
const searchQueryMapboxAPI = async (query: string): Promise<any[]> => {
  return await (
    await fetch(
      `https://api.locationiq.com/v1/autocomplete.php?key=pk.a61fe8582c7d74a674c2b16f444cf686&q=${query}&limit=3`
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

type PetToPublish = {
  full_name: string;
  pictureUrl: string;
  breed: string;
  color: string;
  sex: string;
  date_last_seen: string;
  last_location_lat: number;
  last_location_lng: number;
};
type PublishPetParams = {
  pet: PetToPublish;
  token: string;
};
// # Publish Pet
const publishPetAPI = async ({ pet, token }: PublishPetParams): Promise<void> => {
  await fetch(`${API_BASE_URL}/pet/publish`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": " *",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(pet),
  });
};

type GetPetsPromise = {
  full_name: string;
  id: number;
  pictureUrl: string;
};

// # User's Pets
const getPetsAPI = async (token: string): Promise<GetPetsPromise[]> => {
  return await (
    await fetch(`${API_BASE_URL}/pet/published-by`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": " *",
        Authorization: `bearer ${token}`,
      },
    })
  ).json();
};

// # Get One Pet
const getOnePetAPI = async ({ id, token }: { id: number; token: string }) => {
  return await (
    await fetch(`${API_BASE_URL}/pet/${id}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": " *",
        Authorization: `bearer ${token}`,
      },
    })
  ).json();
};

type UpdatePetParams = {
  pet: PetToUpdate;
  token: string;
};
// # Update One Pet
const updatePetAPI = async ({ pet, token }: UpdatePetParams): Promise<void> => {
  await fetch(`${API_BASE_URL}/pet/${pet.id}/update`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": " *",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(pet),
  });
};

// # Delete One Pet
const deletePetAPI = async ({ petId, token }: { petId: number; token: string }): Promise<void> => {
  await fetch(`${API_BASE_URL}/pet/${petId}/delete`, {
    method: "delete",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": " *",
      Authorization: `bearer ${token}`,
    },
  });
};

export {
  searchQueryMapboxAPI as searchQuery,
  checkUserEmailAPI as checkUser,
  getTokenAPI as authUser,
  updateUserAPI as updateUser,
  createUserApi as createUser,
  publishPetAPI as publishPet,
  getPetsAPI as getPets,
  getOnePetAPI as getOnePet,
  updatePetAPI as updatePet,
  deletePetAPI as deletePet,
};
