import { useAuth } from '@clerk/clerk-expo'

const API_BASE_URL = 'http://192.168.0.105:5050'

// interface Recipe {
//     id: string
//     title: string
//     category: string
//     cookTime: number
//     difficulty: string
//     rating: number
//     image: string
//     description: string
//     ingredients: string[]
// }

// interface RecipesResponse {
//     success: boolean
//     recipes: Recipe[]
//     count: number
// }


export const recipeAPI = {
    /**
     * Fetch all recipes from backend
     * @param getToken - Clerk's getToken function
     * @returns Promise with recipes data
     */
    // async getRecipes(getToken: () => Promise<string | null>): Promise<RecipesResponse> {
    //     const token = await getToken()

    //     if (!token) {
    //         throw new Error('No authentication token available')
    //     }

    //     const response = await fetch(`${API_BASE_URL}/recipes`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })

    //     if (!response.ok) {
    //         const errorText = await response.text()
    //         throw new Error(`Failed to fetch recipes: ${errorText}`)
    //     }

    //     return response.json()
    // },

    /**
     * Test endpoint to verify JWT token
     * @param getToken - Clerk's getToken function
     */
    async testToken(getToken: () => Promise<string | null>): Promise<string> {
        const token = await getToken()

        if (!token) {
            throw new Error('No authentication token available')
        }

        const response = await fetch(`${API_BASE_URL}/test`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Token test failed: ${errorText}`)
        }

        return response.text()
    },
}

// export type { Recipe, RecipesResponse }
