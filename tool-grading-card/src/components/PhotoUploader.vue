<template>
  <div class="form-container">
    <h3 class="title is-4 mb-4" style="color: #8B4513;">📷 配图归档</h3>
    
    <div class="box" style="background-color: #FFF8F0; border: 2px dashed #D2691E;">
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input 
            class="file-input" 
            type="file" 
            accept="image/*" 
            multiple
            @change="handleFileUpload"
          />
          <span class="file-cta" style="background-color: #8B4513;">
            <span class="file-icon">📁</span>
            <span class="file-label">选择图片文件</span>
          </span>
          <span class="file-name">
            支持 JPG, PNG, GIF 格式，可多选
          </span>
        </label>
      </div>

      <div class="has-text-centered my-4">
        <p class="has-text-grey">或</p>
      </div>

      <div class="columns is-centered">
        <div class="column is-narrow">
          <button class="button is-info" @click="openCamera">
            📸 使用摄像头拍摄
          </button>
        </div>
      </div>

      <div v-if="showCamera" class="mt-4">
        <div class="box" style="background-color: #000;">
          <video ref="videoElement" autoplay playsinline style="width: 100%; max-height: 300px; object-fit: contain;"></video>
        </div>
        <div class="field is-grouped is-grouped-centered mt-3">
          <p class="control">
            <button class="button is-danger" @click="closeCamera">
              取消
            </button>
          </p>
          <p class="control">
            <button class="button is-primary" @click="capturePhoto" style="background-color: #8B4513;">
              📸 拍摄
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="mt-4" v-if="modelValue.length > 0">
      <h4 class="title is-5 mb-3" style="color: #D2691E;">已上传图片 ({{ modelValue.length }})</h4>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="(photo, index) in modelValue" :key="index">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="photo.url" :alt="photo.name" style="object-fit: cover;" />
              </figure>
            </div>
            <div class="card-content" style="padding: 0.75rem;">
              <div class="field">
                <div class="control">
                  <input 
                    class="input is-small" 
                    type="text" 
                    placeholder="图片说明"
                    :value="photo.caption"
                    @input="updateCaption(index, $event.target.value)"
                  />
                </div>
              </div>
              <div class="field is-grouped is-grouped-right mt-2">
                <p class="control">
                  <button 
                    class="button is-small is-danger" 
                    @click="removePhoto(index)"
                  >
                    ✕ 删除
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="has-text-centered py-6 has-text-grey">
      <span class="is-size-4">🖼️</span>
      <p class="mt-2">暂无图片，请上传或拍摄藏品照片</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const videoElement = ref(null);
const showCamera = ref(false);
let mediaStream = null;

const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          url: e.target.result,
          name: file.name,
          caption: '',
          type: 'upload'
        };
        emit('update:modelValue', [...props.modelValue, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  }
  event.target.value = '';
};

const openCamera = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream;
    }
    showCamera.value = true;
  } catch (error) {
    alert('无法访问摄像头，请检查权限设置');
    console.error('Camera error:', error);
  }
};

const closeCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  showCamera.value = false;
};

const capturePhoto = () => {
  if (videoElement.value) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.value.videoWidth;
    canvas.height = videoElement.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement.value, 0, 0);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const newPhoto = {
      url: dataUrl,
      name: `captured_${Date.now()}.jpg`,
      caption: '',
      type: 'capture'
    };
    
    emit('update:modelValue', [...props.modelValue, newPhoto]);
    closeCamera();
  }
};

const updateCaption = (index, caption) => {
  const updatedPhotos = props.modelValue.map((photo, i) => 
    i === index ? { ...photo, caption } : photo
  );
  emit('update:modelValue', updatedPhotos);
};

const removePhoto = (index) => {
  const updatedPhotos = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedPhotos);
};
</script>

<style scoped>
.file-cta {
  background-color: #8B4513 !important;
  border-color: #8B4513 !important;
}

.file-cta:hover {
  background-color: #6B3410 !important;
}

.input.is-small {
  border-color: #D2691E;
  background-color: #FDF8F0;
}

.card {
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.15);
}
</style>
