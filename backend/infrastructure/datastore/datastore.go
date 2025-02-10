package datastore

import (
	"context"

	"kininaru_clip/backend/domain/repository"
)

type Data interface {
	ReadWriteStore() ReadWriteStore

	ReadWriteTransaction(ctx context.Context, f func(context.Context, ReadWriteStore) error) error
}
type ReadWriteStore interface {
	Event() repository.Event
	User() repository.User
}
