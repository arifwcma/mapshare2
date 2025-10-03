"use client"
import { MapContainer, WMSTileLayer } from "react-leaflet"
import { useEffect, useState } from "react"
import LayerTreeMui from "@/components/LayerTreeMui"

export default function MapPage() {
    const [layers, setLayers] = useState([])
    const [active, setActive] = useState({})

    useEffect(() => {
        fetch("/api/wms")
            .then(r => r.json())
            .then(setLayers)
    }, [])

    const rasters = layers.filter(l => l.type === "raster" && l.name !== "boundary")
    const vectors = layers.filter(l => l.type === "vector" && l.name !== "boundary")

    const handleToggle = (id, value) => {
        setActive(prev => ({ ...prev, [id]: value }))
    }

    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <MapContainer center={[-37.05, 142.8]} zoom={12} style={{ height: "100%" }}>
                <WMSTileLayer
                    url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                    params={{
                        MAP: "/var/www/qgis_projects/flood_stawell/flood_stawell.qgs",
                        SERVICE: "WMS",
                        VERSION: "1.3.0",
                        REQUEST: "GetMap",
                        LAYERS: "boundary",
                        STYLES: "default",
                        FORMAT: "image/png",
                        TRANSPARENT: true
                    }}
                />
                {rasters.filter(l => active[l.name]).map(l => (
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
                {vectors.filter(l => active[l.name]).map(l => (
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
            <LayerTreeMui rasters={rasters} vectors={vectors} active={active} onToggle={handleToggle} />
        </div>
    )
}
