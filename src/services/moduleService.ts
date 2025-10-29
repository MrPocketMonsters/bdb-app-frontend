import { courseMgmtRequest } from "./requestService";

/**
 * Request mapping for the user history queries.
 * 
 * @author Nicolás Sabogal
 */
const REQUEST_MAPPING = `/api/v1/modules`;

/**
 * Paginated modules response interface.
 * Includes total elements, total pages, number of elements, size, and content array.
 * Content array contains module objects with id and name.
 * 
 * @author Nicolás Sabogal
 */
export interface PaginatedModulesResponse {
  "totalElements": number,
  "totalPages": number,
  "numberOfElements": number,
  "size": number,
  "content": [
    {
      "id": number,
      "name": string
    },
    {
      "id": number,
      "name": string
    }
  ],
}

/**
 * Contains module details.
 * Also includes an array of courses within the module, each with its own id and name.
 * 
 * @author Nicolás Sabogal
 */
export interface ModuleDetails {
  "id": number,
  "name": string,
  "description": string,
  "courses": Array<{
    "id": number,
    "name": string
  }>,
  "createdBy": string
}

/**
 * Retrieves a paginated list of modules in the system.
 * 
 * @param page - The page number to retrieve.
 * @param size - The number of modules per page.
 * @returns A promise that resolves to the paginated modules response.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getModuleList(page: number, size: number): Promise<PaginatedModulesResponse> {
    const REQUEST_URL = `${REQUEST_MAPPING}/?page=${page}&size=${size}`;
    return await courseMgmtRequest({
        requestName: "getModuleList",
        endpoint: REQUEST_URL,
        method: "GET"
    });
}

/**
 * Retrieves detailed information about a specific module by its ID.
 * 
 * @param moduleId - The ID of the module to retrieve details for.
 * @returns A promise that resolves to the module details.
 * @throws An error if the request fails or if the response cannot be parsed.
 * @author Nicolás Sabogal
 */
export async function getModuleDetails(moduleId: number): Promise<ModuleDetails> {
    const REQUEST_URL = `${REQUEST_MAPPING}/${moduleId}`;
    return await courseMgmtRequest({
        requestName: "getModuleDetails",
        endpoint: REQUEST_URL,
        method: "GET"
    });
}
