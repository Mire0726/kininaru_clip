package datastore

import (
	"context"
)

type Data interface {
	ReadWriteStore() ReadWriteStore

	ReadWriteTransaction(ctx context.Context, f func(context.Context, ReadWriteStore) error) error
}
type ReadWriteStore interface{}
