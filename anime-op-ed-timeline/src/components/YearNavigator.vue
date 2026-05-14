<template>
  <div class="uk-card uk-card-default uk-height-viewport uk-overflow-auto">
    <div class="uk-card-header">
      <h3 class="uk-card-title">
        <span uk-icon="icon: calendar"></span>
        按年份筛选
      </h3>
    </div>
    <div class="uk-card-body uk-padding-remove">
      <ul class="uk-nav uk-nav-default">
        <li :class="{'uk-active': !selectedYear}">
          <a @click.prevent="$emit('select-year', null)">
            <span uk-icon="icon: list"></span>
            全部年份
          </a>
        </li>
        <li 
          v-for="year in years" 
          :key="year"
          :class="{'uk-active': selectedYear === year}"
        >
          <a @click.prevent="$emit('select-year', year)">
            <span class="uk-badge" :class="selectedYear === year ? 'uk-badge-primary' : ''">
              {{ year }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  years: {
    type: Array,
    required: true
  },
  selectedYear: {
    type: Number,
    default: null
  }
});

defineEmits(['select-year']);
</script>

<style scoped>
.uk-card {
  border-radius: 0;
}

.uk-nav {
  padding: 0;
}

.uk-nav li a {
  padding: 12px 20px;
  cursor: pointer;
}

.uk-nav li a:hover {
  background: #f8f8f8;
}

.uk-nav li.uk-active a {
  background: #1e87f0;
  color: white;
}

.uk-badge {
  min-width: 60px;
  padding: 5px 10px;
  font-size: 1rem;
}
</style>
