import Axios, { AxiosResponse } from "axios";

export const SpeechRecognitionService = {
    findWord(data: any): Promise<AxiosResponse<any>> {
        return Axios.post(`/find-word`, data)
    }
}