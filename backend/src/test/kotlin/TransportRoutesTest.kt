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


class TransportRoutesTest {

    @Test
    fun routeIsCorrectlyCalculated() = testApplication {
        application {
            module()
        }

        val response = client.get("/route?user-latitude=-23.558745&user-longitude=-46.731859&cinema=uci-santana")
        val body = response.bodyAsText()
        val route = Json.parseToJsonElement(body).jsonArray

        assertEquals(HttpStatusCode.OK, response.status)
        assertNotNull(route)
        assertTrue(route.isNotEmpty())
        assertNotNull(route[0].jsonObject["stops"])
        assertNotNull(route[0].jsonObject["stops"]!!.jsonArray[0].jsonObject["latitude"])
        assertNotNull(route[0].jsonObject["stops"]!!.jsonArray[0].jsonObject["longitude"])
    }
}