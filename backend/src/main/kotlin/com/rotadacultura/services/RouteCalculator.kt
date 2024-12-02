package com.rotadacultura.services

import ch.qos.logback.core.util.Loader.getResource
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import java.io.File
import kotlin.math.pow
import kotlin.math.sqrt


@Serializable
data class Stop (
    val line: String,
    val type: String,
    val name: String,
    val latitude: Double,
    val longitude: Double
)

@Serializable
data class Line (
    val name: String,
    val stops: List<Stop>
)

data class Edge (
    val from: Stop,
    val to: Stop,
    val line: String,
    val weight: Double
)

@Serializable
data class Section (
    val stops: List<Stop>,
    val line: String
)

// helper classes to parse json with line's information
@Serializable
data class SubwayLineData(
    val nome: String,
    val paradas: List<StopData>
)

@Serializable
data class StopData(
    val nome: String,
    val coordenadas: Coordinates,
    val pontosConectados: List<ConnectedStop> = emptyList()
)

@Serializable
data class Coordinates(
    val x: Double,
    val y: Double
)

@Serializable
data class ConnectedStop(
    val nome: String
)

class RouteCalculator {

    private val stops = mutableListOf<Stop>()
    private val graph = mutableMapOf<Stop, MutableList<Edge>>()

    companion object {
        private val subwayLinesData: List<SubwayLineData> by lazy {
            val fileContent = File(RouteCalculator::class.java.classLoader.getResource("subway_lines.json")!!.toURI()).readText()
            Json {
               ignoreUnknownKeys = true
            }.decodeFromString(fileContent)
        }
    }

    init {
        buildGraph()
    }

    private fun buildGraph() {
        for (lineData in subwayLinesData) {
            val lineName = lineData.nome
            for (stopData in lineData.paradas) {
                val stop = Stop(
                    line = lineName,
                    type = "metro",
                    name = stopData.nome,
                    latitude = stopData.coordenadas.x,
                    longitude = stopData.coordenadas.y
                )
                stops.add(stop)
            }
        }

        for (lineData in subwayLinesData) {
            val lineName = lineData.nome
            for (stopData in lineData.paradas) {
                val fromStop = stops.find { it.name == stopData.nome } ?: continue
                for (connectedStopData in stopData.pontosConectados) {
                    val toStop = stops.find { it.name == connectedStopData.nome } ?: continue
                    val weight = calculateDistance(
                        fromStop.latitude, fromStop.longitude,
                        toStop.latitude, toStop.longitude
                    )
                    val edge = Edge(from = fromStop, to = toStop, line = lineName, weight = weight)
                    graph.computeIfAbsent(fromStop) { mutableListOf() }.add(edge)
                }
            }
        }
    }

    private fun calculateDistance(startX: Double, startY: Double, endX: Double, endY: Double): Double {
        return sqrt((endX - startX).pow(2.0) + (endY - startY).pow(2.0))
    }

    // implementation of the aStar pathfinding algorithm that uses geographical distance as heuristic
    private fun aStar(start: Stop, end: Stop): List<Section> {
        // stores the priority queue of nodes to visit in the optimal path search
        val nodeQueue = mutableSetOf(start)
        // stores the node that came before in the optimal path
        val cameFrom = mutableMapOf<Stop, Stop?>()
        // cost to reach from the start node
        val distToStart = mutableMapOf<Stop, Double>().withDefault { Double.MAX_VALUE }
        // estimated cost to reach end node (real cost + heuristic)
        val estimatedDistToEnd = mutableMapOf<Stop, Double>().withDefault { Double.MAX_VALUE }

        distToStart[start] = 0.0
        estimatedDistToEnd[start] = calculateDistance(start.latitude, start.longitude, end.latitude, end.longitude)

        while (nodeQueue.isNotEmpty()) {
            val current = nodeQueue.minByOrNull { estimatedDistToEnd.getValue(it) }!!

            if (current == end) return buildRoute(cameFrom, current)

            nodeQueue.remove(current)

            // update optimal path if passing through the current node is better than the current path
            for (edge in graph[current]!!) {
                if (distToStart.getValue(current) + edge.weight < distToStart.getValue(edge.to)) {
                    cameFrom[edge.to] = current
                    distToStart[edge.to] = distToStart.getValue(current) + edge.weight
                    estimatedDistToEnd[edge.to] = distToStart.getValue(edge.to) +
                            calculateDistance(edge.to.latitude, edge.to.longitude, end.latitude, end.longitude)

                    if (edge.to !in nodeQueue) nodeQueue.add(edge.to)
                }
            }
        }

        throw IllegalStateException("Path not found!")
    }

    // takes the stops that compose the optimal path and group them in sections by line
    private fun buildRoute(cameFrom: Map<Stop, Stop?>, currentStop: Stop): List<Section> {
        val route = mutableListOf(currentStop)
        var node = currentStop

        while (cameFrom[node] != null) {
            node = cameFrom[node]!!
            route.add(node)
        }
        route.add(node)
        route.reverse()

        val sections = mutableListOf<Section>()
        var currentLine: String = ""
        val currentSectionStops = mutableListOf<Stop>()

        for (i in 0 until route.size - 1) {
            val stop = route[i]
            val nextStop = route[i + 1]

            // case where the start end the end are the same
            if (stop == nextStop) continue

            // find the edge connecting this stop to the next
            val edge = graph[stop]?.find { it.to == nextStop }
                ?: throw IllegalStateException("Edge not found between $stop and $nextStop")

            if (currentLine.isEmpty() || edge.line == currentLine) {
                currentSectionStops.add(stop)
                currentLine = edge.line
            } else {
                currentSectionStops.add(stop)
                sections.add(Section(stops = currentSectionStops.toList(), line = currentLine))
                currentSectionStops.clear()
                currentSectionStops.add(stop)
                currentLine = edge.line
            }
        }
        currentSectionStops.add(route.last())
        sections.add(Section(stops = currentSectionStops, line = currentLine))

        return sections
    }

    private fun findNearestStop(latitude: Double, longitude: Double): Stop {
        return stops.minBy { calculateDistance(it.latitude, it.longitude, latitude, longitude) }
    }

    fun calculateRoute(userLatitude: Double, userLongitude: Double, cinemaLatitude: Double,
                       cinemaLongitude: Double): List<Section>{
        return aStar(
            findNearestStop(userLatitude, userLongitude),
            findNearestStop(cinemaLatitude, cinemaLongitude))
    }
}


object RouteCalculatorSingleton {
    lateinit var instance: RouteCalculator
        private set

    fun initialize() {
        instance = RouteCalculator()
    }
}

