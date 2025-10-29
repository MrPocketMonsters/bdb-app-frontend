import { courseMgmtRequest } from "./requestService";

/**
 * Request mapping for the user history queries.
 * 
 * @author Nicolás Sabogal
 */
const REQUEST_MAPPING = `/api/v1/userhistories`;

/**
 * User history entry interface.
 * 
 * @author Nicolás Sabogal
 */
export interface UserHistoryEntry {
  id: number,
  userId: number,
  courseId: number,
  order: number,
  startedAt: Date,
  completedAt: Date
}

/**
 * User recognition entry interface.
 * 
 * @author Nicolás Sabogal
 */
export interface UserRecognitionEntry {
    id: number,
    courseId: number,
    courseName: string,
    createdAt: Date
}

/**
 * Fetches the user history by user ID.
 * 
 * @param userId - The ID of the user whose history to fetch.
 * @return A promise that resolves to the user history data with Date objects for timestamps.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getUserHistoryByUserId(userId: string): Promise<UserHistoryEntry[]> {
    const REQUEST_URL = `${REQUEST_MAPPING}/${userId}/`;
    const response = await courseMgmtRequest({
        requestName: "getUserHistoryByUserId",
        endpoint: REQUEST_URL,
        method: "GET"
    });
    
    // Convert ISO string timestamps to Date objects
    return response.map((entry: any) => ({
        ...entry,
        startedAt: new Date(entry.startedAt),
        completedAt: new Date(entry.completedAt)
    }));
}

/**
 * Fetches all user recognitions by user ID.
 * 
 * @param userId - The ID of the user whose recognitions to fetch.
 * @return A promise that resolves to the user recognition data with Date objects for timestamps.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getAllUserRecognitionsByUserId(userId: string): Promise<UserRecognitionEntry[]> {
    const REQUEST_URL = `${REQUEST_MAPPING}/${userId}/courses`;
    const response = await courseMgmtRequest({
        requestName: "getAllUserRecognitionsByUserId",
        endpoint: REQUEST_URL,
        method: "GET"
    });

    // Convert ISO string timestamps to Date objects
    return response.map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt)
    }));
}
