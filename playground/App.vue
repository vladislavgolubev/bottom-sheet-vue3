<script lang="ts" setup>
import { ref } from 'vue'
import { Sheet } from '../src'

const visible = ref(false)
const second = ref(false)
const showHidden = ref(false)
</script>

<template>
  <button @click="(visible = true)">
    Click to show
  </button>

  <Sheet v-model:visible="visible">
    <p v-for="n in 2">
      Hey how are you
    </p>

    <template v-if="showHidden">
      <p v-for="n in 15">
        Hey how are you
      </p>
    </template>


    <button @click="(showHidden = true)">
      show hidden
    </button>

    <button @click="(second = true)">
      Second
    </button>

    <Sheet v-model:visible="second">
      Secondos
    </Sheet>
  </Sheet>
</template>
