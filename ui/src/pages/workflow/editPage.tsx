import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { observer } from "mobx-react";
import { Node, Edge, useStore, ReactFlowProvider } from '@xyflow/react';
import React, { useState, useEffect, useCallback } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { nodeTypes } from "@/components/nodes/nodeTypes";
import { useStores } from "@/hooks/useStore";
import { on } from "events";





const initBgColor = '#c9f1dd';

const snapGrid = [20, 20];


const defaultViewport = { x: 0, y: 0, zoom: 1.5 };





const EditPage = observer(() => {
    const { workflowId } = useParams(
        {
            from: "/_authenticated/workflow/$workflowId"
        }
    );

    const { rootStore } = useStores();
    // const reactFlowInstance = useReactFlow();
    const [loading, setLoading] = useState(true);

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    const saveNodes = async () => {
        const currentState = { nodes, edges };
        const newRecord = await rootStore.saveWorkFlow(workflowId, currentState);
        console.log(newRecord);
    }

    useEffect(() => {
        const fetchState = async () => {


            const initialState = await rootStore.loadWorkFlow(workflowId);
            

            if(initialState.workflow === null){
                const emptyNodes: Node[] = [];
                setNodes(emptyNodes);
                const emptyEdges: Edge[] = [];
                setEdges(emptyEdges)
            }
            else {
                const { nodes, edges } = initialState.workflow;
                setNodes(nodes);
                setEdges(edges);
            }
            
        }
        fetchState().catch(console.error).finally(() => setLoading(false));
    }, []);

    const onConnect = useCallback(
        (params: any) =>
            setEdges((eds) =>
                addEdge({ ...params, animated: true }, eds),
            ),
        [],
    );
    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault();

        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (!type) {
            return;
        }

        // const position = reactFlowInstance.project({
        //     x: event.clientX - reactFlowBounds.left,
        //     y: event.clientY - reactFlowBounds.top,
        // });

        const newNode = {
            id: `${type}_${nodes.length}`,
            type,
            position: { x: 0, y: 0 },
            data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
    };

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <main className="flex gap-4 p-4 h-screen">
            <aside className="w-1/4 border-r">
                <ul>
                    {Object.keys(nodeTypes).map((key) => (
                        <li
                            key={key}
                            className="border cursor-pointer p-2 m-2"
                            draggable
                            onDragStart={(e) => onDragStart(e, key)}
                        >
                            {key}
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="w-full h-[1000px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    snapToGrid={true}
                    defaultViewport={defaultViewport}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <Controls />
                </ReactFlow>
                <div>
                    <Button onClick={saveNodes}>Save workflow</Button>
                </div>
            </div>
        </main>
    );
})

export default EditPage;



