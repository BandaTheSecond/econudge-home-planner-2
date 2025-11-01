from flask import jsonify
from werkzeug.exceptions import NotFound, BadRequest

def register_error_handlers(app):
    @app.errorhandler(NotFound)
    def handle_404(err):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(BadRequest)
    def handle_400(err):
        return jsonify({"error": "Bad request"}), 400

    @app.errorhandler(422)
    def handle_422(err):
        return jsonify({"error": "Unprocessable entity"}), 422
