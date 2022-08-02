<template>
  <div class="w-full">
    <div class="min-h-screen flex flex-col" v-if="!showInfo">
      <div class="w-full">
        <div v-if="!confirmed" class="min-h-screen mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <h3 class="text-xl font-bold text-gray-900">
            Debes confirmar tu correo para poder usar Slach
          </h3>
        </div>

        <div v-if="confirmed" class="w-full">
          <div
            v-if="showConfirmationAlert"
            class="text-center pt-2 lg:px-4">
            <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span class="font-medium mx-2 text-left flex-auto">Tu cuenta fue confirmada. Ya puedes empezar a usar Slach 🎉.</span>
            </div>
          </div>

          <div v-if="step == 0" class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2">
            <h1 class="text-xl md:text-3xl mt-12 mb-6 font-bold text-center text-gray-900">
              <span>¿Qué quieres hacer?</span>
            </h1>

            <form class="w-full max-w-screen-md mx-auto mt-12 mb-10">
              <div class="grid sm:grid-cols-2 gap-8">
                <label class="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 hover:text-white text-gray-800">
                  <span class="text-center text-2xl mb-3">
                    <font-awesome-icon icon="user"/>
                  </span>
                  <span class="font-semibold leading-tight uppercase mb-3 text-center">Pagar</span>
                  <span class="font-regular text-center">Quiero pagarle a <span class="font-medium">{{ user.name }}</span></span>
                  <input type="radio" value="true" class="absolute h-0 w-0 appearance-none" v-model="isPayer" />
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
                    <font-awesome-icon icon="hand-holding-dollar"/>
                  </span>
                  <span class="font-semibold leading-tight uppercase mb-3 text-center">Cobrar</span>
                  <span class="font-regular text-center">Soy <span class="font-medium">{{ user.name }}</span> y quiero que me paguen</span>
                  <input type="radio" value="false" class="absolute h-0 w-0 appearance-none" v-model="isPayer" />
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

            <button @click="moveForward"
                    class="font-medium px-4 border border-indigo-500 bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400
                           mt-8 py-2 mb-4 rounded-full text-white h-12 w-full text-center"
            >
              Continuar
            </button>
          </div>

          <div v-if="step == 1 && isPayer == 'true'" class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2">
            <h1 class="text-xl md:text-3xl mt-12 mb-6 font-bold text-center text-gray-900">
              <span>Le vas a pagar a <span class="text-indigo-500">{{ user.name }}</span></span>
            </h1>
            <p class="font-medium text-left text-gray-900 w-full">
              <span>¿Cuánto quieres transferir?</span>
            </p>
            <div class="mt-6 w-full">
              <input
                class="appearance-none block bg-grey-lighter text-grey-900 w-full h-12
                        border border-grey-lighter rounded-md py-4 px-4 leading-tight
                        focus:shadow-sm text-gray-900 placeholder-gray-400 mr-2 md:mr-6"
                placeholder="Elige monto"
                @input="sanitizeAmount"
                v-model.trim="$v.amount.$model"
              >
              <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.amount.$error">
                Ingresa un monto válido
              </div>
            </div>

            <button @click="moveForward"
                    :disabled='$v.amount.$invalid'
                    class="font-medium px-4 border border-indigo-500 bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400
                           mt-8 py-2 mb-4 rounded-full text-white h-12 w-full text-center opacity-50"
                    :class="{
                      'focus:outline-none': $v.amount.$invalid,
                      'cursor-not-allowed': $v.amount.$invalid,
                      'hover:bg-indigo-400': !$v.amount.$invalid,
                      'opacity-100': !$v.amount.$invalid,
                    }"

            >
              Continuar
            </button>
          </div>

          <div v-if="step == 1 && isPayer == 'false'" class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2">
            <h1 class="text-xl md:text-3xl mt-12 mb-6 font-bold text-center text-gray-900">
              <span>Instrucciones para cobrar</span>
            </h1>
            <p class="font-medium text-left text-gray-900 w-full">
              <span>¿Cuánto quieres cobrar?</span>
            </p>
            <div class="mt-6 w-full">
              <input
                class="appearance-none block bg-grey-lighter text-grey-900 w-full h-12
                        border border-grey-lighter rounded-md py-4 px-4 leading-tight
                        focus:shadow-sm text-gray-900 placeholder-gray-400 mr-2 md:mr-6"
                placeholder="Elige monto"
                @input="sanitizeAmount"
                v-model.trim="$v.amount.$model"
              >
              <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.amount.$error">
                Ingresa un monto válido
              </div>
            </div>
            <p class="text-sm text-left w-full text-gray-600">
              Déjalo en blanco si quieres que el destinatario seleccione el monto
            </p>


            <button @click="moveForward"
                    class="font-medium px-4 border border-indigo-500 bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400
                           mt-8 py-2 mb-4 rounded-full text-white h-12 w-full text-center"
            >
              Continuar
            </button>
          </div>
          
          <div v-if="step == 2 && isPayer == 'true'" class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2">
            <h1 class="text-xl md:text-3xl mt-12 mb-6 font-bold text-center text-gray-900">
              <span>Le vas a pagar ${{ formatPrice(amount) }} a <span class="text-indigo-500">{{ user.name }}</span></span>
            </h1>
            <button @click="initiatePayment"
                    class="font-medium px-4 border border-indigo-500 bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400
                           mt-6 py-2 mb-4 rounded-full text-white h-12 w-full text-center"
            >
              Pagar sin salir de Slach 📲 
            </button>

            <p class="text-sm text-left w-full text-gray-600">
              Entra a tu cuenta del banco desde acá y transfiere en segundos
            </p>
            <button @click="toggleManualTransfer"
                    class="font-medium px-4 border border-indigo-500 bg-indigo-500 hover:bg-indigo-400 hover:border-indigo-400
                           mt-12 py-2 mb-4 rounded-full text-white h-12 w-full text-center"
            >
              {{ manualTransfer ? 'Ocultar datos' : 'Ver datos para pagar manualmente 🏦' }}
            </button>
            <p class="text-sm text-left w-full text-gray-600" v-if="!manualTransfer">
              Te mostramos los datos bancarios y tú haces la transferencia
            </p>

            <div class="w-full" v-if="manualTransfer">
              <div class="w-full border rounded-lg py-4">
                <table class="mx-auto divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td class="px-6 pb-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Nombre completo:</div>
                        <div class="text-sm text-gray-900 font-bold">{{ user.name }}</div>
                      </td>
                      <td class="px-6 pb-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Rut:</div>
                        <div class="text-sm text-gray-900  font-bold">{{ user.rut | rutFilter }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.rut'
                                class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Banco:</div>
                        <div class="text-sm text-gray-900  font-bold">{{ humanizedBankName }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.bank'
                                class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Tipo:</div>
                        <div class="text-sm text-gray-900  font-bold">{{ humanizedAccountType }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.account_type'
                                class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Número:</div>
                        <div class="text-sm text-gray-900  font-bold">{{ user.account_number }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.account_number'
                                class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>

                    <tr>
                      <td class="px-6 pt-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">Email:</div>
                        <div class="text-sm text-gray-900  font-bold">{{ user.email }}</div>
                      </td>
                      <td class="px-6 pt-4 whitespace-nowrap text-right text-sm font-medium">
                        <button v-clipboard:copy='user.email'
                                class="bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                          <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center">
                <button v-clipboard:copy='allBankData'
                        class="mt-6 bg-transparent hover:bg-indigo-500 text-indigo-500 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                  <span class="mr-4">Copiar todos los datos</span> <font-awesome-icon icon="copy"/>
                </button>
              </div>
            </div>
          </div>

          <div v-if="step == 2 && isPayer == 'false'" class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2">
            <h1 class="text-xl md:text-3xl mt-12 mb-6 font-bold text-center text-gray-900">
              <span>Instrucciones para cobrar</span>
            </h1>

            <p class="font-medium text-center text-gray-900 w-full my-10">
              <span>Si estás con la persona, pídele que escanee el código QR</span>
            </p>
            <qr-code :text="textToEncode"></qr-code>

            <p class="font-medium text-center text-gray-900 w-full mt-10">
              <span>Si no, envíale tu cuenta de slach 👇</span>
            </p>
            <p class="text-3xl font-semibold text-center text-indigo-400 w-full mt-4">
              <span>{{ textToEncode }}</span>
            </p>
          </div>

          <div
            class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center md:justify-start px-2"
            v-if="step == 0 || isPayer == 'true'"
          >
            <button
              @click="() => $router.push({ path: '/' })"
              class="
                mt-20 py-2 mb-4 px-4 border h-12 w-full rounded-full
                font-medium text-center text-gray-800
                border-green-300 bg-green-300
                hover:bg-green-200 hover:border-green-200
              "
            >
              ¿Todavía no tienes <strong>Slach</strong>? Créalo acá
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-col bg-white" v-if="showInfo">
      <Info/>
    </div>
    <div class="text-center mt-6 w-full bg-gray-100 py-10">
      <h1 class="text-xl md:text-2xl text-gray-900">
        ¿Nuevo en slach.cl ⚡?
      </h1>
      <h3 class="my-2">
        ¡Te invitamos a <router-link class="text-indigo-500 font-bold" to="/">registrar</router-link> también tus datos!
      </h3>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Cómo funciona? ¿Para qué sirve?
      </h1>
      <h3 class="my-2 ">
        Más info <span class="text-indigo-500 cursor-pointer font-bold" @click="toggleShowInfo"> acá </span>
      </h3>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Tienes Feedback?
      </h1>
      <h3 class="my-2 ">
        <a href='https://www.twitter.com/CGriffero' target="_blank" class="text-indigo-500 cursor-pointer font-bold"> Escríbeme <font-awesome-icon :icon="[ 'fab', 'twitter' ]" /></a>
      </h3>
    </div>
  </div>
</template>

<style>
  .bg-slate {
    background-color: rgb(15, 23, 42);
  }

</style>

<script>
  import { getFintoc } from '@fintoc/fintoc-js';
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import axios from 'axios';
  import { required, integer, between } from 'vuelidate/lib/validators';
  import { cleanAmount } from '../validators/number_validator';
  import Info from '../views/Info.vue';
  import Vue from 'vue'
  import VueQRCodeComponent from 'vue-qr-generator'
  Vue.component('qr-code', VueQRCodeComponent)

  export default {
    data () {
      return {
        showInfo: false,
        amount: cleanAmount(this.$route.params.amount),
        user: {},
        step: 0,
        widget: null,
        widgetToken: null,
        confirmed: true,
        manualTransfer: false,
        isPayer: null,
      };
    },

    validations() {
      return {
        amount: {
          required,
          integer,
          between: between(1, 5000000)
        }
      }
    },

    created() {
      getFintoc();
      this.getUserFromAlias()
        .then((response) => {
          const dataResponse = response.data.data;
          this.$store.state.name = dataResponse.name;
          this.$store.state.rut = dataResponse.rut;
          this.$store.state.bank = dataResponse.bank;
          this.$store.state.account_number = dataResponse.account_number;
          this.$store.state.account_type = dataResponse.account_type;
          this.$store.state.email = dataResponse.email;
          this.$store.state.confirmed = dataResponse.confirmed;
          this.confirmed = dataResponse.confirmed;
          this.user = this.$store.state;
      });

      if(this.$route.params.amount == this.amount && this.amount > 0) {
        this.createPaymentIntent()
          .then((response) => {
            this.widgetToken = response.widget_token;
            this.initiatePayment();
          });
      }
    },

    components: {
      Info,
    },

    computed: {
      textToEncode() {
        if (this.amount > 0) {
          return `www.slach.cl/${this.alias}/${this.amount}`;
        } else {
          return `www.slach.cl/${this.alias}`;
        }
      },

      linkToCopy() {
        return `www.slach.cl/${this.alias}/${this.linkAmount}`;
      },

      allBankData() {
        return `Nombre: ${this.user.name}\nRut: ${this.user.rut}\nBanco: ${this.humanizedBankName}\nTipo de cuenta: ${this.humanizedAccountType}\nNúmero de cuenta: ${this.user.account_number}\nEmail: ${this.user.email}`;
      },

      linkAmount() {
        const isInvalidAmount = this.amount == null || this.amount == undefined || this.amount < 1
        return isInvalidAmount == true ? 'monto_a_transferir' : this.amount;
      },

      humanizedBankName() {
        const bank = banks.find(bank => bank.id === this.user.bank);
        return bank == undefined ? '' : bank.name;
      },

      humanizedAccountType() {
        const account = accountTypes.find(account_type => account_type.id === this.user.account_type);
        return account == undefined ? '' : account.name;
      },

      alias() {
        return this.$route.params.alias;
      },

      showConfirmationAlert() {
        return this.$route.query.confirmed == 'true';
      },
    },

    metaInfo: {
      description: `Paga de forma fácil sin tener que entrar a la app del banco. Pagar es Slach ⚡.`
    },

    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },

      moveForward() {
        this.step += 1;
      },

      toggleManualTransfer() {
        this.manualTransfer = !this.manualTransfer;
        if (this.manualTransfer) {
          window.analytics.track('ManualPaymentClicked')
        }
      },

      sanitizeAmount() {
        this.amount = cleanAmount(this.amount);
      },

      toggleShowInfo() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.showInfo = !this.showInfo;
      },

      async openFintocWidget() {
        const Fintoc = await getFintoc();
        this.widget = Fintoc.create({
          holderType: 'individual',
          product: 'payments',
          widgetToken: this.widgetToken,
          publicKey: `${process.env.VUE_APP_FINTOC_PUBLIC_KEY}`,
          webhookUrl: `${process.env.VUE_APP_FINTOC_WEBHOOK_URL}`,
          onExit: () => {
            this.$router.push({ path: `/${this.alias}` })
          },
          onSuccess: () => {
            this.$router.push({ path: `/${this.alias}` })
          },
        })
        this.widget.open();
      },


      initiatePayment() {
        window.analytics.track('FintocPaymentClicked')
        this.$v.amount.$touch();

        console.log(this.$v.$invalid);

        if (this.amount == undefined || this.amount < 0) { return; }

        if (this.$route.params.amount != this.amount) {
          this.createPaymentIntent()
            .then((response) => {
              this.widgetToken = response.widget_token;
              this.openFintocWidget();
            });
        } else {
          this.openFintocWidget();
        }
      },

      async getUserFromAlias() {
        return await axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/users/${this.alias}`)
          .then((response) => {
            return response;
          })
          .catch(() => {
            this.$router.push({ path: '/' })
          });
      },

      async createPaymentIntent() {
        const paymentData = {
          userAlias: this.alias,
          amount: this.amount
        }
        return await axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/api/v1/payment_intents`, { data: paymentData })
          .then((response) => {
            return response.data;
          });
      },
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

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
