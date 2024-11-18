package com.rotadacultura.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import java.io.File

@Serializable
data class Cinema(
    val id: String,
    val name: String,
    val url: String,
    val address: String,
    val coordinates: List<Double>
) {
    companion object {
        // List to store all cinemas' data
        private val cinemasData: List<Cinema> = Json.decodeFromString(
            File(Cinema::class.java.classLoader.getResource("cinemas.json")!!.toURI()).readText()
        )

        fun new(name: String): Cinema? {
            return cinemasData.find { it.name == name }
        }

        fun getCinemasData(): List<Cinema> {
            return cinemasData
        }
    }
}