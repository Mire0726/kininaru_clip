package log

import (
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewGCPEncoderConfig() zapcore.EncoderConfig {
	ec := zap.NewProductionEncoderConfig()
	ec.TimeKey = "time"
	ec.MessageKey = "message"
	ec.LevelKey = "severity"
	ec.EncodeLevel = severityEncoder
	ec.EncodeTime = zapcore.RFC3339NanoTimeEncoder

	return ec
}

func NewConsoleEncoderConfig() zapcore.EncoderConfig {
	ec := zap.NewDevelopmentEncoderConfig()
	ec.TimeKey = ""
	ec.EncodeLevel = debugLevelEncoder
	ec.EncodeTime = zapcore.RFC3339TimeEncoder
	ec.EncodeDuration = zapcore.StringDurationEncoder

	return ec
}

func newEncoder(format string) zapcore.Encoder {
	switch strings.ToLower(format) {
	case "json":
		return zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
	case "gcp":
		return zapcore.NewJSONEncoder(NewGCPEncoderConfig())
	}

	return zapcore.NewConsoleEncoder(NewConsoleEncoderConfig())
}

// See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
var logLevelSeverity = map[zapcore.Level]string{
	zapcore.DebugLevel:  "DEBUG",
	zapcore.InfoLevel:   "INFO",
	zapcore.WarnLevel:   "WARNING",
	zapcore.ErrorLevel:  "ERROR",
	zapcore.DPanicLevel: "CRITICAL",
	zapcore.PanicLevel:  "ALERT",
	zapcore.FatalLevel:  "EMERGENCY",
}

func severityEncoder(l zapcore.Level, enc zapcore.PrimitiveArrayEncoder) {
	enc.AppendString(logLevelSeverity[l])
}

func debugLevelEncoder(level zapcore.Level, enc zapcore.PrimitiveArrayEncoder) {
	var prefix string

	//nolint:exhaustive
	switch level {
	case zap.DebugLevel:
		prefix = "[D]"
	case zap.InfoLevel:
		prefix = "[I]"
	case zap.WarnLevel:
		prefix = "[W]"
	case zap.ErrorLevel:
		prefix = "[E]"
	case zap.PanicLevel, zap.DPanicLevel:
		prefix = "[P]"
	case zap.FatalLevel:
		prefix = "[F]"
	default:
		return
	}

	enc.AppendString(prefix)
}
