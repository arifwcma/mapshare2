"use client"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import parseGeoraster from "georaster"
import GeoRasterLayer from "georaster-layer-for-leaflet"
import proj4 from "proj4"

window.proj4 = proj4
proj4.defs("EPSG:7854",
    "+proj=utm +zone=54 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
)


function RasterLayer({ url }) {
    const map = useMap()
    useEffect(() => {
        const load = async () => {
            const resp = await fetch(url)
            const arrayBuffer = await resp.arrayBuffer()
            const georaster = await parseGeoraster(arrayBuffer)
            const layer = new GeoRasterLayer({
                georaster,
                opacity: 0.6,
                resolution: 256,
                projection: 7854
            })
            layer.addTo(map)
        }
        load()
    }, [map, url])
    return null
}

export default function MapPage() {
    const [vectorData, setVectorData] = useState(null)
    useEffect(() => {
        fetch("/stawell/vectors/boundary.geojson")
            .then(r => r.json())
            .then(setVectorData)
    }, [])
    return (
        <MapContainer center={[-37.05, 142.8]} zoom={11} style={{ height: "100vh" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RasterLayer url="/stawell/rasters/Stawell24RvDepthARI5.tif" />
            {vectorData && <GeoJSON data={vectorData} />}
        </MapContainer>
    )
}
