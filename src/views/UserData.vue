<template>
  <div class="w-full">
    <div class="min-h-screen flex flex-col bg-white">
      <div class="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div
          v-if="showConfirmationAlert" 
          class="text-center py-4 lg:px-4 mb-2">
          <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
            <span class="font-semibold mr-2 text-left flex-auto">Tu cuenta fue confirmada. Ya puedes empezar a usar Slach 🎉.</span>
          </div>
        </div>
        <div v-if="!confirmed">
          <h3 class="text-xl font-bold text-gray-900">
            Debes confirmar tu correo para poder usar Slach
          </h3>
        </div>

        <div v-if="confirmed" class="mx-auto items-center justify-center flex flex-col">
          <h1 class="text-xl md:text-3xl font-bold text-center mt-6 text-gray-900">
            {{ user.name }}
          </h1>

          <div class="flex flex-row justify-center h-12 w-full mt-8 mb-6 px-2 sm:px-0">
            <input
              class="appearance-none block bg-grey-lighter text-grey-900 w-3/5
                    border border-grey-lighter rounded py-4 px-4 leading-tight
                    focus:shadow-sm text-gray-900 placeholder-gray-500 mr-2 md:mr-10"
              placeholder="Monto"
              v-model.trim.lazy="$v.amount.$model"
            >
            <button @click="openFintocWidget" 
                    class="font-semibold py-2 px-4 border border-indigo-500 bg-indigo-500
                          py-6 mb-4 flex items-center rounded-3xl text-white"
            >
              <span>Paga acá ⚡</span>
            </button>

          </div>

          <p class="text-center">o</p>


          <h3 class="mt-4 mb-6 text-center text-gray-900">Transfiere manualmente</h3>
          <div class="border rounded-lg py-4">
            <table class="inline-block md:hidden mx-auto divide-y divide-gray-200">
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 pb-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">Nombre completo:</div>
                    <div class="text-sm text-gray-900 font-bold">{{ user.name }}</div>
                  </td>
                  <td class="px-6 pb-4 whitespace-nowrap text-right text-sm font-medium">
                    <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                    <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
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
                            class="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded inline-flex items-center">
                      <span class="mr-4 hidden md:block">Copiar</span> <font-awesome-icon icon="copy"/> 
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-6 w-full bg-gray-100 py-10">
      <h1 class="text-xl md:text-2xl text-gray-900">
        ¿Nuevo en slach.cl ⚡?
      </h1>
      <h3 class="my-2">
        ¡Te invitamos a <router-link class="text-indigo-700 font-bold" to="/">registrar</router-link> también tus datos!
      </h3>
      <h1 class="text-xl md:text-2xl text-gray-900">
        ¿Tus datos están incorrectos?
      </h1>
      <h3 class="my-2 ">
        <router-link class="text-indigo-700 font-bold" to="/">Vuelve a registrarte</router-link> con tu mismo email
      </h3>
    </div>
  </div> 
</template>

<script src="https://js.fintoc.com/v1/"></script>
<script>
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import axios from 'axios';
  import { required, integer, email } from 'vuelidate/lib/validators';
  export default {

    data () {
      return {
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
    },

    computed: {
      humanizedBankName() {
        return banks.find(bank => bank.id === this.user.bank).name;
      },

      humanizedAccountType() {
        return accountTypes.find(account_type => account_type.id === this.user.account_type).name;
      },

      alias() {
        return this.$route.params.alias;
      },

      showConfirmationAlert() {
        return this.$route.query.confirmed == 'true';
      },
    },
    
    methods: {
      openFintocWidget() {
        this.createPaymentIntent()
          .then((response) => {
            this.widgetToken = response.widget_token
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
        });
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