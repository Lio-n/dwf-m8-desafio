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
