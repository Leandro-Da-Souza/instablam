let stream = {};
let img = document.querySelector('#photo');

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

function greyScale() {
    Caman('#photo', function () {
        this.revert();
        this.greyscale().render();
    });
}

function gamma() {
    Caman('#photo', function () {
        this.revert();
        this.gamma(1.5).render();
    });
}

function moreGamma() {
    Caman('#photo', function () {
        this.revert();
        this.gamma(3).render();
    });
}

function vintage() {
    Caman('#photo', function () {
        this.revert();
        this.vintage().render();
    });
}

function nostalgia() {
    Caman('#photo', function () {
        this.revert();
        this.nostalgia().render();
    });
}

document.querySelector('#takePhoto').addEventListener('click', () => {
    captureImage(stream);
});

document.querySelector('#grey').addEventListener('click', () => {
    console.log(img.src);
    if (img.src === 'https://localhost:5500/') {
        alert('Please Take A Photo First');
        return;
    } else {
        greyScale();
    }
});

document.querySelector('#gamma').addEventListener('click', () => {
    console.log(img.src);
    if (img.src === 'https://localhost:5500/') {
        alert('Please Take A Photo First');
        return;
    } else {
        gamma();
    }
});

document.querySelector('#gammaer').addEventListener('click', () => {
    console.log(img.src);
    if (img.src === 'https://localhost:5500/') {
        alert('Please Take A Photo First');
        return;
    } else {
        moreGamma();
    }
});

document.querySelector('#vintage').addEventListener('click', () => {
    console.log(img.src);
    if (img.src === 'https://localhost:5500/') {
        alert('Please Take A Photo First');
        return;
    } else {
        vintage();
    }
});
document.querySelector('#nostalgia').addEventListener('click', () => {
    console.log(img.src);
    if (img.src === 'https://localhost:5500/') {
        alert('Please Take A Photo First');
        return;
    } else {
        nostalgia();
    }
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
