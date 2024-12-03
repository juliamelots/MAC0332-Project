package com.rotadacultura.routes

import com.rotadacultura.model.Cinema
import com.rotadacultura.services.RouteCalculatorSingleton
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.util.reflect.*

fun Route.transportRouting() {
    route("/route") {
        get {
            try {
                val userLatitude = call.request.queryParameters["user-latitude"]?.toDoubleOrNull()
                val userLongitude = call.request.queryParameters["user-longitude"]?.toDoubleOrNull()
                val cinemaId = call.request.queryParameters["cinema"]
                if (userLatitude == null || userLongitude == null || cinemaId == null) {
                    call.respond(HttpStatusCode.BadRequest, "Missing required parameters")
                    return@get
                }
                val cinema = Cinema.newById(cinemaId) ?: throw IllegalStateException("Cinema not found")
                val routeCalculator = RouteCalculatorSingleton.instance
                val route = routeCalculator.calculateRoute(
                    userLatitude,
                    userLongitude,
                    cinema.coordinates[0],
                    cinema.coordinates[0]
                )
                call.respond(HttpStatusCode.OK, route)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Could not calculate transport route: ${e.message}")
            }
        }
    }
}