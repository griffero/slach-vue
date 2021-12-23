<template>
  <div class="min-h-screen flex flex-col">
    <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <vue-typed-js
          :showCursor="false"
          :backSpeed="70"
          :typeSpeed="50"
          :smartBackspace="true"
          :strings="['Pagar SRápido', 'Pagar SFácil', 'Pagar SCómodo', 'Pagar Slach ⚡']"
        >
        <h2 class="typing mt-6 text-3xl font-bold"></h2>
      </vue-typed-js>

      <h3 class="my-6 text-center">Al registrarte obtendrás un link único que te servirá para recibir pagos de quién quieras.</h3>

      <h2 class="m-2 font-bold text-xl">{{ this.fullName }}</h2>

      <form @submit.prevent="onSubmit" method="POST" class="w-full mx-auto">
        <div class="h-20 mt-6">
          <div class="w-full flex flex-col">
            <input
                class="appearance-none block w-full bg-grey-lighter text-grey-900
                      border border-grey-lighter rounded py-4 px-4 leading-tight
                      focus:shadow-sm"
                :class="{ 'border-red-500': $v.rut.$error }"
                type="text"
                placeholder="Rut"
                id='rut-input'
                v-rut:live
                v-model.trim="rut"
                @change="getNameIfValidRut"
                @blur='touchIfPresentElseReset($v.rut)'
            >
            <transition name="vertical-slide-fade">
              <p
                class='z-10 absolute text-sm self-end py-4 pr-5 text-gray-600'
                v-if="rut != null && rut != ''"
              >
                Rut
              </p>
            </transition>
          </div>
          <div class='text-red-700 text-xs' v-if="$v.rut.$error && !(rut == null || rut == '')">
            Ingresa un rut válido 👮🏽‍♀
          </div>
          <div class='text-red-700 text-xs' v-if="!$v.rut.required && $v.rut.$error">
            Este campo es obligatorio
          </div>
        </div>

        <div class="h-20 mt-6">
          <div class="w-full flex flex-col">
            <select 
              v-model="bank"
              placeholder="Selecciona un banco"
              class="block w-full bg-grey-lighter text-grey-900
                     border border-grey-lighter rounded py-4 px-4 leading-tight
                    focus:shadow-sm"
            >
              <option v-for="_bank in banks" 
                      :key="_bank.id"
                      :value="_bank.id">
                {{ _bank.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="h-20 mt-6">
          <div class="w-full flex flex-col">
            <select
              v-model="accountType"
              placeholder="Selecciona un tipo de cuenta"
              class="block w-full bg-grey-lighter text-grey-900
                     border border-grey-lighter rounded py-4 px-4 leading-tight
                    focus:shadow-sm"
            >
              <option v-for="_accountType in accountTypes"
                      :value="_accountType.id"
                      :key="_accountType.id">
                {{ _accountType.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="h-20 mt-6">
          <div class="w-full flex flex-col">
            <input
                class="appearance-none block w-full bg-grey-lighter text-grey-900
                      border border-grey-lighter rounded py-4 px-4 leading-tight
                      focus:shadow-sm"
                type="text"
                name="accountNumber"
                placeholder="Número de cuenta"
                v-model.trim="accountNumber"
                id="account-number"
                @blur='touchIfPresentElseReset($v.accountNumber)'
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
          <div class='text-red-700 text-xs' v-if="$v.accountNumber.$error && !(accountNumber == null || accountNumber == '')">
            Ingresa un número de cuenta válido 👮🏽‍♀
          </div>
          <div class='text-red-700 text-xs' v-if="!$v.accountNumber.required && $v.accountNumber.$error">
            Este campo es obligatorio
          </div>
        </div>

        <div class="h-20 mt-6">
          <div class="w-full flex flex-col">
            <input
                v-model="email"
                class="appearance-none block w-full bg-grey-lighter text-grey-900
                      border border-grey-lighter rounded py-4 px-4 leading-tight
                      focus:shadow-sm"
                type="email"
                name="email"
                placeholder="Email"
                @blur='touchIfPresentElseReset($v.email)'
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
          <div class='text-red-700 text-xs' v-if="$v.email.$error && !(email == null || email == '')">
            Ingresa un email válido 👮🏽‍♀
          </div>
          <div class='text-red-700 text-xs' v-if="!$v.email.required && $v.email.$error">
            Este campo es obligatorio
          </div>
        </div>
        
        <div class="h-20 mt-2">
          Tu slach sera slach.cl/<span class="font-bold">{{alias}}</span>
          <div class="w-full flex flex-col">
            <input
                v-model.trim="alias"
                class="appearance-none block w-full bg-grey-lighter text-grey-900
                      border border-grey-lighter rounded py-4 px-4 leading-tight
                      focus:shadow-sm"
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
          <div class='text-red-700 text-xs' v-if="!$v.alias.required && $v.alias.$error">
            Este campo es obligatorio
          </div>
          <div class='text-red-700 text-xs' v-if="!(alias == null || alias == '') && !$v.alias.aliasAvailable">
            Este alias está tomado 👮🏽‍♀
          </div>
        </div>

        <div class='my-8'>
          <button
            class="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 
                  rounded w-full"
            :class="{
              'hover:opacity-50': !$v.$invalid, 'cursor-not-allowed': $v.$invalid, 'opacity-50': $v.$invalid, 
              'focus:outline-none': $v.$invalid, 'hover:bg-blue-500': !$v.$invalid, 'hover:text-white': !$v.$invalid,
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

<script>
  import axios from 'axios';
  import { individualRut } from '../validators/rut_validator.js';
  import { required, integer, email } from 'vuelidate/lib/validators';
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';

  export default {
    

    data () {
      return {
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
              axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/users/${alias}`)
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

    methods: {
      touchIfPresentElseReset(field) {
        if (field.$model !== null) {
          field.$touch();
        } else {
          field.$reset();
        }
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
        axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/users`, formData)
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
        return await axios.get(`${process.env.VUE_APP_ORACLE}/get_entity_by_rut?rut=${cleanRut}`)
          .then((response) => {
            return response.data.entity.name;
          })
      },
    } 
  }
</script>