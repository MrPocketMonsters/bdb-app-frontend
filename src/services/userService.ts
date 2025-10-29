import { userMgmtRequest } from "./requestService";

/**
 * Request mapping for the user queries.
 * 
 * @author Nicolás Sabogal
 */
const REQUEST_MAPPING = `/api/v1/users`;

/**
 * Fetches a user by their ID.
 * 
 * @param userId - The ID of the user to fetch.
 * @return A promise that resolves to the user data.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getUserById(userId: string): Promise<any> {
    const REQUEST_URL = `${REQUEST_MAPPING}/${userId}`;
    return userMgmtRequest({
        requestName: "getUserById",
        endpoint: REQUEST_URL,
        method: "GET"
    });
}

/**
 * Fetches a user by their email.
 * 
 * @param email - The email of the user to fetch.
 * @returns The user data.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getUserByEmail(email: string): Promise<any> {
    const REQUEST_URL = `${REQUEST_MAPPING}/email`;

    return userMgmtRequest({
        requestName: "getUserByEmail",
        endpoint: REQUEST_URL,
        method: "GET",
        params: { email }
    });
}
