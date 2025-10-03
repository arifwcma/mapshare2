"use client"
import dynamic from "next/dynamic"

const TestClient = dynamic(() => import("./TestClient"), { ssr: false })

export default function Page() {
    return <TestClient />
}
