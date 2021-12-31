<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <vue-typed-js
          :showCursor="false"
          :backSpeed="70"
          :typeSpeed="50"
          :smartBackspace="true"
          :strings="['Pagar SRápido', 'Pagar SFácil', 'Pagar SCómodo', 'Pagar Slach ⚡']"
        >
        <h2 class="typing mt-6 text-3xl font-bold text-gray-900 dark:text-white"></h2>
      </vue-typed-js>

      <h3 class="my-6 text-center text-gray-900 dark:text-white">Al registrarte obtendrás un link único que te servirá para recibir pagos de quién quieras.</h3>

      <button
        v-if="!onboardedWithFintoc"
        @click="openFintocWidget"
        class="text-white font-semibold py-2 px-4 border border-indigo-500 bg-indigo-500
               rounded w-full mb-4"
      >
        Registro automático con Fintoc
      </button>

      <h2 class="m-2 font-bold text-xl text-gray-900 dark:text-white" v-if="this.fullName">
        {{ this.fullName }}
      </h2>

      <form @submit.prevent="onSubmit" method="POST" class="w-full mx-auto">
        <div class="h-16 mt-6">
          <div class="w-full flex flex-col">
            <input
                class="block w-full disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                      border border-grey-lighter rounded py-4 px-4 leading-tight
                      focus:shadow-s text-gray-900 placeholder-gray-500 dark:placeholder-white"
                :class="{ 'border-red-500 dark:border-red-400': $v.rut.$error }"
                type="text"
                placeholder="Rut"
                id='rut-input'
                v-rut:live
                :disabled='onboardedWithFintoc'
                v-model.trim.lazy="$v.rut.$model"
                @change="getNameIfValidRut"
            >
            <transition name="vertical-slide-fade">
              <p
                class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600 dark:text-white'
                v-if="rut != null && rut != ''"
              >
                Rut
              </p>
            </transition>
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.rut.$error && !(rut == null || rut == '')">
            Ingresa un rut válido 👮🏽‍♀
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="!$v.rut.required && $v.rut.$error">
            Este campo es obligatorio
          </div>
        </div>

        <div class="h-16 mt-6">
          <div class="w-full flex flex-col">
            <select 
              v-model="bank"
              :disabled='onboardedWithFintoc'
              placeholder="Selecciona un banco"
              class="block w-full disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                    border border-grey-lighter rounded py-4 px-4 leading-tight
                    focus:shadow-s text-gray-900 placeholder-gray-500"
            >
              <option v-for="_bank in banks" 
                      :key="_bank.id"
                      :value="_bank.id">
                {{ _bank.name }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="!onboardedWithFintoc">
          <div class="h-16 mt-6">
            <div class="w-full flex flex-col">
              <select
                v-model="accountType"
                :disabled='onboardedWithFintoc'
                placeholder="Selecciona un tipo de cuenta"
                  class="block w-full disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:shadow-s text-gray-900 placeholder-gray-500"
              >
                <option v-for="_accountType in accountTypes"
                        :value="_accountType.id"
                        :key="_accountType.id">
                  {{ _accountType.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="h-16 mt-6">
            <div class="w-full flex flex-col">
              <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                        border border-grey-lighter rounded py-4 px-4 leading-tight
                        focus:shadow-sm text-gray-900 placeholder-gray-500 dark:placeholder-white"
                  :class="{ 'border-red-500 dark:border-red-400': $v.accountNumber.$error }"
                  :disabled='onboardedWithFintoc'
                  type="text"
                  name="accountNumber"
                  placeholder="Número de cuenta"
                  v-model.trim.lazy="$v.accountNumber.$model"
                  id="account-number"
              >
              <transition name="vertical-slide-fade">
                <p
                  class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                  v-if="accountNumber != null && accountNumber != ''"
                >
                  Número de cuenta
                </p>
              </transition>
            </div>
            <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.accountNumber.$error && !(accountNumber == null || accountNumber == '')">
              Ingresa un número de cuenta válido 👮🏽‍♀
            </div>
            <div class='dark:text-red-400 text-red-700 text-xs' v-if="!$v.accountNumber.required && $v.accountNumber.$error">
              Este campo es obligatorio
            </div>
          </div>
        </div>

        <div v-if="onboardedWithFintoc">
          <p class="mt-4" v-if="sortedAccounts.length > 1">
            Selecciona una cuenta
          </p>
          <div
            class="mt-4"
            :class="{ 'border rounded mt-1 px-4 pt-4' : sortedAccounts.length > 1 }"
          >
            <div v-for="account in sortedAccounts" :key='account.id' @click="selectAccount(account)">
              <AccountInfo :account="account" :containerClass="accountClass(account)"/>
            </div>
          </div>
        </div>

        <div class="h-16 mt-6">
          <div class="w-full flex flex-col">
            <input
                v-model="email"
                v-model.trim.lazy="$v.email.$model"
                class="appearance-none block w-full bg-grey-lighter text-grey-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                       border border-grey-lighter rounded py-4 px-4 leading-tight
                       focus:shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-white"
                :class="{ 'border-red-500 dark:border-red-400': $v.email.$error }"
                type="email"
                name="email"
                placeholder="Email"
            >
            <transition name="vertical-slide-fade">
              <p
                class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                v-if="email != null && email != ''"
              >
                Email
              </p>
            </transition>
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.email.$error && !(email == null || email == '')">
            Ingresa un email válido 👮🏽‍♀
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="!$v.email.required && $v.email.$error">
            Este campo es obligatorio
          </div>
        </div>
        
        <div class="h-16 mt-2">
          Tu slach sera slach.cl/<span class="font-bold">{{alias}}</span>
          <div class="w-full flex flex-col">
            <input
                v-model.trim.lazy="$v.alias.$model"
                class="appearance-none block w-full bg-grey-lighter text-grey-900
                       border border-grey-lighter rounded py-4 px-4 leading-tight
                       focus:shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-white"
                :class="{ 'border-red-500 dark:border-red-400': $v.alias.$error }"
                type="text"
                name="name"
                placeholder="Alias"
                @change="trimSpaces"
            >
            <transition name="vertical-slide-fade">
              <p
                class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                v-if="alias !== null"
              >
                Alias
              </p>
            </transition>
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="!$v.alias.required && $v.alias.$error">
            Este campo es obligatorio
          </div>
          <div class='dark:text-red-400 text-red-700 text-xs' v-if="!(alias == null || alias == '') && !$v.alias.aliasAvailable">
            Este alias está tomado 👮🏽‍♀
          </div>
        </div>

        <div class='my-12'>
          <button
            class="text-white font-semibold py-2 px-4 border border-indigo-500 bg-indigo-500
                   rounded w-full"
            :class="{
              'hover:opacity-50': !$v.$invalid, 'cursor-not-allowed': $v.$invalid, 'opacity-50': $v.$invalid, 
              'focus:outline-none': $v.$invalid, 'hover:bg-indigo-500': !$v.$invalid, 'hover:text-white': !$v.$invalid,
              'hover:border-transparent': !$v.$invalid
            }"
          >
            Registrarte
          </button>
        </div>

        <h1 v-if='error' class="mt-6 text-red-600">
          Oh no 😢 {{ errorMessage }}.
        </h1>
      </form>
    </div>
  </div>
</template>

<script src="https://js.fintoc.com/v1/"></script>
<script>
  import axios from 'axios';
  import { individualRut } from '../validators/rut_validator.js';
  import { required, integer, email } from 'vuelidate/lib/validators';
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import AccountInfo from '../components/AccountInfo.vue';

  export default {
    data () {
      return {
        accounts: null,
        account: null,
        session: null,
        widget: null,
        rut: null,
        email: null,
        fullName: null,
        accountNumber: null,
        alias: null,
        accountTypes,
        accountType: accountTypes[0].id,
        banks,
        bank: banks[0].id,
        submited: false,
        error: false,
        errorMessage: null,
        onboardedWithFintoc: false,
      };
    },

    validations() {
      return {
        rut: {
          required,
          rutValidator: individualRut,
        },
        alias: {
          required,
          aliasAvailable(alias) {
            return new Promise ((resolve) => {
              axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/users/${alias}`)
                .then(() => {
                  resolve(false);
                })
                .catch((error) => {
                  if(error.response.status === 404) {
                    console.clear();
                    resolve(true);
                  }
              })
            }
            );
          },
        },
        accountNumber: {
          required,
          integer,
        },
        email: {
          email,
          required,
        }
      };
    },

    computed: {
      sortedAccounts() {
        const accountTypes = [
          'checking_account', 'sight_account',
        ];
        const currency = 'CLP';
        const filteredAccounts = this.accounts.filter((account) => accountTypes.includes(account.account_type) && account.currency === currency);
        const sortedAccounts = filteredAccounts.sort((a, b) => b.balance.available - a.balance.available);
        return sortedAccounts;
      },
    },

    components: {
      AccountInfo,
    },

    created() {
      this.getSessionId()
        .then((response) => {
          this.session = response
        });
    },

    methods: {
      selectAccount(account) {
        this.account = account;
        this.accountType = account.account_type;
        this.accountNumber = account.account_number;
      },

      humanizedAccountType(account_type) {
        accountTypes.find(element => element.id == account_type);
      },

      accountClass(account) {
        if (this.account == account && this.sortedAccounts.length > 1) {
          return 'account-cell cell-selected';
        }
        return 'account-cell cell-not-selected';
      },

      openFintocWidget() {
        this.getSessionId()
          .then((response) => {
              this.session = response
              this.widget = Fintoc.create({
              holderType: 'individual',
              product: 'movements',
              publicKey: `${process.env.VUE_APP_FINTOC_PUBLIC_KEY}`,
              webhookUrl: `${process.env.VUE_APP_SLACH_BACKEND}/api/v1/fintoc/${this.session}/webhook`,
              onSuccess: () => {
                axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/session/${this.session}`)
                  .then((response) => {
                    this.fullName = response.data.full_name;
                    this.rut = response.data.rut;
                    this.bank = response.data.bank;
                    this.accounts = response.data.accounts;
                    this.selectAccount(this.accounts[0]);
                    this.onboardedWithFintoc = true;
                  })
              },
            })
            this.widget.open();
            })
      },

      async getSessionId() {
        if (this.session != null) {
          return this.session;
        }
        return await axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/session`)
          .then((response) => {
            return response.data.session;
          })
      },

      getNameIfValidRut() {
        if(!this.$v.rut.$invalid) {
          this.getNameFromOracle()
            .then((response) => {
              this.fullName = response
            })
        }
      },

      trimSpaces() {
        this.alias = this.alias.replace(/ /g, '').toLowerCase();
      },

      onSubmit() {
        if (this.$v.$invalid) { return; }
        
        const cleanRut = this.rut.replace(/[-.]/g, '');
        const formData = {
          rut: cleanRut,
          accountNumber: this.accountNumber,
          alias: this.alias,
          accountType: this.accountType,
          bank: this.bank,
          email: this.email
        };
        axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/users`, formData)
          .then(() => {
            this.submited = true;
            this.$router.push({ path: `/${this.alias}` })
          })
          .catch((error) => {
            this.error = true;
            this.errorMessage = error.response.data;
          });
      },

      async getNameFromOracle() {
        const cleanRut = this.rut.replace(/[-.]/g, '');
        return await axios.get(`${process.env.VUE_APP_ORACLE}/api/v1/get_entity_by_rut?rut=${cleanRut}`)
          .then((response) => {
            return response.data.entity.name;
          })
      },
    } 
  }
</script>