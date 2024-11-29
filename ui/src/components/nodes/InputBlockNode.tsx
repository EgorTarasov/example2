import { memo, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";


export type InputBlockNodeType = Node<{
    id: string;
    data_block_id: string,
    llm_id: string,
    createdAt: string,
    isConnectable: boolean;
}, 'inputBlock'>

const InputBlockNode = ({ data, isConnectable, id }: NodeProps<InputBlockNodeType>) => {
    console.log('InputBlockNode', data);
    console.log('InputBlockNode', id);
    console.log('data_block_id', data.data_block_id);
    console.log('llm_id', data.llm_id);
    const [dataBlockId, setDataBlockId] = useState(data.data_block_id || 1);
    const [llmId, setLlmId] = useState(data.llm_id || "1");

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id={`inputBlock|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-sm border-b pb-2">Input Block</div>
                    <div className="text-xs space-y-2">
                        <div>ID: {data.id}</div>
                        <div className="flex flex-col gap-1">
                            <label>Data Block ID:</label>
                            <Input
                                className="nodrag"
                                type="number"
                                value={dataBlockId}
                                onChange={(e) => setDataBlockId(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>LLM ID:</label>
                            <Input
                                className="nodrag"
                                type="number"
                                value={llmId}
                                onChange={(e) => setLlmId(e.target.value)}
                            />
                        </div>
                        <div className="text-gray-500 text-[10px]">
                            Created: {new Date(data.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`inputBlock|${id}|source`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
        </>
    );
};

export default memo(InputBlockNode);