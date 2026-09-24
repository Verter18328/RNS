from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


from config import config, logger


start_message = 'started'
stop_message = 'stopped'
logger.info(f"\n\n\n{config.SERVICE_NAME} {start_message}\n\n\n")



if __name__ == "__main__":
    app = FastAPI()
    middleware = CORSMiddleware(
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(middleware)
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except Exception as e:
        logger.error(f"Error starting server: {e}")
        stop_message = 'stopped by an unexpected error'
        logger.exception(F"Error starting {config.SERVICE_NAME}: {e}")
        raise 
    except KeyboardInterrupt:
        stop_message = 'stopped by keyboard interrupt'
    finally:
        logger.info(f"\n\n\n{config.SERVICE_NAME} {stop_message}")




