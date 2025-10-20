package main

import (
	"fmt"
)

// var email string = "dear@gmail.com"

func main() {
	// var name string = "Thanakrit"
	var age int = 20

	email := "dear@gmail.com"
	gpa := 4.00

	firstname, lastname := "Thanakrit", "Wettayanukul"

	fmt.Printf("Name: %s %s, Age: %d, Email: %s, GPA: %.2f\n", firstname, lastname, age, email, gpa)
}
