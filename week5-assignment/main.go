package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Hotel struct
type Hotel struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Room  int    `json:"year"`
	Phone string `json:"gpa"`
	Price int    `json:"price"`
}

var Hotels = []Hotel{
	{ID: "100", Name: "Mark Zuckerberg", Email: "mark@example.com", Room: 1, Phone: "0987654321", Price: 500},
	{ID: "200", Name: "Galileo Galilei", Email: "Galileo@example.com", Room: 2, Phone: "0123456789", Price: 800},
	{ID: "300", Name: "Bella Poarch", Email: "Bella@example.com", Room: 3, Phone: "0246897531", Price: 650},
}

func getHotels(c *gin.Context) {
	yearQuery := c.Query("year")

	if yearQuery != "" {
		filter := []Hotel{}
		for _, hotel := range Hotels {
			if fmt.Sprint(hotel.Room) == yearQuery {
				filter = append(filter, hotel)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, Hotels)
}

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/hotels", getHotels)
	}

	r.Run(":8080")
}

//go get -u github.com/gin-gonic/gin
//go mod tidy
//week5-assignment1
