let stream = {};

async function captureImage(stream) {
    const mediaTrack = stream.getVideoTracks()[0];
    console.log(mediaTrack);
    const captureImg = new ImageCapture(mediaTrack);
    const photo = await captureImg.takePhoto();
    console.log(photo);
    const imgUrl = URL.createObjectURL(photo);
    console.log(imgUrl);
    document.querySelector('#photo').src = imgUrl;
}

async function getMedia() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        let vidElem = document.querySelector('#vid');
        vidElem.srcObject = stream;
        vidElem.addEventListener('loadedmetadata', () => {
            vidElem.play();
        });
        console.log(stream);
    } catch (error) {
        console.log(error);
    }
}

getMedia();

document.querySelector('#takePhoto').addEventListener('click', () => {
    console.log('hello');
    captureImage(stream);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(() => {
            console.log('Service Worker Registered');
        })
        .catch((err) => {
            console.log(err);
        });
}
