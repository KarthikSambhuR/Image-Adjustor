const uploadImage = document.getElementById("uploadImage");
const cancelButton = document.getElementById("cancelButton");
const optionsContainer = document.getElementById("optionsContainer");
const fileNameLabel = document.getElementById("fileNameLabel");
const resizeOption = document.getElementById("resizeOption");
const resizeWidth = document.getElementById("resizeWidth");
const resizeHeight = document.getElementById("resizeHeight");
const fillColor = document.getElementById("fillColor");
const compressionOption = document.getElementById("compressionOption");
const compressionQuality = document.getElementById("compressionQuality");
const outputSize = document.getElementById("outputSize");
const processImage = document.getElementById("processImage");
const downloadLink = document.getElementById("downloadLink");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

optionsContainer.style.display = 'none';

window.addEventListener("load", () => {
  compressionOption.value = "none";
  document.getElementById("compressionQualityLabel").style.display = "none";
  document.getElementById("compressionSizeLabel").style.display = "none";
});

uploadImage.addEventListener("change", () => {
  if (uploadImage.files.length > 0) {
    const file = uploadImage.files[0];
    const fileName = file.name;
    fileNameLabel.textContent = fileName;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resizeWidth.value = img.width;
      resizeHeight.value = img.height;

      document.getElementById("stylesheet").setAttribute("href", "style_selected.css");
      optionsContainer.style.display = 'block';
      cancelButton.style.display = 'inline-block';
    };
  } else {
    fileNameLabel.textContent = "Choose File";
    document.getElementById("stylesheet").setAttribute("href", "style_default.css");
    optionsContainer.style.display = 'none';
    cancelButton.style.display = 'none';
  }
});

cancelButton.addEventListener("click", () => {
  uploadImage.value = "";
  fileNameLabel.textContent = "Choose File"; 
  optionsContainer.style.display = 'none'; 
  cancelButton.style.display = 'none';
  document.getElementById("stylesheet").setAttribute("href", "style_default.css"); 
});

resizeOption.addEventListener("change", () => {
  document.getElementById("fillColorLabel").style.display = resizeOption.value === "fill" ? "block" : "none";
  document.getElementById("resizelabels").style.display = resizeOption.value === "none" ? "none" : "block";
});

compressionOption.addEventListener("change", () => {
  document.getElementById("compressionQualityLabel").style.display = compressionOption.value === "quality" ? "block" : "none";
  document.getElementById("compressionSizeLabel").style.display = compressionOption.value === "size" ? "block" : "none";
  document.getElementById("compressionlabels").style.display = compressionOption.value === "none" ? "none" : "block";
});

processImage.addEventListener("click", async () => {
  if (!uploadImage.files.length) return alert("Please upload an image first!");

  const file = uploadImage.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  const width = parseInt(resizeWidth.value, 10) || img.width;
  const height = parseInt(resizeHeight.value, 10) || img.height;

  canvas.width = width;
  canvas.height = height;

  if (resizeOption.value === "fill") {
    ctx.fillStyle = fillColor.value;
    ctx.fillRect(0, 0, width, height);

    const aspectRatio = Math.min(width / img.width, height / img.height);
    const newWidth = img.width * aspectRatio;
    const newHeight = img.height * aspectRatio;

    const offsetX = (width - newWidth) / 2;
    const offsetY = (height - newHeight) / 2;
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  } else if (resizeOption.value === "stretch") {
    ctx.drawImage(img, 0, 0, width, height);
  } else {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  }

  let dataUrl;
  if (compressionOption.value === "none") {
    dataUrl = canvas.toDataURL("image/jpeg"); // No compression, default quality
  } else {
    let quality = compressionOption.value === "quality" ? compressionQuality.value / 100 : 0.8;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  
    if (compressionOption.value === "size") {
      const desiredSize = outputSize.value * 1024;
      let currentQuality = 0.8;
      while (dataUrl.length > desiredSize && currentQuality > 0.1) {
        currentQuality -= 0.05;
        dataUrl = canvas.toDataURL("image/jpeg", currentQuality);
      }
    }
  }

  const originalFileName = file.name.split('.')[0]; 
  downloadLink.href = dataUrl;
  downloadLink.download = originalFileName + "_new.jpg"; 
  downloadLink.style.display = "inline-block";
  downloadLink.textContent = "Download Image";
});