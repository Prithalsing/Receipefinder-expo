package middleware

import (
	"context"
	"crypto/rsa"
	"encoding/pem"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, `{"error": "no Authorization Header"}`, http.StatusUnauthorized)
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer") {
			http.Error(w, `{"error": "Invalid authorization header format"}`, http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer")

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

		claims := token.Claims.(jwt.MapClaims)
		ctx := context.WithValue(r.Context(), "claims", claims)

		fmt.Printf("✅ Authenticated user: %v\n", claims["sub"])

		// Call the next handler with updated context
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func loadPublicKey() (*rsa.PublicKey, error) {
	key := os.Getenv("JWT_PUBLIC_KEY")

	block, _ := pem.Decode([]byte(key))
	if block == nil {
		return nil, fmt.Errorf("invalid PEM key")
	}
	return jwt.ParseRSAPublicKeyFromPEM([]byte(key))
}
