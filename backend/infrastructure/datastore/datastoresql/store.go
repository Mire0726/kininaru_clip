package datastoresql

import (
    "context"
    "log"

    "gorm.io/gorm"
    "kininaru_clip/backend/infrastructure/datastore"
)

type Store struct {
    db     *gorm.DB
    store  datastore.ReadWriteStore
    logger *log.Logger
}

func NewStore(db *gorm.DB, logger *log.Logger) *Store {
    return &Store{
        db: db,
        store: &nonTransactionalReadWriteStore{
            db:     db,
            logger: logger,
        },
        logger: logger,
    }
}

func (s *Store) ReadWrite() datastore.ReadWriteStore {
    return s.store
}

func (s *Store) ReadWriteStore() datastore.ReadWriteStore {
    return &nonTransactionalReadWriteStore{
        db:     s.db,
        logger: s.logger,
    }
}

func (s *Store) ReadWriteTransaction(ctx context.Context, f func(context.Context, datastore.ReadWriteStore) error) error {
    tx := s.db.WithContext(ctx).Begin()
    if tx.Error != nil {
        return tx.Error
    }

    defer func() {
        if r := recover(); r != nil {
            tx.Rollback()
        }
    }()

    rw := &transactionalReadWriteStore{
        tx:     tx,
        logger: s.logger,
    }

    if err := f(ctx, rw); err != nil {
        s.logger.Printf("failed to execute transaction: %v", err)
        tx.Rollback()
        return err
    }

    if err := tx.Commit().Error; err != nil {
        s.logger.Printf("failed to commit transaction: %v", err)
        return err
    }

    return nil
}

type nonTransactionalReadWriteStore struct {
    db     *gorm.DB
    logger *log.Logger
}

type transactionalReadWriteStore struct {
    tx     *gorm.DB
    logger *log.Logger
}