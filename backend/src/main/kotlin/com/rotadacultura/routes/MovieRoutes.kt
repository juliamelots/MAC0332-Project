package com.rotadacultura.routes

import com.rotadacultura.model.Cinema
import com.rotadacultura.model.Movie
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.io.File
import java.time.LocalTime

fun Route.movieRouting() {
    route("/movie") {
        get {
            try {
                // getResource searches in the "resources" directory
                val file = File(javaClass.classLoader.getResource("movies.json")!!.toURI()).readText()
                val json = kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
                val moviesData: Map<String, MovieData> = json.decodeFromString(file)
                val movies = moviesData.map { (name, data) ->
                    Movie(
                        name = name,
                        availableCinemas = data.availableCinemas.mapNotNull { Cinema.new(it) },
                        genre = data.genre,
                        rating = data.rating,
                        duration = data.duration,
                        url = data.url
                    )
                }

                call.respond(mapOf("movies" to movies))
            } catch (ex: Exception) {
                call.respond(HttpStatusCode.InternalServerError, "Error gathering movies on display information: ${ex.message}")
            }
        }
    }
}

@Serializable
data class MovieData(
    val availableCinemas: List<String>,
    val genre: List<String>,
    val rating: String,
    val duration: String,
    val url: String
)
