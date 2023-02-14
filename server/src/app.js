import got from 'got';
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 4040

app.use(cors())

app.get('/api/jwt', async (req, res) => {
    let voicegainApiUrl = new URL(process.env.API_URL);
    const bearer = "Bearer " + process.env.ACCESS_TOKEN;
    const options = {
        headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
        },
        searchParams: {
            aud: "localhost:3000",
            expInSec: process.env.TOKEN_EXPITY_TIME,
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