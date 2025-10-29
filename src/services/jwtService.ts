import { jwtDecode } from 'jwt-decode';

/**
 * Checks if the given token is valid.
 * 
 * @param token - The JWT token to validate.
 * @returns True if the token is valid, false otherwise.
 */
export function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000; // seconds
    return decoded.exp && decoded.exp > now;
  } catch (error) {
    // If user is not logged in or token is invalid
    return false;
  }
}

/**
 * Retrieves the JWT token from localStorage.
 * 
 * @returns The JWT token from localStorage or null if not found.
 */
export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * Obtains the roles of the user from the JWT token stored in localStorage.
 *
 * @returns The roles of the user from the JWT token stored in localStorage or null if no token is present or it cannot be decoded.
 * @author Nicolás Sabogal
 */
export const getRoles = (): string[] | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.roles || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Obtains the 'sub' of the user from the JWT token stored in localStorage.
 *
 * @returns The 'sub' of the user from the JWT token stored in localStorage or null if no token is present or it cannot be decoded.
 */
export const getSub = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
