<template>
  <div
    class="box"
    @click="handleClick"
    role="button"
    tabindex="0"
  >
    <img
      :src="item.flipped ? item.image : dittoImage"
      :alt="item.name"
      class="pokemon-image"
    />
  </div>
</template>

<script setup>
// Definir las props correctamente
const props = defineProps({
  item: Object,
  dittoImage: String,
  onCardClick: Function
})

// Definir emits para una mejor práctica
const emit = defineEmits(['card-click'])

const handleClick = () => {
  emit('card-click', props.item)
}
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  position: relative;
  background-color: #FFCB05;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  border: 5px solid #2D70B7;
  box-sizing: border-box;
  transition: transform 0.1s ease;
}

.box:hover {
  transform: scale(1.05);
}

.box:active {
  transform: scale(0.95);
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>