// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import api from "../lib/axios";

// interface LoginResponse {
//   success: boolean;
//   token: string | null;
//   errorMessage: string | null;
// }

// interface User {
//   id: number;
//   fullName: string;
//   userName: string;
//   email: string;
// }

// interface AuthState {
//   token: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<LoginResponse>;
//   logout: () => Promise<void>;
//   checkAuth: () => Promise<boolean>;
// }

// export const useAuthStore = create<AuthState>()(
//   persist((set, get) => ({
//     token: null,
//     user: null,
//     isAuthenticated: false,

//     login: async (username: string , password:string) => {
//         try {
//             const response = await api.post<LoginResponse>('/api/users/login',{
//                 userName: username,
//                 password: password
//             });
//             const { success, token, errorMessage } = response.data;

//             if (success && token) {
//                 // Set token in auth headers for subsequent requests
//                 api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                 set({ token, isAuthenticated: true });
//                 localStorage.setItem('token', token);
//               }

//               return response.data;

//         } catch (error) {
//             return {
//                 success: false,
//                 token: null,
//                  errorMessage: error.response?.data?.message || 'Failed to login'
//             };
//         }
//     },

//     logout: async () => {
//         try {
//             // Remove token from headers
//             delete api.defaults.headers.common['Authorization'];
//             set({ token: null, user: null, isAuthenticated: false });
//             localStorage.removeItem('token');
//           } catch (error) {
//             console.error('Logout error:', error);
//           }
//   },

//   checkAuth: async () => {
//     try {
//         const token = get().token || localStorage.getItem('token');

//         if (!token) {
//           await get().logout();
//           return false;
//         }

//         // Set token in headers
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//         // Try to make an authenticated request to verify token
//         // You might want to add a specific endpoint for token verification
//         // For now, we'll consider the token valid if it exists
//         set({ isAuthenticated: true, token });
//         return true;
//       } catch (error) {
//         console.error('Auth check error:', error);
//         await get().logout();
//         return false;
//       }
//   },

//   }),
// // ))
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../../lib/axios";

interface LoginResponse {
  success: boolean;
  token: string | null;
  errorMessage: string | null;
}

interface User {
  id: number;
  fullName: string;
  userName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const response = await api.post<LoginResponse>("/api/users/login", {
            userName: username,
            password: password,
          });

          const { success, token } = response.data;

          if (success && token) {
            // Set token in auth headers for subsequent requests
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            set({ token, isAuthenticated: true });
            localStorage.setItem("token", token);
          }
          console.log(response.data);

          return response.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return {
            success: false,
            token: null,
            errorMessage: error.response?.data?.message || "Failed to login",
          };
        }
      },

      logout: async () => {
        try {
          // Remove token from headers
          delete api.defaults.headers.common["Authorization"];
          set({ token: null, user: null, isAuthenticated: false });
          localStorage.removeItem("token");
        } catch (error) {
          console.error("Logout error:", error);
        }
      },

      checkAuth: async () => {
        try {
          const token = get().token || localStorage.getItem("token");

          if (!token) {
            await get().logout();
            return false;
          }

          // Set token in headers
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Try to make an authenticated request to verify token
          // You might want to add a specific endpoint for token verification
          // For now, we'll consider the token valid if it exists
          set({ isAuthenticated: true, token });
          return true;
        } catch (error) {
          console.error("Auth check error:", error);
          await get().logout();
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
