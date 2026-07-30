package model

import "time"

type CartItem struct {
	ID             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID         string    `gorm:"type:varchar(255);not null;index"`
	IceCreamID     string    `gorm:"type:varchar(255);not null"`
	IceCreamName   string    `gorm:"not null"`
	IceCreamPrice  int       `gorm:"not null"`
	Quantity       int       `gorm:"not null;default:1"`
	Selected       bool      `gorm:"not null;default:true"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

type Order struct {
	ID         string      `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID     string      `gorm:"type:varchar(255);not null;index"`
	TotalPrice int         `gorm:"not null"`
	Status     string      `gorm:"type:varchar(50);not null;default:'PAID'"`
	CreatedAt  time.Time
	OrderItems []OrderItem `gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	ID            string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	OrderID       string `gorm:"type:uuid;not null;index"`
	IceCreamID    string `gorm:"type:varchar(255);not null"`
	IceCreamName  string `gorm:"not null"`
	IceCreamPrice int    `gorm:"not null"`
	Quantity      int    `gorm:"not null"`
	Subtotal      int    `gorm:"not null"`
}
