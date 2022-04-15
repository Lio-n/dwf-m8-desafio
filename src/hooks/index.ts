import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { emailSelector, tokenSelector, userState } from "hooks/atoms";

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
