import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentCoordsSelector,
  emailSelector,
  petSelector,
  tokenSelector,
  userState,
} from "hooks/atoms";

// $ User STATE
export const useUser = () => useRecoilState(userState);
export const useSetUser = () => useSetRecoilState(userState);
export const useGetUser = () => useRecoilValue(userState);

// # TOKEN
export const useGetToken = () => useRecoilValue(tokenSelector);
export const useSetToken = () => useSetRecoilState(tokenSelector);

// # EMAIL
export const useGetEmail = () => useRecoilValue(emailSelector);
export const useSetEmail = () => useSetRecoilState(emailSelector);

// # PET
export const usePet = () => useRecoilState(petSelector);
export const useGetPet = () => useRecoilValue(petSelector);
export const useSetPet = () => useSetRecoilState(petSelector);

// # CURRENT COORDS
export const useCurrentCoords = () => useRecoilState(currentCoordsSelector);
export const useGetCurrentCoords = () => useRecoilValue(currentCoordsSelector);
export const useSetCurrentCoords = () => useSetRecoilState(currentCoordsSelector);
