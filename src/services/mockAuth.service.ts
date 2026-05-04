

/* =========================================================
   MOCK AUTH SERVICE (Backend Simulation Layer)
   - Simulates real API behavior
   - Matches future JWT backend structure
   - Replace with real API later without breaking app
   ========================================================= */

import type { UserRole, AuthUser } from "../store/auth.store";

/**
 * DTO for login request
 */
export type LoginDTO = {
  email: string;
  password: string;
  role: UserRole;
};

/**
 * Auth response (simulates backend response)
 */
export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

/**
 * Simulate network delay
 */
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock Auth Service
 */
export const mockAuthService = {
  /**
   * LOGIN (simulate backend auth)
   */
login: async (data: LoginDTO): Promise<AuthResponse> => {
  await delay(700);

  if (!data.email || !data.password) {
    throw new Error("Email and password are required");
  }

  const user: AuthUser = {
    id: "mock-user-1",
    name: "Demo User",
    roles: [data.role],
    activeRole: data.role,
    roleRequests: [],
  };

  const response: AuthResponse = {
    user,
    accessToken: "mock-access-token-123456",
  };

  // ✅ SAVE SESSION (THIS IS THE CRITICAL PART)
  localStorage.setItem("mock_user", JSON.stringify(user));
  localStorage.setItem("mock_token", response.accessToken);

  return response;
},

  /**
   * GET CURRENT USER (simulate /me endpoint)
   */
  me: async (): Promise<AuthUser> => {
    await delay(300);

    const stored = localStorage.getItem("mock_user");

    if (!stored) {
      throw new Error("No active session");
    }

    return JSON.parse(stored);
  },

  /**
   * LOGOUT (simulate backend logout)
   */
  logout: async (): Promise<boolean> => {
    await delay(200);
    return true;
  },
};