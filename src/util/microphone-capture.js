import { VCAction } from "../action/voice-controller.action";
import { VCStage } from "../enum/voice-controller-stage.enum";
import { AudioCaptureStreamingService } from "./audio-services";
let websocket;

//Configuring the request body to the API
let request = {
  sessions: [
    {
      asyncMode: "REAL-TIME",
      websocket: { adHoc: true, minimumDelay: 0, useSTOMP: false },
      continuousRecognition: {
        enable: true,
        stopOn: ["ERROR"],
        noResponseFor: ["INPUT-STARTED", "NOINPUT"],
      },
    },
  ],
  audio: {
    source: { stream: { protocol: "WEBSOCKET" } },
    format: "F32",
    rate: 16000,
    channels: "mono",
    capture: true,
  },
  settings: {
    asr: {
      confidenceThreshold: 0.175,
      noInputTimeout: 9000,
      incompleteTimeout: 2500,
      completeTimeout: 100,
      sensitivity: 0.1,
      grammars: [
        {
          type: "JJSGF",
          parameters: { "tag-format": "semantics/1.0-literals" },
          grammar: "command",
          public: {
            root:
              "<first> {first} | <second> {second} | <third> {third} | <fourth> {fourth}",
          },
          rules: {
            first: "up",
            second: "down",
            third: "((left) | (right))",
            fourth:
              "((stop) | (start))",
          },
        },
      ],
    },
  },
};

//Fetch temporary JWT Token and make call to Voicegain API to get websocket URLs
export const connectWebsocket = async (updateCallback, stageUpdateCallback) => {
  const audioContext = new AudioContext();
  const sampleRate = audioContext.sampleRate;
  const jwtApiUrl = new URL("http://localhost:4040/api/jwt");
  const websocketApiUrl = new URL(
    "https://api.voicegain.ai/v1/asr/recognize/async"
  );

  try {
    let fetchTempJwtResponse = await fetch(jwtApiUrl, { method: "GET" });
    if (fetchTempJwtResponse.ok) {
      let fetchTempJwtData = await fetchTempJwtResponse.json();
      let jwtToken = fetchTempJwtData.jwtToken;

      const fetchWebsocketUrl = async () => {
        const bearer = "Bearer " + jwtToken;

        const body = JSON.stringify(request);
        console.log("Request body: " + body);

        const options = {
          body,
          method: "POST",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        };

        try {
          showLoader(true, stageUpdateCallback);
          let fetchWebsocketResponse = await fetch(
            websocketApiUrl.toString(),
            options
          );

          if (fetchWebsocketResponse.ok) {
            let fetchWebsocketData = await fetchWebsocketResponse.json();
            let websocketSendUrl = fetchWebsocketData.audio.stream.websocketUrl; //streams audio to the recognizer
            let websocketReceiveUrl = fetchWebsocketData.sessions[0].websocket.url; //receives results

            startMicrophoneCapture(websocketSendUrl, websocketReceiveUrl, updateCallback, stageUpdateCallback);
          }
        } catch (err) {
          window.alert("Unable to start capture.");
          console.log(err);
        } finally {
          showLoader(false, stageUpdateCallback);
        }
      };

      fetchWebsocketUrl();
    } else throw new Error("Unable to fetch temporary JWT token.");
  } catch (err) {
    window.alert("Unable to fetch temporary JWT token.");
    console.log(err.message);
  } finally {
    audioContext.close();
  }
};

//Start audio capturing services using microphone input
const startMicrophoneCapture = (websocketSendUrl, websocketReceiveUrl, updateCallback, stageUpdateCallback) => {
  showCaptureStatus(true, stageUpdateCallback);
  AudioCaptureStreamingService.start(websocketSendUrl);

  //Connect to websocket to receive result data
  if (websocket === undefined) {
    const socket = new WebSocket(websocketReceiveUrl);
    socket.onopen = () => {
      console.log("Websocket is connected");
      socket.addEventListener("message", (event) => {
        stageUpdateCallback(VCStage.Ready)
        let currentDate = new Date();
        console.log("At " + currentDate + " Websocket message: " + event.data);
        const jsonData = JSON.parse(event.data);

        //Processing grammar websocket results
        updateCallback(jsonData)
      });

      //Resets text box highlight on websocket close
      socket.addEventListener("close", () => {
        console.log("Websocket closed.");
        AudioCaptureStreamingService.stop();
      });

      socket.addEventListener("error", (event) => {
        console.log("Websocket error:", event);
      });
    };
  }
};

//Stop audio capturing services
const stopMicrophoneCapture = (stageUpdateCallback) => {
  showCaptureStatus(false, stageUpdateCallback);
  AudioCaptureStreamingService.stop();
  if (websocket !== undefined) {
    websocket.close();
    websocket = undefined;
    // startButton.disabled = false;
    // stopButton.disabled = true;
  }
};

//Show loading spinner while fetching websocket data from API
const showLoader = (isLoading, stageUpdateCallback) => {
  console.log("isLoading", isLoading)
  if (isLoading) {
    stageUpdateCallback(VCStage.Loading)
  }
  // let loader = document.getElementById("loader-container");
  // if (isLoading === true) loader.style.display = "block";
  // else loader.style.display = "none";
};

//Show "Capturing..." in HTML when microphone capture is started
const showCaptureStatus = (isCapturing, stageUpdateCallback) => {
  console.log("isCapturing", isCapturing)
  if (isCapturing) {
    stageUpdateCallback(VCStage.Starting)
  }
  // let captureStatus = document.getElementById("capture-status");
  // if (isCapturing === true) captureStatus.style.display = "block";
  // else captureStatus.style.display = "none";
};

//Show "Finalizing..." in HTML when polling for transcript is started
const showFinalizingStatus = (isFinalizing) => {
  console.log("isFinalizing", isFinalizing)
  // let captureStatus = document.getElementById("finalizing-status");
  // if (isFinalizing === true) captureStatus.style.display = "block";
  // else captureStatus.style.display = "none";
};