var messageName, canvas, ctx, images, img, nutSack, sourceImg, width, height;

nutSack = document.createElement('img');
nutSack.src = safari.extension.baseURI + 'nutsack.png';

function handleMessage(msgEvent) {
    messageName = msgEvent.name;

    if (messageName === "nutsack") {

        images = document.getElementsByTagName('img');

        for (var ix = 0; ix < images.length; ix++) {

            sourceImg = images[ix];

            width = sourceImg.clientWidth;
            height = sourceImg.clientHeight;

            if (width >= 100) {
                canvas = document.createElement('canvas');

                canvas.setAttribute('width', width.toString());
                canvas.setAttribute('height', height.toString());

                ctx = canvas.getContext('2d');
                ctx.drawImage(sourceImg, 0, 0, width, height);
                ctx.drawImage(nutSack, 0, 0, width, height);

                sourceImg.parentNode.replaceChild(canvas, sourceImg);

                // the images list is LIVE so we need to decrement the counter after the img is replaced by the canvas
                ix--;
            }
        }
    }
}

safari.self.addEventListener("message", handleMessage, false);
