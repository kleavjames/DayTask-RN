import {create} from 'zustand';

interface UserState {
  fullName: string;
  setFullName: (name: string) => void;
}

export const useUserStore = create<UserState>(set => ({
  fullName: '',
  setFullName: name => set(() => ({fullName: name})),
}));
