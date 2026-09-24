import logging
import sys


def setup_logger(settings) -> logging.Logger:
    logger = logging.getLogger(settings.SERVICE_NAME)
    logger.setLevel(settings.LOG_LEVEL)

    log_dir = settings.LOG_DIR
    log_dir.mkdir(parents=True, exist_ok=True)

    file_handler = logging.FileHandler(
        log_dir / f"{settings.SERVICE_NAME}.log",
        encoding="utf-8",
    )
    file_handler.setLevel(settings.LOG_LEVEL)

    for stream in (sys.stdout, sys.stderr):
        reconfigure = getattr(stream, "reconfigure", None)
        if callable(reconfigure):
            try:
                reconfigure(encoding="utf-8", errors="replace")
            except (OSError, ValueError):
                pass

    console_handler = logging.StreamHandler()
    console_handler.setLevel(settings.LOG_LEVEL)

    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)

    return logger
