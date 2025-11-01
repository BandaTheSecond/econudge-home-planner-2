from flask import Blueprint, request, jsonify

weather_bp = Blueprint("weather_bp", __name__, url_prefix="/api/weather")

@weather_bp.route("/", methods=["GET"])
def get_weather():
    # Placeholder for weather API integration
    return jsonify({"message": "Weather endpoint not implemented yet"})
