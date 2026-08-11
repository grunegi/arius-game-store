import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            user: {},
            isLoggedIn: false,

             updateUser: (newData) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        ...newData,
                    },
            })),

            login: (user) => 
                set({
                    user,
                    isLoggedIn: true,
                }),
            
            logout: () => 
                set({
                    user: null,
                    isLoggedIn: false,
                }),
        }),

        {
            name: "auth_storage",
        }
    )
);

export default useAuthStore;