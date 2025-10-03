"use client"
import dynamic from "next/dynamic"

const MapPage = dynamic(() => import("./map-page"), { ssr: false })

export default function Home() {
    return <MapPage />
}
