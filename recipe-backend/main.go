package main

import (
	"context"
	"crypto/rsa"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// Recipe represents a recipe entity
type Recipe struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Category    string   `json:"category"`
	CookTime    int      `json:"cookTime"`
	Difficulty  string   `json:"difficulty"`
	Rating      float64  `json:"rating"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	Ingredients []string `json:"ingredients"`
}

// Mock recipe data
var mockRecipes = []Recipe{
	{
		ID:          "1",
		Title:       "Spicy Thai Basil Chicken",
		Category:    "asian",
		CookTime:    25,
		Difficulty:  "Medium",
		Rating:      4.8,
		Image:       "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
		Description: "A delicious and spicy Thai stir-fry with holy basil",
		Ingredients: []string{"Chicken breast", "Thai basil", "Garlic", "Chilies", "Fish sauce", "Soy sauce"},
	},
	{
		ID:          "2",
		Title:       "Classic Italian Carbonara",
		Category:    "italian",
		CookTime:    20,
		Difficulty:  "Easy",
		Rating:      4.9,
		Image:       "https://images.unsplash.com/photo-1612874742237-6526221588e3",
		Description: "Creamy pasta with eggs, cheese, and pancetta",
		Ingredients: []string{"Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black pepper"},
	},
	{
		ID:          "3",
		Title:       "Mexican Street Tacos",
		Category:    "mexican",
		CookTime:    15,
		Difficulty:  "Easy",
		Rating:      4.7,
		Image:       "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
		Description: "Authentic street-style tacos with fresh toppings",
		Ingredients: []string{"Corn tortillas", "Beef", "Cilantro", "Onion", "Lime", "Salsa"},
	},
	{
		ID:          "4",
		Title:       "Mediterranean Grilled Salmon",
		Category:    "seafood",
		CookTime:    30,
		Difficulty:  "Medium",
		Rating:      4.6,
		Image:       "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
		Description: "Perfectly grilled salmon with herbs and lemon",
		Ingredients: []string{"Salmon fillet", "Olive oil", "Lemon", "Dill", "Garlic"},
	},
}

func main() {
	godotenv.Load()

	// Register routes
	http.HandleFunc("/test", testHandler)
	http.HandleFunc("/recipes", authMiddleware(recipesHandler))

	fmt.Println("server running on :5050")
	log.Fatal(http.ListenAndServe("0.0.0.0:5050", nil))
}

// authMiddleware validates JWT token and adds user info to context
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Add CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")

		// Handle preflight request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, `{"error": "No authorization header"}`, http.StatusUnauthorized)
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, `{"error": "Invalid authorization header format"}`, http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		publicKey, err := loadPublicKey()
		if err != nil {
			fmt.Println("Error loading public key:", err)
			http.Error(w, `{"error": "Internal server error"}`, http.StatusInternalServerError)
			return
		}

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			if t.Method.Alg() != jwt.SigningMethodRS256.Alg() {
				return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
			}
			return publicKey, nil
		})

		if err != nil || !token.Valid {
			fmt.Println("Error validating token:", err)
			http.Error(w, `{"error": "Invalid or expired token"}`, http.StatusUnauthorized)
			return
		}

		// Add claims to context
		claims := token.Claims.(jwt.MapClaims)
		ctx := context.WithValue(r.Context(), "claims", claims)

		fmt.Printf("✅ Authenticated user: %v\n", claims["sub"])

		// Call the next handler with updated context
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

// recipesHandler returns all recipes (protected endpoint)
func recipesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, `{"error": "Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	// Get user claims from context (set by middleware)
	claims := r.Context().Value("claims").(jwt.MapClaims)
	fmt.Printf("📋 User %v fetching recipes\n", claims["sub"])

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"recipes": mockRecipes,
		"count":   len(mockRecipes),
	})
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")

	// Handle preflight request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		fmt.Println("Error: No auth header found")
		http.Error(w, "No auth header found", http.StatusUnauthorized)
		return
	}

	if !strings.HasPrefix(authHeader, "Bearer ") {
		fmt.Println("Error: Invalid Authorization header format, got:", authHeader)
		http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	fmt.Println("token: ", tokenString)

	publicKey, err := loadPublicKey()
	if err != nil {
		fmt.Println("Error loading public key:", err)
		http.Error(w, "Failed to load public key", http.StatusInternalServerError)
		return
	}

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if t.Method.Alg() != jwt.SigningMethodRS256.Alg() {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return publicKey, nil
	})

	if err != nil || !token.Valid {
		fmt.Println("Error validating token:", err)
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	fmt.Println("token is valid")
	claims := token.Claims.(jwt.MapClaims)
	fmt.Println("claims: ", claims)

	w.Write([]byte("Token verified, check backend logs"))
}

func loadPublicKey() (*rsa.PublicKey, error) {
	key := os.Getenv("JWT_PUBLIC_KEY")

	block, _ := pem.Decode([]byte(key))
	if block == nil {
		return nil, fmt.Errorf("invalid PEM key")
	}
	return jwt.ParseRSAPublicKeyFromPEM([]byte(key))
}
