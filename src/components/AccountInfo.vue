<template>
  <div :class="containerClass" class="h-14 rounded px-4 mb-4 cursor-pointer text-gray-900">
    <div class="flex flex-row justify-between w-full text-sm">
      <div>
        <span class="font-bold mr-2"> {{ humanizedAccountType(account.account_type) }} </span> 
      </div>
      <div class="">
        # {{ account.account_number }} 
      </div>
    </div>
  </div>
</template>

<script>
import accountTypes from '../constants/account_types';
export default {
  props: {
    account: {
      balance: Object,
      number: Number,
      name: String,
    },
    containerClass: String,
  },

  methods: {
    humanizedAccountType(account_type) {
      return accountTypes.find(element => element.id == account_type).name;
    },  
  }
};
</script>

<style scoped>
.text-ai {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 80px);
  max-width: 280px;
  min-width: 200px;
}

.cell-disabled {
  background: #F5F5F8;
  border: 1px solid #C5C4D3;
}

.cell-selected {
  background: #F2F4FF;
  border: 2px solid #3753FF;
}

.cell-not-selected {
  background: #FFFFFF;
  border: 1px solid rgba(229, 231, 235);
}

.account-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}
</style>