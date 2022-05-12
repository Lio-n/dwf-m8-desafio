import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user_localData", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

export const userState = atom({
  key: "user",
  default: { email: undefined, full_name: undefined, token: undefined },
  effects_UNSTABLE: [persistAtom],
});

export const tokenSelector = selector({
  key: "tokenSelector",
  get: async ({ get }) => {
    const { token } = get(userState);
    return token;
  },
  set: ({ set, get }, newValue: string) => {
    set(userState, {
      ...get(userState),
      token: newValue,
    });
  },
});

export const emailSelector = selector({
  key: "emailSelector",
  get: ({ get }) => {
    const { email } = get(userState);
    return email;
  },
  set: ({ set, get }, newValue: string) => {
    set(userState, {
      ...get(userState),
      email: newValue,
    });
  },
});

// * Aca guardo la Mascota que voy a editar.
// * No la que estoy por publicar/crear.
export const petState = atom({
  key: "pet",
  default: {
    full_name: undefined,
    pictureUrl: undefined,
    breed: undefined,
    color: undefined,
    sex: undefined,
    date_last_seen: undefined,
    last_location_lat: undefined,
    last_location_lng: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    id: undefined,
    published_by: undefined,
    state: undefined,
  },
});

export const petSelector = selector({
  key: "petSelector",
  get: ({ get }) => {
    return get(petState);
  },
  set: ({ set, get }, newPet: PetToUpdate) => {
    set(petState, {
      ...get(petState),
      ...newPet,
    });
  },
});

export const currentCoords = atom({
  key: "currentCoords",
  default: { lng: undefined, lat: undefined },
});

export const currentCoordsSelector = selector({
  key: "currentCoordsSelector",
  get: ({ get }) => {
    return get(currentCoords);
  },
  set: ({ set, get }, newCoords: { lng: number | undefined; lat: number | undefined }) => {
    set(currentCoords, {
      ...get(currentCoords),
      ...newCoords,
    });
  },
});
