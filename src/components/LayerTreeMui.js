"use client"
import { TreeView, TreeItem } from "@mui/x-tree-view"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Checkbox from "@mui/material/Checkbox"

function renderLayer(layer, active, onToggle) {
    const handleParentToggle = () => {
        if (layer.children && layer.children.length > 0) {
            const allActive = layer.children.every(c => active[c.name])
            layer.children.forEach(c => onToggle(c.name, !allActive))
        } else if (layer.name) {
            onToggle(layer.name, !active[layer.name])
        }
    }

    const checked = layer.children && layer.children.length > 0
        ? layer.children.every(c => active[c.name])
        : !!active[layer.name]

    const indeterminate = layer.children && layer.children.length > 0
        ? layer.children.some(c => active[c.name]) && !layer.children.every(c => active[c.name])
        : false

    return (
        <TreeItem
            key={layer.name || layer.title}
            itemId={layer.name || layer.title}
            label={
                layer.name ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                            size="small"
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={handleParentToggle}
                        />
                        <span>{layer.title}</span>
                    </div>
                ) : (
                    <span>{layer.title}</span>
                )
            }
        >
            {layer.children && layer.children.map(child =>
                renderLayer(child, active, onToggle)
            )}
        </TreeItem>
    )
}

export default function LayerTreeMui({ rasters, vectors, active, onToggle }) {
    return (
        <div style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "white",
            padding: "12px 16px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000,
            maxHeight: "90vh",
            overflowY: "auto",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px"
        }}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={["rasters", "vectors"]}
            >
                <TreeItem itemId="rasters" label="Rasters">
                    {rasters.map(l => renderLayer(l, active, onToggle))}
                </TreeItem>
                <TreeItem itemId="vectors" label="Vectors">
                    {vectors.map(l => renderLayer(l, active, onToggle))}
                </TreeItem>
            </TreeView>
        </div>
    )
}
