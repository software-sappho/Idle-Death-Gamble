package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type GameState struct {
	Round        int    `json:"Round"`
	Indicators   string `json:"Indicators"`
	CutScene     string `json:"CutScene"`
	PlayerResult bool   `json:"PlayerResult"`
	Mode         string `json:"Mode"`
}

var gameState GameState

func init() {
	rand.Seed(time.Now().UnixNano())
}

func startGame(w http.ResponseWriter, r *http.Request) {
	gameState = GameState{
		Round: 1,
		Mode:  "Reach Mode",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(gameState)
}

func playRound(w http.ResponseWriter, r *http.Request) {
	// Remove the unused 'finalRound' variable, and just simulate a regular round.

	// Simulate indicators for the round
	indicators := getRandomIndicator()

	// Simulate reaching mode and cut scene
	cutScene := getCutScene()
	playerResult := getPlayerResult(cutScene)

	gameState.Indicators = indicators
	gameState.CutScene = cutScene
	gameState.PlayerResult = playerResult
	gameState.Round++

	// If it's the final round, set Kirara's result
	if gameState.Round > 3 {
		gameState.Mode = "Final Round"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(gameState)
}

func getRandomIndicator() string {
	// 5% chance for Rainbow, 20% for Gold, 40% for Red, 35% for Green
	roll := rand.Intn(100)
	switch {
	case roll < 5:
		return "Rainbow"
	case roll < 25:
		return "Gold"
	case roll < 65:
		return "Red"
	default:
		return "Green"
	}
}

func getCutScene() string {
	// 60% chance for Video B, 30% for Video A, 10% for Video C
	roll := rand.Intn(100)
	switch {
	case roll < 10:
		return "Video C"
	case roll < 40:
		return "Video B"
	default:
		return "Video A"
	}
}

func getPlayerResult(cutScene string) bool {
	switch cutScene {
	case "Video A":
		return rand.Intn(100) < 30
	case "Video B":
		return rand.Intn(100) < 60
	case "Video C":
		return rand.Intn(100) < 80
	default:
		return false
	}
}

func main() {
	http.HandleFunc("/start", startGame)
	http.HandleFunc("/play", playRound)

	// Start the server
	log.Println("Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
