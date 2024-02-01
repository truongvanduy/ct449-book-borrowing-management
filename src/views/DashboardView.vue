<template>
  <h1 class="heading h1">Dashboard</h1>
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

  <form>
    <!-- <md-filled-text-field
      name="name"
      label="Name"
      required
    >
    </md-filled-text-field> -->
    <input type="text" />
    <md-filled-button type="submit">
      <md-icon slot="icon">search</md-icon>
    </md-filled-button>
    <!-- <button type="submit">abc</button> -->
  </form>
</template>
