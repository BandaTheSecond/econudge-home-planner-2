from flask import Blueprint, request, jsonify

weather_bp = Blueprint("weather_bp", __name__)

@weather_bp.route("/weather", methods=["GET"])
def get_weather():
    # Mock weather data for now
    return jsonify({
        "current": {
            "temp": 22,
            "description": "Sunny"
        },
        "location": "Your Location",
        "daily": [
            {"dt": 1638360000, "temp": {"day": 22}},
            {"dt": 1638446400, "temp": {"day": 24}},
            {"dt": 1638532800, "temp": {"day": 20}}
        ]
    })

@weather_bp.route("/carbon", methods=["GET"])
def get_carbon():
    # Mock carbon data for now
    return jsonify({
        "emissions": 2.5,
        "energy": 15.3,
        "unit": "kg CO2/day"
    })
