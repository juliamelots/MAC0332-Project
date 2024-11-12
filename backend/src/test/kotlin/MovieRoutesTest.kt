package com.rotadacultura

import com.rotadacultura.model.Movie
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import org.junit.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class MovieRoutesTest {
    @Test
    fun listOfMoviesIsCorrectlyReturned() = testApplication {
        application {
            module()
        }

        val response = client.get("/movie")
        val body = response.bodyAsText()

        assertEquals(HttpStatusCode.OK, response.status)
        assertContains(body, "Divertida Mente 2")
    }

    @Test
    fun cinemaIsCreatedOnMovieGetRequest() = testApplication {
        application {
            module()
        }

        val response = client.get("/movie")
        println(response.bodyAsText())
        assertEquals(HttpStatusCode.OK, response.status)

        // Deserialize response body to access the availableCinemas field
        val json = Json { ignoreUnknownKeys = true }
        val movieResponse = json.decodeFromString<Map<String, List<Movie>>>(response.bodyAsText())
        val movies = movieResponse["movies"] ?: emptyList()
        val firstMovie = movies.firstOrNull()
        assertNotNull(firstMovie)

        val availableCinemas = firstMovie.availableCinemas
        assertNotNull(availableCinemas)

        val cinema = availableCinemas.firstOrNull { it.name == "Cinemark" }
        assertNotNull(cinema)
        assertEquals("Cinemark", cinema.name)
        assertEquals(5.23587, cinema.latitude)
        assertEquals(23.18275, cinema.longitude)
    }
}