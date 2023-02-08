import { useContext, useEffect } from 'react';
import './App.css';
import { GameComponent } from './component/game.component';
import { VCContext, VCStateProvider } from './context/voice-controller.context';
import { VCStage } from './enum/voice-controller-stage.enum';
import { connectWebsocket, stopMicrophoneCapture } from './util/microphone-capture';

const AppBase = () => {

  const { updateStage, updateCommand } = useContext(VCContext)

  const updateCallback = (message: any) => {
    try {
      if (message.lastEvent === "RECOGNITION-COMPLETE") {
        console.log("recognition is complete");
        //If a word in the grammar has MATCHED
        if (message.status == "MATCH") {
          console.log(message.alternatives[0].utterance)
          updateCommand(message.alternatives[0].utterance)
        } else if (message.status == "NOMATCH") {
          console.log("Not able to match")
        }
      } else if (message.lastEvent !== "RECOGNITION-COMPLETE") {
        console.log("Error getting real-time grammar results.")
      } else throw new Error("Unable to obtain grammar.");
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const stageUpdateCallback = (stage: VCStage) => {
    console.log(stage)
    updateStage(stage)
  }

  useEffect(() => {
    console.log("starting voice engine...")
    connectWebsocket(updateCallback, stageUpdateCallback)
    return () => {
      stopMicrophoneCapture(stageUpdateCallback)
    }
  }, [])

  return (
    <>
      <GameComponent />
    </>
  );
}

export const App = () => {

  return <VCStateProvider>
    <AppBase />
  </VCStateProvider>
}
