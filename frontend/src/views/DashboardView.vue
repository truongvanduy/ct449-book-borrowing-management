<script setup>
import { ref, onMounted } from 'vue'

const book = ref(null)

onMounted(async () => {
  const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=javascript')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  } else {
    book.value = await response.json()
    console.log(book.value.items[0])
  }
})
</script>

<template>
  <h1 class="fs-1">Dashboard</h1>
  <md-outlined-select>
    <md-select-option aria-label="blank"></md-select-option>
    <md-select-option
      selected
      value="apple"
    >
      <div slot="headline">Apple</div>
    </md-select-option>
    <md-select-option value="apricot">
      <div slot="headline">Apricot</div>
    </md-select-option>
  </md-outlined-select>

  <md-filled-select>
    <md-select-option aria-label="blank"></md-select-option>
    <md-select-option value="apple">
      <div slot="headline">Apple</div>
    </md-select-option>
    <md-select-option value="apricot">
      <div slot="headline">Apricot</div>
    </md-select-option>
  </md-filled-select>
  <md-filled-button>Filled</md-filled-button>
  <md-elevated-button>Elevated</md-elevated-button>
  <md-outlined-button>Outlined</md-outlined-button>
  <md-filled-text-field
    label="Label"
    value="Value"
  >
  </md-filled-text-field>

  <md-outlined-text-field
    label="Label"
    value="Value"
  >
  </md-outlined-text-field>
  <md-outlined-select>
    <md-select-option aria-label="blank"></md-select-option>
    <md-select-option
      selected
      value="apple"
    >
      <div slot="headline">Apple</div>
    </md-select-option>
    <md-select-option value="apricot">
      <div slot="headline">Apricot</div>
    </md-select-option>
  </md-outlined-select>
  <md-chip-set>
    <md-assist-chip label="Assist"></md-assist-chip>
    <md-filter-chip label="Filter"></md-filter-chip>
    <md-input-chip label="Input"></md-input-chip>
    <md-suggestion-chip label="Suggestion"></md-suggestion-chip>
  </md-chip-set>
  <template v-if="book">
    <div
      v-for="item in book.items"
      :key="item.id"
    >
      <h2>{{ item.volumeInfo.title }}</h2>
      <p>{{ item.volumeInfo.authors }}</p>
      <!-- <img
        :src="item.volumeInfo.imageLinks.thumbnail"
        alt="book cover"
      /> -->
    </div>
  </template>
</template>
