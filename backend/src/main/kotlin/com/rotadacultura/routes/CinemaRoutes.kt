package com.rotadacultura.routes

import com.rotadacultura.model.Cinema
import com.rotadacultura.model.Session
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*

fun Route.cinemaRouting() {
    route("/cinema") {
        get("{cinema_id}/address") {
            try {
                val cinemaId = call.parameters["cinema_id"]!!.toString()
                val cinemas = Cinema.getCinemasData()
                val cinema = cinemas.find { it.id == cinemaId }
                val address = cinema?.address

                call.respond(mapOf("address" to address))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error getting cinema address: ${ex.message}")
            }
        }
        get("{cinema_id}/sessions") {
            try {
                val cinemaId = call.parameters["cinema_id"]!!.toString()
                val sessions = Session.getSessionsData()
                val cinemaSessions = sessions
                    .filter {it.cinema == cinemaId}

                call.respond(mapOf("cinema sessions" to cinemaSessions))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error gathering cinema sessions: ${ex.message}")
            }
        }
    }
}


