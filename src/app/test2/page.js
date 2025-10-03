"use client"
import dynamic from "next/dynamic"

const Test2Client = dynamic(() => import("./Test2Client"), { ssr: false })

export default function Page() {
    return <Test2Client />
}
