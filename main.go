package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println(os.Args)
	fmt.Println("Hello, World!123")
	var a int = 10
	var b bool = (a != 0)
	fmt.Println(b)
}
