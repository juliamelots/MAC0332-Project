package com.rotadacultura.routes

import com.rotadacultura.model.Movie
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*

fun Route.movieRouting() {
    route("/movie") {
        get {
            try {
                val movies = Movie.getMoviesData()

                call.respond(mapOf("movies" to movies))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error gathering movies on display information: ${ex.message}")
            }
        }
    }
}