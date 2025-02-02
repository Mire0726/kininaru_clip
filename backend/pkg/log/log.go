package log

import (
	"context"
	"io"
	"os"
	"strings"

	"go.opentelemetry.io/otel/trace"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var (
	rootLogger = NewWithLogger(New().WithOptions(zap.AddCallerSkip(1)))
	// Fskip constructs a field with the given key and value
	Fskip = zap.Skip
	// Fbinary constructs a field with the given key and value
	Fbinary = zap.Binary
	// Fbool constructs a field with the given key and value
	Fbool = zap.Bool
	// FbyteString constructs a field with the given key and value
	FbyteString = zap.ByteString
	// Fcomplex128 constructs a field with the given key and value
	Fcomplex128 = zap.Complex128
	// Fcomplex64 constructs a field with the given key and value
	Fcomplex64 = zap.Complex64
	// Ffloat64 constructs a field with the given key and value
	Ffloat64 = zap.Float64
	// Ffloat32 constructs a field with the given key and value
	Ffloat32 = zap.Float32
	// Fint constructs a field with the given key and value
	Fint = zap.Int
	// Fint64 constructs a field with the given key and value
	Fint64 = zap.Int64
	// Fint32 constructs a field with the given key and value
	Fint32 = zap.Int32
	// Fint16 constructs a field with the given key and value
	Fint16 = zap.Int16
	// Fint8 constructs a field with the given key and value
	Fint8 = zap.Int8
	// Fstring constructs a field with the given key and value
	Fstring = zap.String
	// Fstrings constructs a field with the given key and value
	Fstrings = zap.Strings
	// Fuint constructs a field with the given key and value
	Fuint = zap.Uint
	// Fuint64 constructs a field with the given key and value
	Fuint64 = zap.Uint64
	// Fuint32 constructs a field with the given key and value
	Fuint32 = zap.Uint32
	// Fuint16 constructs a field with the given key and value
	Fuint16 = zap.Uint16
	// Fuint8 constructs a field with the given key and value
	Fuint8 = zap.Uint8
	// Fuintptr constructs a field with the given key and value
	Fuintptr = zap.Uintptr
	// Freflect constructs a field with the given key and value
	Freflect = zap.Reflect
	// Fnamespace constructs a field with the given key and value
	Fnamespace = zap.Namespace
	// Fstringer constructs a field with the given key and value
	Fstringer = zap.Stringer
	// Ftime constructs a field with the given key and value
	Ftime = zap.Time
	// Fstack constructs a field with the given key and value
	Fstack = zap.Stack
	// Fduration constructs a field with the given key and value
	Fduration = zap.Duration
	// Fobject constructs a field with the given key and value
	Fobject = zap.Object
	// Fany constructs a field with the given key and value
	Fany = zap.Any
	// Ferror constructs a field with the given key and value
	Ferror = zap.Error
)

// Logger is a object which embeds zap logger.
type Logger struct {
	*zap.Logger
}

// New creates a logger with default setting by environmental variables.
func New() *Logger {
	logger := NewWithWriter(os.Stderr)

	return logger
}

func NewWithWriter(w io.Writer) *Logger {
	sink := zapcore.Lock(zapcore.AddSync(w))
	enc := newEncoder(os.Getenv("LOG_FORMAT"))

	var level zapcore.Level
	err := level.UnmarshalText([]byte(strings.ToLower(os.Getenv("LOG_LEVEL"))))
	if err != nil {
		// default is Info.
		level = zap.InfoLevel
	}
	logger := zap.New(
		zapcore.NewCore(enc, sink, level),
		zap.AddStacktrace(zapcore.ErrorLevel),
	)

	return &Logger{logger}
}

// NewWithLogger creates a logger with a zap logger.
func NewWithLogger(logger *zap.Logger) *Logger {
	return &Logger{logger}
}

// With creates a child logger from rootLogger.
func With(fields ...zapcore.Field) *zap.Logger {
	return rootLogger.With(fields...)
}

// WithTrace creates a child logger with trace context.
func WithTrace(ctx context.Context) *zap.Logger {
	sc := trace.SpanContextFromContext(ctx)
	if !sc.IsValid() {
		return rootLogger.With()
	}

	return rootLogger.With(
		zap.Object("traceContext", zapcore.ObjectMarshalerFunc(func(enc zapcore.ObjectEncoder) error {
			enc.AddString("traceId", sc.TraceID().String())
			enc.AddString("spanId", sc.SpanID().String())
			enc.AddBool("sampled", sc.IsSampled())

			return nil
		})),
	)
}

// Debug logs a message using LevelDebug as log level.
func Debug(msg string, fields ...zapcore.Field) {
	rootLogger.Debug(msg, fields...)
}

// Info logs a message using LevelInfo as log level.
func Info(msg string, fields ...zapcore.Field) {
	rootLogger.Info(msg, fields...)
}

// Warn logs a message using LevelWarn as log level.
func Warn(msg string, fields ...zapcore.Field) {
	rootLogger.Warn(msg, fields...)
}

// Error logs a message using LevelError as log level.
func Error(msg string, fields ...zapcore.Field) {
	rootLogger.Error(msg, fields...)
}

// Panic logs a message and then calls panic.
func Panic(msg string, fields ...zapcore.Field) {
	rootLogger.Panic(msg, fields...)
}

// Sync calls writer sync method for zap.WriteSyncer.
func Sync() error {
	return rootLogger.Sync()
}
