<script setup>
import { MdList, MdListItem } from '@material/web/all'
import { onMounted, ref } from 'vue'

const listItem = ref(null)

onMounted(() => {
  console.log(listItem.value)
})
</script>

<template>
  <h2 class="heading h2">Settings</h2>
  <md-list ref="listItem">
    <md-list-item
      interactive
      type="text"
      tabindex="0"
    >
      <div slot="headline">Fruits</div>
    </md-list-item>
    <md-divider></md-divider>

    <md-list-item
      interactive
      type="text"
      tabindex="0"
    >
      Apple
      <md-switch
        slot="end"
        selected
      ></md-switch>
    </md-list-item>
    <md-list-item
      interactive
      type="text"
      tabindex="0"
    >
      Banana
      <md-switch
        slot="end"
        selected
      ></md-switch>
    </md-list-item>
    <md-list-item
      interactive
      type="text"
      tabindex="0"
    >
      <div slot="headline">Cucumber</div>
      <div slot="supporting-text">
        Cucumbers are long green fruits that are just as long as this multi-line description
      </div>
      <md-switch
        slot="end"
        selected
      ></md-switch>
    </md-list-item>
    <md-list-item
      interactive
      type="text"
      tabindex="0"
      target="_blank"
    >
      <div slot="headline">Shop for Kiwis</div>
      <div slot="supporting-text">This will link you out in a new tab</div>
      <md-switch
        slot="end"
        selected
      ></md-switch>
    </md-list-item>
  </md-list>
  <md-switch aria-label="Lights"></md-switch>

  <label>
    All
    <md-switch aria-label="All notifications"></md-switch>
  </label>
</template>

<style scoped>
h2.h2.heading {
  padding-left: 16px;
}
</style>
