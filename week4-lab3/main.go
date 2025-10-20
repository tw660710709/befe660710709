package main

import (
	"errors"
	"fmt"
)

type Student struct {
	ID    string  `json:"id"`
	Name  string  `json:"name"`
	Email string  `json:"email"`
	Year  int     `json:"year"`
	GPA   float64 `json:"gpa"`
}

func (s *Student) IsHonor() bool {
	return s.GPA >= 3.50
}

func (s *Student) Validate() error {
	if s.Name == "" {
		return errors.New("name is required")
	}
	if s.Year < 1 || s.Year > 4 {
		return errors.New("year must be between 1-4")
	}
	if s.GPA < 0.0 || s.GPA > 4.0 {
		return errors.New("GPA must be between 0.0-4.0")
	}
	return nil
}

func main() {
	// var st Student = Student{ID: "1", Name: "", Email: "dear.gmail.com", Year: 4, GPA: 3.75}

	students := []Student{
		{ID: "1", Name: "Thanakrit", Email: "dear.gmail.com", Year: 4, GPA: 3.75},
		{ID: "2", Name: "phat", Email: "phat.gmail.com", Year: 4, GPA: 3.90},
	}

	newStudent := Student{ID: "3", Name: "dream", Email: "dream.gmail.com", Year: 3, GPA: 3.60}
	students = append(students, newStudent)

	for i, student := range students {
		fmt.Printf("%d honor %d \n", i, student.IsHonor())
		fmt.Printf("%d vaildation %d\n", i, student.Validate())
	}

	// fmt.Printf("Honor = %v\n", st.IsHonor())
	// fmt.Printf("Validation = %v\n", st.Validate())
}
