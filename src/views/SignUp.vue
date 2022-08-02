<template>
  <div class="w-full">
    <div class="flex flex-col bg-white dark:bg-gray-900" v-if="!showInfo">
      <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-start px-2 min-h-screen">

        <div v-if="step == 0" class="flex-1 flex flex-col items-center justify-start">
          <h3 class="mt-20 text-center font-medium text-3xl text-gray-800 dark:text-white">¿Para qué quieres usar Slach?</h3>
          <div class="flex items-center justify-center mt-20">
            <form class="w-full max-w-screen-md mx-auto">
              <div class="grid sm:grid-cols-2 gap-8">
                <label class="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 hover:text-white text-gray-800">
                  <span class="text-center text-2xl mb-3">
                    <font-awesome-icon icon="user"/>
                  </span>
                  <span class="font-semibold leading-tight uppercase mb-3 text-center">Personal</span>
                  <span class="font-regular text-center">Recibe pagos de tus amigos de forma fácil</span>
                  <input type="radio" value="false" class="absolute h-0 w-0 appearance-none" v-model="isBusiness" />
                  <span aria-hidden="true" class="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
                    <span class="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-green-600">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </span>
                </label>

                <label class="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 hover:text-white text-gray-800">
                  <span class="text-center text-2xl mb-3">
                    <font-awesome-icon icon="store"/>
                  </span>
                  <span class="font-semibold leading-tight uppercase mb-3 text-center">Negocio</span>
                  <span class="font-regular text-center">Recibe pagos en tu negocio con un link de pagos o un código QR</span>
                  <input type="radio" value="true" class="absolute h-0 w-0 appearance-none" v-model="isBusiness" />
                  <span aria-hidden="true" class="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
                    <span class="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-green-600">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </span>
                </label>
              </div>
            </form>
          </div>
          <button
            @click="moveForward"
            class="font-medium py-2 px-10 border border-gray-200 bg-indigo-500
                  mb-28 flex hover:bg-indigo-400 text-white rounded-full mt-20"
          >
            <span class="w-full">Continuar</span>
          </button>
        </div>

        <div v-if="step == 1" class="flex-1 flex flex-col items-center justify-start">
          <h3 class="mt-20 text-center font-medium text-3xl text-gray-800 dark:text-white">Ingresa tu usuario</h3>
          <h3 class="my-8 text-center text-lg text-gray-800 dark:text-white">Tu usuario es tu cuenta. <strong>No olvides tu usuario.</strong> Lo necesitarás para empezar a recibir pagos</h3>
          <div class="flex items-center justify-center mt-10 w-full">
            <form class="w-full max-w-screen-md mx-auto">
              <div class="h-16 mt-2">
                <span class="text-xl">Tu slach sera slach.cl/<span class="font-bold">{{ alias || 'usuario' }}</span></span>
                <div class="w-full flex flex-col mb-2">
                  <input
                      v-model.trim="$v.alias.$model"
                      class="appearance-none block w-full bg-grey-lighter text-grey-900
                            border border-grey-lighter rounded-lg py-4 px-4 leading-tight
                            focus:shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-700 dark:placeholder-white"
                      :class="{ 'border-red-500 dark:border-red-400': $v.alias.$error }"
                      type="text"
                      name="Usuario"
                      placeholder="Usuario"
                      @change="trimSpaces"
                  >
                  <transition name="vertical-slide-fade">
                    <p
                      class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                      v-if="alias !== null"
                    >
                      Usuario
                    </p>
                  </transition>
                </div>
                <div class='dark:text-red-400 text-red-700 text-xs' v-if="!$v.alias.required && $v.alias.$error">
                  Este campo es obligatorio
                </div>
                <div class='dark:text-red-400 text-red-700 text-xs' v-if="!(alias == null || alias == '') && !$v.alias.aliasAvailable">
                  Este usuario está tomado 😱
                </div>
              </div>
            </form>
          </div>
          <button
            @click="moveForward"
            class="font-medium py-2 px-10 border border-gray-200 mb-4 flex
                 text-white rounded-full mt-20 opacity-50 bg-indigo-500"
            :class="{
              'focus:outline-none': $v.alias.$invalid,
              'cursor-not-allowed': $v.alias.$invalid,
              'hover:bg-indigo-400': !$v.alias.$invalid,
              'opacity-100': !$v.alias.$invalid,
            }"
            :disabled='$v.alias.$invalid'
          >
            <span class="w-full">Continuar</span>
          </button>
          <span
            class="mb-28 text-indigo-500 hover:underline cursor-pointer hover:text-indigo-700"
            @click="moveBackwards"
          >
            atrás
          </span>
        </div>

        <div v-if="step == 2" class="flex-1 flex flex-col items-center justify-start">
          <h3 class="mt-20 text-center font-medium text-3xl text-gray-800 dark:text-white">Registra tus datos bancarios</h3>
          <h3 class="mt-8 text-center text-lg text-gray-800 dark:text-white">Los pagos llegaran directamente a la cuenta que registres acá.</h3>

          <div 
            class="flex items-center justify-center mt-10"
            v-if="!onboardedWithFintoc"
          >
            <div 
              class="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 hover:text-white text-gray-800"
              @click="openFintocWidget"
            >
              <span class="text-center text-2xl mb-3">
                <font-awesome-icon icon="bolt"/>
              </span>
              <span class="font-semibold leading-tight uppercase mb-3 text-center">Registro rápido</span>
              <span class="font-regular text-center">Inicia sesión en tu banco y obtén los datos automáticamente</span>
              <span aria-hidden="true" class="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
                <span class="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-green-600">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </span>
            </div>
          </div>

          <form @submit.prevent="onSubmit" method="POST" class="w-full mx-auto mt-10"  v-if="onboardedWithFintoc || true">

            <div class="h-16 mt-6">
              <div class="w-full flex flex-col">
                <input
                    class="block w-full disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                          border border-grey-lighter rounded-lg py-4 px-4 leading-tight
                          focus:shadow-s text-gray-900 placeholder-gray-700 dark:placeholder-white"
                    :class="{ 'border-red-500 dark:border-red-400': $v.rut.$error }"
                    type="text"
                    placeholder="Rut"
                    id='rut-input'
                    :disabled='onboardedWithFintoc'
                    v-model.trim="$v.rut.$model"
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
                  <GenericDropDown
                    :options="banks"
                    :label="'Banco'"
                    :disabled="onboardedWithFintoc"
                    :defaultSelection="bank"
                    @sendSelection="(option) => { bank = option }"
                  />
              </div>
            </div>

            <div v-if="!onboardedWithFintoc">
              <div class="h-16 mt-6">
                <div class="w-full flex flex-col">
                  <GenericDropDown
                    :options="accountTypes"
                    :label="'Tipo de cuenta'"
                    :defaultSelection="accountType"
                    @sendSelection="(option) => { accountType = option }"
                  />
                </div>
              </div>

              <div class="h-16 mt-6">
                <div class="w-full flex flex-col">
                  <input
                      class="appearance-none block w-full bg-grey-lighter text-grey-900 disabled:bg-gray-50
                            disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none border
                            border-grey-lighter rounded-lg py-4 px-4 leading-tight focus:shadow-sm
                            text-gray-900 placeholder-gray-700 dark:placeholder-white"
                      :class="{ 'border-red-500 dark:border-red-400': $v.accountNumber.$error }"
                      :disabled='onboardedWithFintoc'
                      type="text"
                      name="accountNumber"
                      placeholder="Número de cuenta"
                      v-model.trim="$v.accountNumber.$model"
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
                :class="{ 'border rounded-lg mt-1 px-4 pt-4' : sortedAccounts.length > 1 }"
              >
                <div v-for="account in sortedAccounts" :key='account.id' @click="selectAccount(account)">
                  <AccountInfo :account="account" :containerClass="accountClass(account)" :name='account'/>
                </div>
              </div>
            </div>
          </form>

          <button
            @click="moveForward"
            :disabled="!isStepThreeValid"
            class="font-medium py-2 px-10 border border-gray-200 mb-4 flex
                 text-white rounded-full mt-10 opacity-50 bg-indigo-500"
            :class="{
              'focus:outline-none': !isStepThreeValid,
              'cursor-not-allowed': !isStepThreeValid,
              'hover:bg-indigo-400': isStepThreeValid,
              'opacity-100': isStepThreeValid,
            }"
          >
            <span class="w-full">Continuar</span>
          </button>
          <span
            class="mb-28 text-indigo-500 hover:underline cursor-pointer hover:text-indigo-700"
            @click="moveBackwards"
          >
            atrás
          </span>
        </div>

        <div v-if="step == 3" class="flex-1 flex flex-col items-center justify-start">
          <h3 class="mt-20 text-center font-medium text-3xl text-gray-800 dark:text-white">¡Ya estamos casi!</h3>
          <h3 class="my-8 text-center text-lg text-gray-800 dark:text-white">
            Revisa que los datos sean los correctos y luego confirma tu mail para validar tu cuenta.
          </h3>

          <div class="bg-white shadow overflow-hidden sm:rounded-lg mt-2 w-full">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Información de tu cuenta</h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ fullName }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Banco</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ bank.name }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Tipo de cuenta</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ accountType.name }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Número de cuenta</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ accountNumber }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="mt-10 text-center">
            <p class="text-2xl">Tu usuario será: <strong class="text-indigo-600">{{ alias }}</strong></p>
            <p class="text-base mt-2 text-gray-600">
              Acuerdate que en slach no tienes una cuenta ni debes iniciar sesión. Solo debes conocer tu usuario para cobrar.
            </p>
          </div>

          <div class="flex items-center justify-center mt-6 w-full">
            <form class="w-full max-w-screen-md mx-auto">
              <div class="h-16 mt-6">
                <div class="w-full flex flex-col">
                  <input
                      v-model="email"
                      v-model.trim="$v.email.$model"
                      class="appearance-none block w-full bg-grey-lighter text-grey-900 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                            border border-grey-lighter rounded-lg py-4 px-4 leading-tight
                            focus:shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-700 dark:placeholder-white"
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
            </form>
          </div>
          <button
            @click="onSubmit"
            :disabled='$v.email.$invalid'
            class="font-medium py-2 px-10 border border-gray-200 mb-4 flex
                   text-white rounded-full mt-10 opacity-50 bg-indigo-500"
            :class="{
              'focus:outline-none': $v.email.$invalid,
              'cursor-not-allowed': $v.email.$invalid,
              'hover:bg-indigo-400': !$v.email.$invalid,
              'opacity-100': !$v.email.$invalid,
            }"
          >
            <span class="w-full">
              Confirmar email
              <font-awesome-icon icon="paper-plane"/>
            </span>
          </button>
          <span
            class="mb-20 text-indigo-500 hover:underline cursor-pointer hover:text-indigo-700"
            @click="moveBackwards"
          >
            atrás
          </span>
        </div>

        <div v-if="step == 4" class="flex-1 flex flex-col items-center justify-start">
          <h3 class="mt-20 text-center font-medium text-3xl text-gray-800 dark:text-white">¡Ya tenemos todos lo necesario para partir!</h3>
          <h3 class="mt-8 text-center text-lg text-gray-800 dark:text-white">Solo falta que confirmes tu email.</h3>
        </div>

      </div>
    </div>
    <div class="min-h-screen flex flex-col bg-white" v-if="showInfo">
      <Info/>
    </div>
    <div class="text-center mt-6 w-full bg-gray-100 py-10">
      <h1 class="mt-6 text-3xl md:text-5xl text-gray-900 font-bold">
        FAQ's
      </h1>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Cómo funciona? ¿Para qué sirve?
      </h1>
      <h3 class="my-2 ">
        Más info <span class="text-indigo-700 cursor-pointer font-bold" @click="toggleShowInfo"> acá </span>
      </h3>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Cómo se le paga a alguien que <span class="font-bold">tiene</span> Slach?
      </h1>
      <h3 class="my-2 ">
        Solo métete slach.cl/<span class="font-bold">usuario</span>
      </h3>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Tienes Feedback?
      </h1>
      <h3 class="my-2 ">
        <a href='https://www.twitter.com/CGriffero' target="_blank" class="text-indigo-700 cursor-pointer font-bold"> Escríbeme <font-awesome-icon :icon="[ 'fab', 'twitter' ]" /></a>
      </h3>
    </div>
  </div>
