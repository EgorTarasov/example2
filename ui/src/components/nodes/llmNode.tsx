import { memo, useEffect, useState } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '../ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Model, Ollama } from '@/api/ollama';
import { observer } from 'mobx-react';
import { useStores } from '@/hooks/useStore';

export type LLMNodeType = Node<{
    id: string;
    createdAt: string;
    isConnectable: boolean;
    prompt: string;
    endpointUrl: string;
    selectedModel: string;
    systemPrompt: string;
    ragTemplate: string;
}, 'inputBlock'>

const LLMNode = observer(({ data, isConnectable, id }: NodeProps<LLMNodeType>) => {
    console.log("llm block id:", id, data)

    const { rootStore } = useStores()

    // "static fields" can be saved into backend
    const [endpointUrl, setEndpointUrl] = useState(data.endpointUrl);
    const [selectedModel, setSelectedModel] = useState<string>(data.selectedModel);
    const [prompt, setPrompt] = useState(data.prompt);
    const [systemPrompt, setSystemPrompt] = useState(data.systemPrompt);
    const [ragTemplate, setRagTemplate] = useState(data.ragTemplate ? data.ragTemplate : "");
    const [ragTemplateError, setRagTemplateError] = useState<string | null>(null);

    // dynamic field generated from "static ones"
    const [models, setModels] = useState<Model[]>([]);
    const [ollama, setOllama] = useState<Ollama>(new Ollama({ host: endpointUrl }));
    const [expanded, setExpanded] = useState(false);
    const [response, setResponse] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setOllama(new Ollama({ host: endpointUrl }));

            const fetchModels = async () => {
                const response = await ollama.List();
                setModels(response.models);
            };
            fetchModels().catch((e) => {
                console.log("error", e);
                return;
            }).finally(() => {
                setIsValidUrl(true);
            });
        }, 100);

        console.log("endpoint url", endpointUrl, isValidUrl);
        return () => {
            clearTimeout(handler);
        }
    }, [endpointUrl]);

    useEffect(() => {
        // updates data inside store
        const oldNode = rootStore.getNodeData(id)
        console.log("old node data", id, oldNode)
        rootStore.updateNode(id, {
            endpointUrl: endpointUrl,
            selectedModel: selectedModel,
            prompt: prompt,
            systemPrompt: systemPrompt,
            ragTemplate: ragTemplate,
        })

        const newNode = rootStore.getNodeData(id)
        console.log("updated node", id, newNode)
    }, [endpointUrl, selectedModel, prompt, systemPrompt, ragTemplate])

    useEffect(() => {
        const state = rootStore.getNodeData(id);
        console.log("state", state);
        if (state) {
            setEndpointUrl(state.endpointUrl);
            setSelectedModel(state.selectedModel);
            setPrompt(state.prompt);
            setSystemPrompt(state.systemPrompt);
            setRagTemplate(state.ragTemplate);
        }
    }, []);

    useEffect(() => {
        const validateRagTemplate = () => {
            if (!ragTemplate.includes("{context}") || !ragTemplate.includes("{input}")) {
                setRagTemplateError('RAG Template must include "{context}" and "{input}".');
            } else {
                setRagTemplateError(null);
            }
        };
        validateRagTemplate();
    }, [ragTemplate]);

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
                <CardContent className="flex flex-row justify-evenly gap-4 p-4">
                    <div>
                        <Label htmlFor={`endpoint-${id}`}>Endpoint URL</Label>
                        <Input
                            id={`endpoint-${id}`}
                            value={endpointUrl}
                            onChange={(e) => setEndpointUrl(e.target.value)}
                            className="mb-2"
                        />
                        <Select disabled={!isValidUrl} value={selectedModel} onValueChange={onModelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={data.selectedModel ? data.selectedModel : "model name"} defaultValue={data.selectedModel} />
                            </SelectTrigger>
                            <SelectContent>
                                {models.map((model, index) => (
                                    <SelectItem key={index} value={model.name}>
                                        {model.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={toggleExpand} className='mt-4'>
                            {expanded ? 'Collapse' : 'Expand'}
                        </Button>
                        {expanded && (
                            <div className="mt-4">
                                <Label htmlFor={`prompt-${id}`}>Prompt</Label>
                                <Textarea
                                    id={`prompt-${id}`}
                                    placeholder="Type your prompt here."
                                    value={prompt ? prompt : rootStore.getNodeData(id).prompt}
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
                    </div>
                    <div className='w-64'>
                        <Label>LLM System Prompt</Label>
                        <Textarea
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="mb-2"
                        />
                        <Label>LLM RAG Template</Label>
                        <Textarea
                            value={ragTemplate}
                            onChange={(e) => setRagTemplate(e.target.value)}
                            className="mb-2"
                        />
                        {ragTemplateError && <p className="text-red-500">{ragTemplateError}</p>}
                    </div>
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
});

export default memo(LLMNode);