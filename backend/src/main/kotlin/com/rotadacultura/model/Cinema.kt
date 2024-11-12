package com.rotadacultura.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import java.io.File

@Serializable
class Cinema(
    val name: String,
    val latitude: Double,
    val longitude: Double,
) {
    companion object {
        // Variable to store data from all cinemas (prevents searching many times
        // in the JSON file
        private val cinemasData: JsonObject = Json.parseToJsonElement(
            File(Cinema::class.java.classLoader.getResource("cinemas.json")!!.toURI()).readText()
        ).jsonObject

        fun new(
            name: String,
            latitude: Double,
            longitude: Double,
        ): Cinema {
            return Cinema(name, latitude, longitude)
        }

        fun new(name: String): Cinema? {
            val cinemaData = cinemasData[name]?.jsonObject
            return cinemaData?.let {
                Cinema(
                    name = name,
                    latitude = it["latitude"]?.toString()?.toDoubleOrNull() ?: error("Invalid latitude"),
                    longitude = it["longitude"]?.toString()?.toDoubleOrNull() ?: error("Invalid longitude")
                )
            }
        }
    }
}