</template>

<script>
  import { getFintoc } from '@fintoc/fintoc-js';
  import axios from 'axios';
  import { individualRut, businessRut } from '../validators/rut_validator.js';
  import { minLength, required, integer, email } from 'vuelidate/lib/validators';
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import AccountInfo from '../components/AccountInfo.vue';
  import GenericDropDown from '../components/GenericDropDown.vue';
  import Info from '../views/Info.vue';
  

  export default {
    data () {
      return {
        accounts: null,
        account: null,
        accountNumber: null,
        alias: null,
        aliasAvailable: true,
        accountTypes,
        accountType: null,
        banks,
        bank: null,
        email: null,
        error: false,
        errorMessage: null,
        fullName: null,
        isBusiness: false,
        onboardedWithFintoc: false,
        rut: null,
        submited: false,
        step: 0,
        showInfo: false,
        session: null,
        widget: null,
      };
    },

    validations() {
      return {
        rut: {
          required,
          rutValidator: (rut) => individualRut(rut) || businessRut(rut),
        },
        alias: {
          required,
          aliasAvailable() {
            return this.aliasAvailable;
          },
          minLength: minLength(3),
        },
        accountNumber: {
          required,
          integer,
        },
        email: {
          email,
          required,
        },
        accountType: {
          required,
        },
        bank: {
          required,
        },
        isBusiness: {
          required,
        }
      };
    },

    watch: {
      rut: function() {
        if(!this.$v.rut.$invalid) {
          this.getNameFromOracle().then((response) => { this.fullName = response });
        }
      },

      alias: function() {
        this.checkAliasAvailable().then((response) => { this.aliasAvailable = response; });
        this.alias = this.alias.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      },
    },

    computed: {
      isStepThreeValid() {
        return !this.$v.rut.$invalid &&
          !this.$v.bank.$invalid &&
          !this.$v.accountType.$invalid &&
          !this.$v.accountNumber.$invalid &&
          !this.$v.alias.$invalid &&
          !this.$v.isBusiness.$invalid;
      },

      sortedAccounts() {
        if (this.accounts == null) {
          return [];
        }
        const accountTypes = ['checking_account', 'sight_account'];
        const currency = 'CLP';
        const filteredAccounts = this.accounts.filter((account) => accountTypes.includes(account.account_type) && account.currency === currency);
        if (filteredAccounts.length == 1) {
          return filteredAccounts;
        }
        const sortedAccounts = filteredAccounts.sort((a, b) => b.balance.available - a.balance.available);
        return sortedAccounts;
      },
    },

    created() {
      getFintoc();
      this.getSessionId()
        .then((response) => {
          this.session = response
        });
    },

    components: {
      Info,
      AccountInfo,
      GenericDropDown,
    },

    metaInfo: {
      description: 'Recibe transferencias de forma fácil con Slach. Totalmente gratis.'
    },

    methods: {
      checkAliasAvailable() {
        return new Promise ((resolve) => {
          axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/users/${this.alias}`)
            .then(() => {
              resolve(false);
            })
            .catch((error) => {
              if(error.response.status === 404) {
                console.clear();
                resolve(true);
              }
          })
        });
      },

      moveBackwards() {
        this.step -= 1;
        this.scrollUp();
      },

      moveForward() {
        this.step += 1;
        this.scrollUp();
      },

      scrollUp() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      },

      toggleShowInfo() {
        this.scrollUp();
        this.showInfo = !this.showInfo;
      },

      selectAccount(account) {
        this.account = account;
        this.accountType = this.accountTypes.find((account_type) => account_type.id === account.account_type);
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

      async openFintocWidget() {
        this.getSessionId()
          .then(async (response) => {
              this.session = response;
              const holderType = this.isBusiness ? 'business' : 'individual';
              const Fintoc = await getFintoc();
              this.widget = Fintoc.create({
              holderType: holderType,
              product: 'movements',
              publicKey: `${process.env.VUE_APP_FINTOC_PUBLIC_KEY}`,
              webhookUrl: `${process.env.VUE_APP_SLACH_BACKEND}/api/v1/fintoc/${this.session}/webhook`,
              onSuccess: () => {
                axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/session/${this.session}`)
                  .then((response) => {
                    this.fullName = response.data.full_name;
                    this.rut = response.data.rut;
                    this.bank = this.banks.find((bank) => bank.id === response.data.bank);
                    this.accounts = response.data.accounts;
                    this.selectAccount(this.sortedAccounts[0]);
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

      trimSpaces() {
        this.alias = this.alias.replace(/ /g, '').toLowerCase();
      },

      onSubmit() {
        if (this.$v.$invalid) { return; }

        const cleanRut = this.rut.replace(/[-.]/g, '');
        const cleanAlias = this.alias.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const formData = {
          rut: cleanRut,
          accountNumber: this.accountNumber,
          alias: cleanAlias,
          accountType: this.accountType.id,
          bank: this.bank.id,
          email: this.email,
          isBusiness: this.isBusiness
        };
        axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/users`, formData)
          .then(() => {
            this.submited = true;
            this.$router.push({ path: `/${this.alias}` });
            this.scrollUp();
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

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  input[type="radio"]:checked + span {
    display: block;
  }
</style>
