"use client"
import { MapContainer } from "react-leaflet"
import RasterOnly from "@/components/RasterOnly"

export default function TestClient() {
    return (
        <MapContainer style={{ height: "100vh" }}>
            <RasterOnly url="/stawell/rasters/Stawell24RvDepthARI5.tif" />
        </MapContainer>
    )
}
