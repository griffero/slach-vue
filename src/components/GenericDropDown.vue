<template>
  <div
    ref="dropDown"
    class="relative h-12"
  >
    <button
      data-test="drop-down-button"
      :class="`
        flex items-center justify-between rounded-lg font-medium min-w-max p-4 
        disabled:bg-gray-300 text-gray-900 border border-grey-lighter text-sm capitalize
        text-body-color w-full`
      "
      @click="toggle"
      :disabled='disabled'
    >
      <div> {{ title }} </div>
      <ChevronDown
        v-show="!disabled"
        class="ml-1.5 text-placeholder-color w-4 h-4"
      />
      
    </button>
    <div
      data-test="drop-down-list"
      v-click-outside="hide"
      class="
        absolute z-20 text-base list-none bg-white cursor-pointer mt-1 w-full
        divide-y divide-divider-color shadow-lg rounded-lg capitalize
      "
      :class="{ 'hidden': !opened }"
    >
      <ul class="py-1">
        <li v-for="option in options" :key="option.id" :value="option.id" >
          <span
            class="block py-2 px-4 text-sm bg-white text-body-color font-medium
                 focus:bg-gray-200 focus:text-primary-main
                 hover:bg-gray-200 hover:text-primary-hover
                   active:bg-primary-border active:text-primary-main"
            @click="() => select(option)"
          >
            {{ option.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import ChevronDown from '../assets/svg/ChevronDown.vue';

export default {
  data () {
    return {
      opened: false,
      selection: this.defaultSelection,
    };
  },

  mounted () {
    this.popupItem = this.$el
  },

  directives: {
    ClickOutside
  },

  components: {
    ChevronDown,
  },

  props: {
    options: Array,
    label: String,
    disabled: Boolean,
    defaultSelection: String,
  },

  methods: {
    toggle() {
      this.opened = !this.opened;
    },
 
    hide () {
      this.opened = false
    },

    select(option) {
      this.selection = option;
      this.$emit('sendSelection', option);
      this.opened = false;
    },
  },

  computed: {
    title() {
      return this.selection == null ? this.label : this.selection.name;
    },
  },
};
</script>