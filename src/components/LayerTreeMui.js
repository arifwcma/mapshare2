"use client"
import { TreeView } from "@mui/x-tree-view/TreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Checkbox from "@mui/material/Checkbox"

export default function LayerTreeMui({ rasters, vectors, active, onToggle }) {
    return (
        <div style={{ position: "absolute", top: 10, left: 10, background: "white", padding: 10, zIndex: 1000, maxHeight: "90vh", overflowY: "auto" }}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem itemId="rasters" label="Rasters">
                    {rasters.map(l => (
                        <TreeItem
                            key={l.name}
                            itemId={l.name}
                            label={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox
                                        size="small"
                                        checked={!!active[l.name]}
                                        onChange={() => onToggle(l.name)}
                                    />
                                    <span>{l.title}</span>
                                </div>
                            }
                        />
                    ))}
                </TreeItem>
                <TreeItem itemId="vectors" label="Vectors">
                    {vectors.map(l => (
                        <TreeItem
                            key={l.name}
                            itemId={l.name}
                            label={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox
                                        size="small"
                                        checked={!!active[l.name]}
                                        onChange={() => onToggle(l.name)}
                                    />
                                    <span>{l.title}</span>
                                </div>
                            }
                        />
                    ))}
                </TreeItem>
            </TreeView>
        </div>
    )
}
