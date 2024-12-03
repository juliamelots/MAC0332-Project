package com.rotadacultura.plugins

import com.rotadacultura.routes.cinemaRouting
import com.rotadacultura.routes.movieRouting
import com.rotadacultura.routes.transportRouting
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        transportRouting()
        movieRouting()
        cinemaRouting()
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
