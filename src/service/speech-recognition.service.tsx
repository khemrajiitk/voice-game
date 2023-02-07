import got from "got";
import { VOICE_GAIN_TOKEN } from "../enum/common.enum";

export const SpeechRecognitionService = {
    async getToken(): Promise<any> {
        let voicegainApiUrl = new URL("https://api.voicegain.ai/v1/security/jwt");
        const bearer = "Bearer " + VOICE_GAIN_TOKEN;
        const options = {
            headers: {
                Authorization: bearer,
                "Content-Type": "application/json",
            },
            searchParams: {
                aud: "localhost:3000",
                expInSec: 3600,
            },
        };

        try {
            const jwtResponse = await got(voicegainApiUrl.toString(), options);
            let jwt_token = jwtResponse.body;
            return { jwtToken: jwt_token }
        } catch (err: any) {
            console.log(err)
            throw (err.response.body)
        }
    }
}