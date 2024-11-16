package com.rotadacultura.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import java.io.File

@Serializable
data class Cinema(
    val name: String,
    val url: String,
    val address: String,
    val coordinates: Coordinates
) {
    @Serializable
    data class Coordinates(
        val latitude: Double,
        val longitude: Double
    )

    companion object {
        // List to store all cinemas' data
        private val cinemasData: List<Cinema> = Json.decodeFromString(
            File(Cinema::class.java.classLoader.getResource("cinemas.json")!!.toURI()).readText()
        )

        fun new(name: String): Cinema? {
            return cinemasData.find { it.name == name }
        }
    }
}