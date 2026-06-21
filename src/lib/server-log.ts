type LogContext = Record<string, string | number | boolean | null | undefined>;

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    value: typeof error === "string" ? error : String(error),
  };
}

function writeLog(level: "warn" | "error", message: string, context: LogContext = {}, error?: unknown) {
  const payload = {
    level,
    message,
    context,
    error: error === undefined ? undefined : serializeError(error),
    timestamp: new Date().toISOString(),
  };

  const line = JSON.stringify(payload);
  if (level === "warn") {
    console.warn(line);
  } else {
    console.error(line);
  }
}

export function logServerWarning(message: string, context?: LogContext) {
  writeLog("warn", message, context);
}

export function logServerError(message: string, error: unknown, context?: LogContext) {
  writeLog("error", message, context, error);
}
