import got from 'got';
import express from 'express' 
import cors from 'cors'
const app = express()
const port = 4040

app.use(cors())

app.get('/api/jwt', async (req, res) => {
    let voicegainApiUrl = new URL("https://api.voicegain.ai/v1/security/jwt");
    const bearer = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1OGIyNzg5Ny01YjBlLTQ3ZTYtOWMyYy0yMTI5ZjYxMGU2YjAiLCJhdWQiOiJodHRwczovL2FwaS52b2ljZWdhaW4uYWkvdjEiLCJzdWIiOiI3MjEyZDkxZS01MWM0LTQ4NmMtYjY4MC04YzZlZTQ0MDUwYTMifQ.QGJwOjJSquFwy1mu6Et2odi8VhFWWiVc7R7NwzlGoZk";
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
        res.send({ jwtToken: jwt_token });
    } catch (err) {
        console.log(err)
        res.status(err.response.statusCode).send(err.response.body);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})