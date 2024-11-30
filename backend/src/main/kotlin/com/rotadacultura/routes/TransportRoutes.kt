package com.rotadacultura.routes

import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.util.reflect.*

fun Route.transportRouting() {
    route("/route") {
        get {
            try {
                val userLatitude = call.request.queryParameters["user-latitude"]
                val userLongitude = call.request.queryParameters["user-longitude"]
                if (userLatitude == null || userLongitude == null) {
                    call.respond(HttpStatusCode.BadRequest, "Missing required parameters: user latitude or longitude")
                    return@get
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Could not calculate transport route: ${e.message}")
            }
        }
    }
}