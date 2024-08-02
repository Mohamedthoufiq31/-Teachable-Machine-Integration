const modelURL = 'path_to_your_model/model.json';

let model;

async function loadModel() {
    model = await tf.loadGraphModel(modelURL);
    console.log('Model loaded.');
}

async function predict(imageElement) {
    const img = tf.browser.fromPixels(imageElement).resizeBilinear([224, 224]).expandDims().toFloat().div(127.5).sub(1);
    const prediction = await model.predict(img).data();
    return prediction;
}

document.getElementById('imageUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
        const image = new Image();
        image.src = e.target.result;
        
        image.onload = async () => {
            const prediction = await predict(image);
            document.getElementById('prediction').innerText = `Prediction: ${prediction}`;
        };
    };
    
    reader.readAsDataURL(file);
});

loadModel();
