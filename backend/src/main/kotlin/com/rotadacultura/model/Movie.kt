package com.rotadacultura.model

import kotlinx.serialization.Serializable
import java.time.LocalTime

@Serializable
data class Movie(
    val name: String,
    val availableCinemas: List<Cinema>,
    val genre: List<String>,
    val rating: String,
    // TODO use duration as LocalTime or that sort of thing, because it is not
    // TODO serializable
    val duration: String,
    val url: String
) {
    companion object {
        fun new (
            name: String,
            availableCinemas: List<Cinema>,
            genre: List<String>,
            rating: String,
            duration: String,
            url: String
        ): Movie {
            return Movie(name, availableCinemas, genre, rating, duration, url)
        }
    }
}