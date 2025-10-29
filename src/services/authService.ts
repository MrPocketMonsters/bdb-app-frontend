import { userMgmtRequest } from "./requestService";
import { getToken, isTokenValid } from "./jwtService";

/**
 * Request mapping for the authentication queries.
 * 
 * @author Nicolás Sabogal
 */
const REQUEST_MAPPING = `/api/v1/auth`;

/**
 * Logs in a user with the given email and password.
 *
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @return true if the login was successful, false otherwise.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function login(email: string, password: string): Promise<void> {
    const REQUEST_URL = `${REQUEST_MAPPING}/login`;
    const response = await userMgmtRequest({
        requestName: "login",
        endpoint: REQUEST_URL,
        method: "POST",
        body: { email, password }
    });

    localStorage.setItem("authToken", response.token);
}

/**
 * Checks if the user is logged in.
 * 
 * @returns True if the user is logged in, false otherwise.
 */
export function isLoggedIn(): boolean {
  const token = getToken();
  console.log("isLoggedIn:", token != null && isTokenValid(token));
  return token != null && isTokenValid(token);
}

/**
 * Logs out the user by removing the JWT token from localStorage.
 */
export const logout = (): void => {
  localStorage.removeItem("authToken");
};
