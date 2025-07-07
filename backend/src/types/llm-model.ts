export interface LlmModelDto {
    id: number;
    llm_id: number;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateLlmModelDTO {
    llm_id: number;
    name: string;
    slug: string;
}

export interface UpdateLlmModelDTO {
    llm_id?: number;
    name?: string;
    slug?: string;
}
