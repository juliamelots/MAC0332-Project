package com.rotadacultura.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.io.File

@Serializable
data class Movie(
    val id: String,
    val name: String,
    val url: String,
    // uses snake case because of JSON formating
    val img_url: String,
    val rating: String,
    val duration: String,
    val synopsis: String,
    val categories: List<String>,
) {
    companion object {
        // List to store all movies' data
        private val moviesData: List<Movie> = Json.decodeFromString(
            File(Cinema::class.java.classLoader.getResource("movies.json")!!.toURI()).readText()
        )

        fun new(name: String): Movie? {
            return moviesData.find { it.name == name }
        }

        fun getMoviesData(): List<Movie> {
            return moviesData
        }
    }
}