"use client"
import { MapContainer, WMSTileLayer } from "react-leaflet"

export default function Test2Client() {
    return (
        <MapContainer center={[-37.05, 142.8]} zoom={12} style={{ height: "100vh" }}>
            <WMSTileLayer
                url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                params={{
                    MAP: "/var/www/qgis_projects/flood_stawell/flood_stawell.qgs",
                    SERVICE: "WMS",
                    VERSION: "1.3.0",
                    REQUEST: "GetMap",
                    LAYERS: "Stawell24RvDepthARIPMF",
                    STYLES: "default",
                    FORMAT: "image/png",
                    TRANSPARENT: true
                }}
            />
        </MapContainer>
    )
}
