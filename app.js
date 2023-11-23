import { client } from "@gradio/client";

async function fetchAndPredict(audioUrl) {
    try {
        const response = await fetch(audioUrl);
        const exampleAudio = await response.blob();
        
        const app = await client("https://sanchit-gandhi-whisper-large-v2.hf.space/");
        const result = await app.predict("/predict", [
            exampleAudio,    // blob in 'inputs' Audio component        
            "transcribe",    // string in 'Task' Radio component
        ]);

        return result;
    } catch (error) {
        console.error("Error fetching or predicting:", error);
        return "Error occurred";
    }
}

document.getElementById('audioForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const audioUrl = document.getElementById('audioUrl').value;
    const result = await fetchAndPredict(audioUrl);
    document.getElementById('result').textContent = JSON.stringify(result);
});
