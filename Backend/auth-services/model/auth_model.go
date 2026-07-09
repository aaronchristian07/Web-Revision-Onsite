package model

import "time"

type User struct {
	ID       string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Username string `gorm:"not null"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
	Role     string `gorm:"not null"`
}

type RefreshToken struct {
	ID        string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID    string `gorm:"uniqueIndex;not null"`
	Email     string `gorm:"uniqueIndex;not null"`
	Role      string `gorm:"not null"`
	Token     string `gorm:"uniqueIndex;not null"`
	ExpiresAt time.Time
	CreatedAt time.Time
}
