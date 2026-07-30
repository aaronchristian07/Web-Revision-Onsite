package storage

import (
	"context"
	"fmt"
	"mime/multipart"

	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type ImageStorage struct {
	client         *minio.Client
	bucket         string
	publicEndpoint string
}

func NewImageStorage(endpoint, publicEndpoint, accessKey, secretKey, bucket string) (*ImageStorage, error) {
	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false,
	})
	if err != nil {
		return nil, err
	}

	return &ImageStorage{
		client:         client,
		bucket:         bucket,
		publicEndpoint: publicEndpoint,
	}, nil
}

func (s *ImageStorage) EnsureBucket(ctx context.Context) error {
	exists, err := s.client.BucketExists(ctx, s.bucket)
	if err != nil {
		return err
	}
	if exists {
		return nil
	}
	return s.client.MakeBucket(ctx, s.bucket, minio.MakeBucketOptions{})
}

func (s *ImageStorage) UploadImage(ctx context.Context, file multipart.File, header *multipart.FileHeader) (string, error) {
	key := fmt.Sprintf("%s-%s", uuid.NewString(), header.Filename)

	_, err := s.client.PutObject(ctx, s.bucket, key, file, header.Size, minio.PutObjectOptions{
		ContentType: header.Header.Get("Content-Type"),
	})
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("%s/%s/%s", s.publicEndpoint, s.bucket, key), nil
}
