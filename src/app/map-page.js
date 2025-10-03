"use client"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import { fromUrl } from "geotiff"
import parseGeoraster from "georaster"
import GeoRasterLayer from "georaster-layer-for-leaflet"

function RasterLayer({ url }) {
    const map = useMap()
    useEffect(() => {
        const load = async () => {
            const tiff = await fromUrl(url)
            const image = await tiff.getImage()
            const rasters = await image.readRasters()
            const meta = {
                noDataValue: image.getGDALNoData(),
                projection: image.geoKeys.ProjectedCSTypeGeoKey,
                xmin: image.getBoundingBox()[0],
                ymin: image.getBoundingBox()[1],
                xmax: image.getBoundingBox()[2],
                ymax: image.getBoundingBox()[3],
                pixelHeight: image.getResolution()[1],
                pixelWidth: image.getResolution()[0]
            }
            const georaster = {
                rasterType: "geotiff",
                values: rasters,
                ...meta
            }
            const layer = new GeoRasterLayer({ georaster, opacity: 0.6 })
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
            <RasterLayer url="/stawell/rasters/Stawell24RvDepthARI10.tif" />
            {vectorData && <GeoJSON data={vectorData} />}
        </MapContainer>
    )
}
