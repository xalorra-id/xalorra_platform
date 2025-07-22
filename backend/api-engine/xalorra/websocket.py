import asyncio
import os
import json
from dotenv import load_dotenv
from xalorra.utils.logger import log_prediction  # pastikan path ini sesuai struktur project

# Load environment variables from .env file
load_dotenv()

PREDICTION_LOG_PATH = os.getenv("LOG_PATH", "/opt/API_engine/logs/predictions.log")

async def websocket_predict_stream(scope, receive, send):
    assert scope["type"] == "websocket"
    print("📡 WebSocket handler triggered:", scope["path"])

    try:
        await send({"type": "websocket.accept"})
        print("🔗 WebSocket connection accepted")

        while True:
            event = await receive()

            if event["type"] == "websocket.disconnect":
                print("🔌 WebSocket client disconnected")
                break

            if event["type"] == "websocket.receive":
                try:
                    payload = json.loads(event.get("text", ""))
                    model = payload.get("model")
                    features = payload.get("input")

                    # 🚀 Simulasi prediksi (dummy logic: jumlahkan semua input)
                    prediction = sum(features)

                    # 📝 Log ke file
                    log_prediction(model, features, prediction)

                    await send({
                        "type": "websocket.send",
                        "text": json.dumps({
                            "model": model,
                            "input": features,
                            "prediction": prediction
                        })
                    })

                except Exception as e:
                    print("❌ Failed to process message:", e)
                    await send({
                        "type": "websocket.send",
                        "text": f"ERROR: {str(e)}"
                    })

    except Exception as e:
        print("💥 WebSocket error:", e)
        try:
            await send({
                "type": "websocket.send",
                "text": f"ERROR: {str(e)}"
            })
        except:
            pass

    finally:
        try:
            await send({"type": "websocket.close"})
        except:
            pass
