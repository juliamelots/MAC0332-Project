package com.rotadacultura

import com.rotadacultura.plugins.*
import com.rotadacultura.services.RouteCalculatorSingleton
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.configureCors() {
    install(CORS) {
        allowSameOrigin = true // allows for HTTP requests from the same origin
        allowHost("0.0.0.0:8080")
        allowHost("localhost:8080")
        allowHost("127.0.0.1:8079")
        allowHost("0.0.0.0:3000") // front-end development server
        allowHost("localhost:3000")
        allowHost("0.0.0.0:80") // front-end production server
        allowHost("localhost:80")
        // uncomment below for production (only hosts above for testing)
        //anyHost()
        allowCredentials = true
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        // this allows for receiving headers of the following type
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
    }
}

fun Application.module() {
    RouteCalculatorSingleton.initialize()
    install(ContentNegotiation) {
        json()
    }
    configureCors()
    configureRouting()
}
