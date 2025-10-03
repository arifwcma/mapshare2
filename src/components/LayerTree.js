"use client"
import { useState } from "react"

export default function LayerTree({ rasters, vectors, onToggle }) {
    const [active, setActive] = useState({})

    const handleChange = (name) => {
        const updated = { ...active, [name]: !active[name] }
        setActive(updated)
        onToggle(updated)
    }

    return (
        <div style={{ position: "absolute", top: 10, left: 10, background: "white", padding: 10, zIndex: 1000 }}>
            <h4>Rasters</h4>
            {rasters.map(l => (
                <div key={l.name}>
                    <input type="checkbox" checked={!!active[l.name]} onChange={() => handleChange(l.name)} />
                    <label>{l.title}</label>
                </div>
            ))}
            <h4>Vectors</h4>
            {vectors.map(l => (
                <div key={l.name}>
                    <input type="checkbox" checked={!!active[l.name]} onChange={() => handleChange(l.name)} />
                    <label>{l.title}</label>
                </div>
            ))}
        </div>
    )
}
