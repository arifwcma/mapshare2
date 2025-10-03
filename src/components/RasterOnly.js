"use client"
import { useEffect } from "react"
import { useMap } from "react-leaflet"
import parseGeoraster from "georaster"
import GeoRasterLayer from "georaster-layer-for-leaflet"
import proj4 from "proj4"

window.proj4 = proj4
proj4.defs("EPSG:7854", "+proj=utm +zone=54 +south +ellps=GRS80 +units=m +no_defs +type=crs")

export default function RasterOnly({ url }) {
    const map = useMap()
    useEffect(() => {
        const load = async () => {
            const resp = await fetch(url)
            const arrayBuffer = await resp.arrayBuffer()
            const georaster = await parseGeoraster(arrayBuffer)
            const layer = new GeoRasterLayer({
                georaster,
                opacity: 0.8,
                resolution: 256,
                projection: 7854
            })
            layer.addTo(map)
            map.fitBounds(layer.getBounds())
        }
        load()
    }, [map, url])
    return null
}
