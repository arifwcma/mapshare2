"use client"
import { MapContainer, WMSTileLayer, TileLayer } from "react-leaflet"
import { useEffect, useState } from "react"

export default function MapPage() {
    const [layers, setLayers] = useState([])

    useEffect(() => {
        fetch("/api/wms")
            .then(r => r.json())
            .then(setLayers)
    }, [])

    const rasters = layers.filter(l => l.type === "raster")
    const vectors = layers.filter(l => l.type === "vector")

    return (
        <MapContainer center={[-37.05, 142.8]} zoom={12} style={{ height: "100vh" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {rasters.map(l => (
                <WMSTileLayer
                    key={l.name}
                    url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                    params={{
                        MAP: "/var/www/qgis_projects/flood_stawell/flood_stawell.qgs",
                        SERVICE: "WMS",
                        VERSION: "1.3.0",
                        REQUEST: "GetMap",
                        LAYERS: l.name,
                        STYLES: "default",
                        FORMAT: "image/png",
                        TRANSPARENT: true
                    }}
                />
            ))}
            {vectors.map(l => (
                <WMSTileLayer
                    key={l.name}
                    url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                    params={{
                        MAP: "/var/www/qgis_projects/flood_stawell/flood_stawell.qgs",
                        SERVICE: "WMS",
                        VERSION: "1.3.0",
                        REQUEST: "GetMap",
                        LAYERS: l.name,
                        STYLES: "default",
                        FORMAT: "image/png",
                        TRANSPARENT: true
                    }}
                />
            ))}
        </MapContainer>
    )
}
