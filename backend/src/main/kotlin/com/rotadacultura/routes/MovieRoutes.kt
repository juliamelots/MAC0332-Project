package com.rotadacultura.routes

import com.rotadacultura.model.Movie
import com.rotadacultura.model.Session
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
        get("{movie_id}/available-cinemas") {
            try {
                val movieId = call.parameters["movie_id"]!!.toString()
                val sessions = Session.getSessionsData()
                val cinemas = sessions
                    .filter {it.movie == movieId}
                    .map {it.cinema}
                    .distinct()
                call.respond(mapOf("available-cinemas" to cinemas))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error gathering available cinemas: ${ex.message}")
            }
        }
        get("genres") {
            try {
                val movies = Movie.getMoviesData()
                val genres = movies
                    .flatMap { it.categories }
                    .filter { it.isNotEmpty() }
                    .distinct()
                call.respond(mapOf("genres" to genres))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error gathering movie genres: ${ex.message}")
            }
        }
    }
}