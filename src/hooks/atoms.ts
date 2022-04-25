import { atom, selector } from "recoil";

export const userState = atom({
  key: "user",
  default: { email: undefined, full_name: undefined, token: undefined },
});

export const tokenSelector = selector({
  key: "tokenSelector",
  get: async ({ get }) => {
    const { token } = get(userState);

    if (!!token) {
    }
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
  },
});

export const petSelector = selector({
  key: "petSelector",
  get: ({ get }) => {
    return get(petState);
  },
  set: ({ set, get }, newPet: Pet) => {
    set(petState, {
      ...get(petState),
      ...newPet,
    });
  },
});

/* export const getTokenSelector = selectorFamily({
  key: "getTokenSelector",
  get:
    (password: string) =>
    async ({ get }) => {
      if (!!password) {
        const [user, setUser] = useUser();

        const { token, full_name } = await getTokenAPI({ email: user.email, password });

        setUser({ email: user.email, token, full_name });
        return true;
      }
      return;
    },
});
 */
