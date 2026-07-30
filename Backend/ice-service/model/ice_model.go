package model

type IceCream struct {
	IceCreamID		string 	`gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	IceCreamImageURL string `gorm:"column:image_url"`
	IceCreamName 	string 	`gorm:"not null"`
	IceCreamPrice	int		`gorm:"not null"`
	IceCreamFlavor	string	`gorm:"not null"`
	IceCreamDesc	string	`gorm:"not null"`
}
