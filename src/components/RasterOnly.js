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

            const min = georaster.mins[0]
            const max = georaster.maxs[0]

            const noData = georaster.noDataValue

            const layer = new GeoRasterLayer({
                georaster,
                opacity: 1,
                resolution: 256,
                projection: 7854,
                pixelValuesToColorFn: values => {
                    const v = values[0]
                    if (v === null || v === noData) return null
                    const t = (v - min) / (max - min)
                    let r, g, b
                    if (t < 0.5) {
                        r = Math.floor(510 * t)
                        g = Math.floor(510 * t)
                        b = Math.floor(255 * (1 - 2 * t))
                    } else {
                        r = 255
                        g = Math.floor(510 * (1 - t))
                        b = 0
                    }
                    return `rgb(${r},${g},${b})`
                }
            })

            layer.addTo(map)
            map.fitBounds(layer.getBounds())
        }
        load()
    }, [map, url])
    return null
}
