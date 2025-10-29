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
 * Create a new user with the given email, password, and name.
 * 
 * @param email - The email of the new user.
 * @param password - The password of the user.
 * @param name - The name of the user.
 * @returns Id, email, and name of the created user.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function register(email: string, password: string, name: string): Promise<any> {
    const REQUEST_URL = `${REQUEST_MAPPING}/register`;
    return await userMgmtRequest({
        requestName: "register",
        endpoint: REQUEST_URL,
        method: "POST",
        body: { email, password, name }
    });
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
