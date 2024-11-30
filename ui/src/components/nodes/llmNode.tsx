import { memo, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '../ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { set } from 'zod';
import { Model, Ollama, TagResponse } from '@/api/ollama';



export type LLMNodeType = Node<{
    id: string;
    createdAt: string,
    isConnectable: boolean;
}, 'inputBlock'>

const LLMNode = ({ data, isConnectable, id }: NodeProps<LLMNodeType>) => {

    const [models, setModels] = useState<Model[]>([]);
    const [endpointUrl, setEndpointUrl] = useState('http://127.0.0.1:11434');
    const [ollama, setOllama] = useState<Ollama>(new Ollama({ host: endpointUrl }));
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [expanded, setExpanded] = useState(false);

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setOllama(new Ollama({ host: endpointUrl }));

            const fetchModels = async () => {
                const response = await ollama.List();
                setModels(response.models);
            };

            fetchModels();
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [endpointUrl]);

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    const handleSendPrompt = async () => {
        console.log(selectedModel);
        if (selectedModel === "") {
            return;
        }
        const response = await ollama.Chat({
            model: selectedModel,
            messages: [{ role: 'user', content: prompt }],
        });
        setResponse(response.message.content);
    };
    const handleClearResponse = () => {
        setResponse('');
    }

    const onModelChange = (value: string) => {
        setSelectedModel(value);
    }

    return (
        <div>
            <Handle
                type="target"
                position={Position.Top}
                id={`llmNode|${id}|target`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
            <Card className="p-4 shadow-md rounded-md bg-white border-2 border-gray-200">
                <CardTitle>LLM Node</CardTitle>
                <CardContent className="flex flex-col justify-evenly gap-4 w-64">
                    <Label htmlFor={`endpoint-${id}`}>Endpoint URL</Label>
                    <Input
                        id={`endpoint-${id}`}
                        value={endpointUrl}
                        onChange={(e) => setEndpointUrl(e.target.value)}
                        className="mb-2"
                    />
                    <Select value={selectedModel} onValueChange={onModelChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="model name" />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map((model, index) => (
                                <SelectItem key={index} value={model.name}>
                                    {model.name}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>
                    <Button onClick={toggleExpand}>
                        {expanded ? 'Collapse' : 'Expand'}
                    </Button>
                    {expanded && (
                        <div className="mt-4">
                            <Label htmlFor={`prompt-${id}`}>Prompt</Label>
                            <Textarea
                                id={`prompt-${id}`}
                                placeholder="Type your prompt here."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="mb-2"
                            />
                            <div className="flex flex-row justify-between">
                                <Button onClick={handleSendPrompt}>Send</Button>
                                <Button onClick={handleClearResponse}>Clear</Button>
                            </div>
                            {response && (
                                <div className="mt-4">
                                    <Label>Response</Label>
                                    <p>{response}</p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
            <Handle
                type="source"
                position={Position.Bottom}
                id={`llmNode|${id}|source`}
                isConnectable={isConnectable}
                style={{ width: '8px', height: '8px', background: '#555' }}
            />
        </div>

    );
};

export default memo(LLMNode);