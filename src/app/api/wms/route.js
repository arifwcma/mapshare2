import { NextResponse } from "next/server"
import fetch from "node-fetch"
import { parseStringPromise } from "xml2js"

function parseLayers(layers) {
    return layers.map(l => {
        const name = l.Name ? l.Name[0] : null
        const title = l.Title ? l.Title[0] : null
        const type = name && /DepthARI|PMF/i.test(name) ? "raster" : "vector"
        const children = l.Layer ? parseLayers(l.Layer) : []
        return { name, title, type, children }
    })
}

export async function GET() {
    const url = "http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WMS&REQUEST=GetCapabilities"
    const res = await fetch(url)
    const xml = await res.text()
    const parsed = await parseStringPromise(xml)

    const rootLayers = parsed.WMS_Capabilities.Capability[0].Layer[0].Layer
    const layers = parseLayers(rootLayers)

    return NextResponse.json(layers)
}
