package com.rotadacultura.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import java.io.File

@Serializable
data class Session(
    val cinema: String,
    val movie: String,
    val date: String,
    val time: String,
    val categories: List<String>
) {
    companion object {
        // List to store all sessions' data
        private val sessionsData: List<Session> = Json.decodeFromString(
            File(Cinema::class.java.classLoader.getResource("sessions.json")!!.toURI()).readText()
        )

        fun new(cinema: String, date: String, time: String): Session? {
            return sessionsData.find {
                it.cinema == cinema &&
                it.date == date &&
                it.time == time
            }
        }

        fun getSessionsData(): List<Session> {
            return sessionsData
        }
    }
}
