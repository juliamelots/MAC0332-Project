package com.rotadacultura.plugins

import com.rotadacultura.routes.movieRouting
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        movieRouting()
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
