package com.rotadacultura

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class MovieRoutesTest {
    @Test
    fun listOfMoviesIsCorrectlyReturned() = testApplication {
        application {
            module()
        }

        val response = client.get("/movie")
        val body = response.bodyAsText()
        val json = Json.parseToJsonElement(body).jsonObject
        val movies = json["movies"]!!.jsonArray

        assertEquals(HttpStatusCode.OK, response.status)
        assertNotNull(movies)
        assertTrue(movies.isNotEmpty())
        assertNotNull(movies[0].jsonObject["name"])
        assertNotNull(movies[0].jsonObject["id"])
        assertNotNull(movies[0].jsonObject["url"])
        assertNotNull(movies[0].jsonObject["img_url"])
        assertNotNull(movies[0].jsonObject["rating"])
        assertNotNull(movies[0].jsonObject["duration"])
        assertNotNull(movies[0].jsonObject["synopsis"])
        assertNotNull(movies[0].jsonObject["categories"])
    }

    @Test
    fun listOfGenresIsCorrectlyReturned() = testApplication {
        application {
            module()
        }

        val response = client.get("/movie/genres")
        val body = response.bodyAsText()
        val json = Json.parseToJsonElement(body).jsonObject
        val genres = json["genres"]!!.jsonArray


        assertNotNull(genres)
        assertTrue(genres.isNotEmpty())
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun listOfAvailableCinemasIsCorrectlyReturned() = testApplication {
        application {
            module()
        }

        val response = client.get("/movie/gladiador-ii/available-cinemas")
        val body = response.bodyAsText()
        val json = Json.parseToJsonElement(body).jsonObject
        val availableCinemas = json["available-cinemas"]!!.jsonArray

        assertNotNull(availableCinemas)
        assertTrue(availableCinemas.isNotEmpty())
        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun cinemaSessionsIsCorrectlyReturned() = testApplication {
        application {
            module()
        }

        val response = client.get("/cinema/cinemark-center-norte/sessions")
        val body = response.bodyAsText()
        val json = Json.parseToJsonElement(body).jsonObject
        val sessions = json["cinema sessions"]!!.jsonArray

        assertNotNull(sessions)
        assertTrue(sessions.isNotEmpty())
        assertEquals(HttpStatusCode.OK, response.status)
    }
}