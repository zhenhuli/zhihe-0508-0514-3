const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const actionButtons = document.getElementById('actionButtons');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

let originalImage = null;
let currentImageData = null;

const sliders = {
  brightness: document.getElementById('brightness'),
  contrast: document.getElementById('contrast'),
  saturate: document.getElementById('saturate'),
  blur: document.getElementById('blur'),
  hueRotate: document.getElementById('hueRotate'),
  sepia: document.getElementById('sepia'),
  sharpness: document.getElementById('sharpness')
};

const valueDisplays = {
  brightness: document.getElementById('brightnessValue'),
  contrast: document.getElementById('contrastValue'),
  saturate: document.getElementById('saturateValue'),
  blur: document.getElementById('blurValue'),
  hueRotate: document.getElementById('hueRotateValue'),
  sepia: document.getElementById('sepiaValue'),
  sharpness: document.getElementById('sharpnessValue')
};

const defaultValues = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  blur: 0,
  hueRotate: 0,
  sepia: 0,
  sharpness: 0
};

uploadArea.addEventListener('click', () => imageInput.click());

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    loadImage(file);
  }
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    loadImage(file);
  }
});

function loadImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      
      const maxWidth = 800;
      const maxHeight = 600;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      currentImageData = ctx.getImageData(0, 0, width, height);

      uploadArea.classList.add('d-none');
      previewContainer.classList.remove('d-none');
      actionButtons.style.display = 'flex';
      actionButtons.style.gap = '12px';
      actionButtons.classList.remove('d-none');

      applyFilters();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function applyFilters() {
  if (!originalImage) return;

  const brightness = sliders.brightness.value;
  const contrast = sliders.contrast.value;
  const saturate = sliders.saturate.value;
  const blur = sliders.blur.value;
  const hueRotate = sliders.hueRotate.value;
  const sepia = sliders.sepia.value;
  const sharpness = sliders.sharpness.value;

  valueDisplays.brightness.textContent = brightness;
  valueDisplays.contrast.textContent = contrast;
  valueDisplays.saturate.textContent = saturate;
  valueDisplays.blur.textContent = blur;
  valueDisplays.hueRotate.textContent = hueRotate;
  valueDisplays.sepia.textContent = sepia;
  valueDisplays.sharpness.textContent = sharpness;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.filter = `
    brightness(${brightness}%)
    contrast(${contrast}%)
    saturate(${saturate}%)
    blur(${blur}px)
    hue-rotate(${hueRotate}deg)
    sepia(${sepia}%)
  `;

  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

  if (sharpness > 0) {
    ctx.filter = 'none';
    applySharpness(sharpness);
  }
}

function applySharpness(amount) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  const weight = amount / 100;
  const kernel = [
    0, -weight, 0,
    -weight, 1 + 4 * weight, -weight,
    0, -weight, 0
  ];

  const output = ctx.createImageData(width, height);
  const dst = output.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx));
          const py = Math.min(height - 1, Math.max(0, y + ky));
          const idx = (py * width + px) * 4;
          const k = kernel[(ky + 1) * 3 + (kx + 1)];
          r += data[idx] * k;
          g += data[idx + 1] * k;
          b += data[idx + 2] * k;
        }
      }

      const dstIdx = (y * width + x) * 4;
      dst[dstIdx] = Math.min(255, Math.max(0, r));
      dst[dstIdx + 1] = Math.min(255, Math.max(0, g));
      dst[dstIdx + 2] = Math.min(255, Math.max(0, b));
      dst[dstIdx + 3] = data[dstIdx + 3];
    }
  }

  ctx.putImageData(output, 0, 0);
}

Object.values(sliders).forEach(slider => {
  slider.addEventListener('input', applyFilters);
});

resetBtn.addEventListener('click', () => {
  Object.keys(sliders).forEach(key => {
    sliders[key].value = defaultValues[key];
  });
  applyFilters();
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `restored-photo-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
});

const presetButtons = document.querySelectorAll('[data-preset]');
presetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const preset = btn.dataset.preset;
    applyPreset(preset);
  });
});

function applyPreset(preset) {
  const presets = {
    restore: {
      brightness: 120,
      contrast: 130,
      saturate: 120,
      blur: 1,
      hueRotate: 0,
      sepia: 0,
      sharpness: 30
    },
    portrait: {
      brightness: 110,
      contrast: 115,
      saturate: 110,
      blur: 2,
      hueRotate: 350,
      sepia: 5,
      sharpness: 20
    },
    landscape: {
      brightness: 115,
      contrast: 125,
      saturate: 140,
      blur: 0,
      hueRotate: 10,
      sepia: 0,
      sharpness: 40
    },
    bw: {
      brightness: 105,
      contrast: 120,
      saturate: 0,
      blur: 0.5,
      hueRotate: 0,
      sepia: 20,
      sharpness: 25
    }
  };

  if (presets[preset]) {
    const p = presets[preset];
    Object.keys(p).forEach(key => {
      sliders[key].value = p[key];
    });
    applyFilters();
  }
}
