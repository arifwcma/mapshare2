import { NextResponse } from "next/server"
import fetch from "node-fetch"
import { parseStringPromise } from "xml2js"

export async function GET() {
    const url = "http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WMS&REQUEST=GetCapabilities"
    const res = await fetch(url)
    const xml = await res.text()
    const parsed = await parseStringPromise(xml)

    const layers = parsed.WMS_Capabilities.Capability[0].Layer[0].Layer.map(l => {
        const name = l.Name[0]
        const title = l.Title[0]
        const type = /DepthARI|PMF/i.test(name) ? "raster" : "vector"
        return { name, title, type }
    })

    return NextResponse.json(layers)
}
