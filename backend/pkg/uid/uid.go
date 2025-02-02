package uid

import (
	"crypto/rand"
	"regexp"
	"time"

	"github.com/google/uuid"
	"github.com/oklog/ulid/v2"
)

type UIDGenerator interface {
	NewUUID() string
	NewULID() string
	InvalidUUID(uuid string) bool
}

type generator struct{}

func NewGenerator() UIDGenerator {
	return &generator{}
}

func (g *generator) NewUUID() string {
	return uuid.New().String()
}

func (g *generator) NewULID() string {
	t := time.Now()
	entropy := ulid.Monotonic(rand.Reader, 0)

	return ulid.MustNew(ulid.Timestamp(t), entropy).String()
}

func (g *generator) InvalidUUID(uuid string) bool {
	uuidRegex := regexp.MustCompile(`^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$`)

	return uuidRegex.MatchString(uuid)
}
