export interface ChatResponse {
    model: string
    created_at: string
    message: Message
    done_reason: string
    done: boolean
    total_duration: number
    load_duration: number
    prompt_eval_count: number
    prompt_eval_duration: number
    eval_count: number
    eval_duration: number
}

export interface Message {
    role: string
    content: string
}


export interface TagResponse {
    models: Model[]
}

export interface Model {
    name: string
    model: string
    modified_at: string
    size: number
    digest: string
    details: Details
}

export interface Details {
    parent_model: string
    format: string
    family: string
    families: string[]
    parameter_size: string
    quantization_level: string
}


export class Ollama {
    // api from https://www.postman.com/postman-student-programs/ollama-api/collection/suc47x8/ollama-rest-api
    private host: string;

    constructor({ host }: { host: string }) {
        this.host = host;
    }

    public async List(): Promise<TagResponse> {
        const response = await fetch(`${this.host}/api/tags`);
        return await response.json();
    }

    public async Chat(request: { model: string, messages: Message[] }): Promise<ChatResponse> {
        const payload = {
            model: request.model,
            messages: request.messages,
            stream: false,
        }
        const response = await fetch(`${this.host}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        return JSON.parse(await response.text());
    }
}
