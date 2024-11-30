import { Handle, Node, NodeProps, Position } from '@xyflow/react'
import { memo, useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { observer } from 'mobx-react';
import { useStores } from '@/hooks/useStore';

export type DataInputNodeType = Node<{
    id: string,
    isConnectable: boolean,
    url: string,
    dataType: string,

}, 'dataInputBlock'>


const DataInputNode = observer(({ data, id, isConnectable }: NodeProps<DataInputNodeType>) => {
    const { rootStore } = useStores();

    const [type, setType] = useState(data.dataType);
    const [url, setUrl] = useState(data.url);

    const dataTypesOptions = [
        { value: 'txt', label: 'Text' },
        { value: 'pdf', label: 'PDF' },
        { value: 'notion', label: 'Notion' },
        { value: 'confluence', label: 'Confluence' }
    ]

    const handleParse = () => {
        console.log("Parsing")
    }

    useEffect(() => {
        // updates data inside store
        const oldNode = rootStore.getNodeData(id);
        console.log("old node data", id, oldNode);
        rootStore.updateNode(id, {
            url: url,
            dataType: type,
        });

        const newNode = rootStore.getNodeData(id);
        console.log("updated node", id, newNode);
    }, [url, type]);

    useEffect(() => {
        const state = rootStore.getNodeData(id);
        console.log("state", state);
        if (state) {
            setUrl(state.url);
            setType(state.dataType);
        }
    }, []);

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                id={`dataBlock|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
            <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
                <div className="flex flex-row gap-2 w-[500px] h-[300px]">
                    <div className="flex flex-col gap-2 w-1/2">
                        <div className="font-bold text-sm border-b pb-2">Data Block</div>
                        <div className="text-xs space-y-2">
                            <div>ID: {data.id}</div>
                            <Select
                                value={type}
                                onValueChange={(value: any) => setType(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataTypesOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                className="nodrag"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter URL"
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleParse}
                            >
                                Parse
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden w-1/2">
                        <iframe
                            src={url}
                            className="w-full h-full border-0"
                            title="Preview"
                        />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`dataBlock|${id}|source`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />

        </>

    )

})

export default memo(DataInputNode);