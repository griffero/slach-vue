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
              <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">Alert</span>
              <span class="font-semibold mr-2 text-left flex-auto">Tu cuenta fue confirmada. Ya puedes empezar a usar Slach 🎉.</span>
            </div>
          </div>

          <div class="pt-6 pb-8 flex-1 px-2 mx-auto items-center justify-center flex flex-col w-full">
            <p class="text-gray-900" v-if='!userView'>Págale a</p>
            <h1 class="text-xl md:text-3xl mt-2 font-bold text-center text-gray-900">
              {{ user.name }}
            </h1>

            <div class="flex flex-row justify-start sm:justify-center h-12 mt-8 px-2 sm:px-0">
              <div class="flex">
                <div class="border h-10 y-10 rounded-full mr-4 my-auto" v-if='userView'>
                  <div class="relative w-10 h-10 rounded-full flex justify-center items-center text-center">
                    <span class="absolute text-8xl left-0 top-0"></span>
                    <font-awesome-icon class="text-gray-900" icon="1"/>
                  </div>
                </div>

                <p v-if="userView" class="text-gray-900 my-auto mr-4">Escribe</p>

                <div class="w-40 sm:w-40 mr-4 sm:mr-8">
                  <input
                    class="appearance-none block bg-grey-lighter text-grey-900 w-full h-12
                            border border-grey-lighter rounded py-4 px-4 leading-tight
                            focus:shadow-sm text-gray-900 placeholder-gray-400 mr-2 md:mr-6"
                    placeholder="monto a cobrar"
                    v-model.trim.lazy="$v.amount.$model"
                  >
                  <div class='dark:text-red-400 text-red-700 text-xs' v-if="$v.amount.$error">
                    Ingresa un monto válido
                  </div>
                </div>
                <button @click="initiatePayment"
                        class="font-semibold px-4 border border-indigo-700 bg-indigo-700 hover:bg-indigo-500 hover:border-indigo-500
                                py-5 mb-4 flex items-center rounded text-white h-12"
                >
                  <span>Pagar</span>
                </button>
              </div>
            </div>

            <div class="flex flex-row justify-start sm:justify-center mt-8 px-2 sm:px-0" v-if='userView'>
              <div class="flex">
                <div class="border h-10 y-10 rounded-full mr-4 my-auto">
                  <div class="relative w-10 h-10 rounded-full flex justify-center items-center text-center">
                    <span class="absolute text-8xl left-0 top-0"></span>
                    <font-awesome-icon class="text-gray-900" icon="2"/>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="text-center text-gray-900" v-if='userView'>
                  Para que te paguen, mándale este link a tus amigos 👇
                  <br>
                  <span class="font-bold hover:text-gray-400 cursor-pointer" v-clipboard:copy='linkToCopy'>
                    https://slach.cl/{{ alias }}/<span class="text-indigo-500">{{ linkAmount }}</span> <font-awesome-icon class="ml-1" icon="copy"/>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p v-if='!userView' class="text-center">o</p>

          <div class="container flex-1 px-2 mx-auto items-center justify-center flex flex-col">
            <h3 class="mb-6 text-center text-gray-900" v-if='userView'>
              Acá están tus datos bancarios
            </h3>
            <h3 class="mt-4 mb-6 text-center text-gray-900" v-if='!userView'>
              Transfierelé manualmente copiando los datos en tu banco 🛏️💤
            </h3>
            <div class="border rounded-lg py-4">
              <table class="inline-block md:hidden mx-auto divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 pb-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Nombre completo:</div>
                      <div class="text-sm text-gray-900 font-bold">{{ user.name }}</div>
                    </td>
                    <td class="px-6 pb-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Numero:</div>
                      <div class="text-sm text-gray-900  font-bold">{{ user.account_number }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.account_number'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="hidden md:inline-block mx-auto divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 pb-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Nombre completo:</div>
                    </td>
                    <td class="px-6 pb-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 font-bold">{{ user.name }}</div>
                    </td>
                    <td class="px-6 pb-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Rut:</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900  font-bold">{{ user.rut | rutFilter }}</div>
                    </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.rut'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Banco:</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900  font-bold">{{ humanizedBankName }}</div>
                    </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.bank'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Tipo:</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900  font-bold">{{ humanizedAccountType }}</div>
                    </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.account_type'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Numero:</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900  font-bold">{{ user.account_number }}</div>
                    </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.account_number'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td class="px-6 pt-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Email:</div>
                    </td>
                    <td class="px-6 pt-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900  font-bold">{{ user.email }}</div>
                    </td>
                    <td class="px-6 pt-4 whitespace-nowrap text-right text-sm font-medium">
                      <button v-clipboard:copy='user.email'
                              class="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                        <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center">
              <button v-clipboard:copy='allBankData'
                      class="mt-6 bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                <span class="mr-4">Copiar todos los datos</span> <font-awesome-icon icon="copy"/> 
              </button>
            </div>
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
        ¡Te invitamos a <router-link class="text-indigo-700 font-bold" to="/">registrar</router-link> también tus datos!
      </h3>
      <h1 class="mt-6 text-xl md:text-2xl text-gray-900">
        ¿Cómo funciona? ¿Para qué sirve?
      </h1>
      <h3 class="my-2 ">
        Más info <span class="text-indigo-700 cursor-pointer font-bold" @click="toggleShowInfo"> acá </span>
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

<style>
  .bg-slate {
    background-color: rgb(15, 23, 42);
  }

</style>

<script src="https://js.fintoc.com/v1/"></script>
<script>
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import axios from 'axios';
  import { required, integer, between, email } from 'vuelidate/lib/validators';
  import Info from '../views/Info.vue';

  export default {
    data () {
      return {
        showInfo: false,
        amount: this.$route.params.amount,
        user: {},
        widget: null,
        widgetToken: null,
        confirmed: true,
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
          });
      }
    },

    components: {
      Info,
    },

    computed: {
      userView() {
        return this.$route.params.amount == null;
      },

      linkToCopy() {
        return `https://slach.cl/${this.alias}/${this.linkAmount}`;
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
      toggleShowInfo() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.showInfo = !this.showInfo;
      },

      openFintocWidget() {
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
        this.$v.amount.$touch();
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