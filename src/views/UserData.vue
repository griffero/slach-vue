<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <h1 class="text-3xl font-bold">{{ user.name }}</h1>
      <h3 class="m-6">Mis datos bancarios son</h3>
      <div class="border rounded-lg py-4">
        <table class="mx-auto w-1/3 divide-y divide-gray-200">
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Nombre completo:</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-bold">{{ user.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button v-clipboard:copy='user.name' class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                   Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
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
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                  Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
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
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                  Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
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
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                  Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
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
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                  Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
                </button>
              </td>
            </tr>

            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">Email:</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900  font-bold">{{ user.email }}</div>
              </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button v-clipboard:copy='user.email'
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-flex items-center">
                  Copiar <font-awesome-icon icon="copy" class="ml-4"/> 
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button v-if="amount > 0" @click="openFintocWidget" class="my-6 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Pagar ${{ amount }}
      </button>
    </div>
  </div>
</template>

<script src="https://js.fintoc.com/v1/"></script>
<script>
  import banks from '../constants/banks';
  import accountTypes from '../constants/account_types';
  import axios from 'axios';
  export default {

    data () {
      return {
        user: {},
        widget: null,
        widgetToken: null
      };
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

      amount() {
        return this.$route.params.amount;
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
        return await axios.get(`${process.env.VUE_APP_SLACH_BACKEND}/users/${this.alias}`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            this.$router.push({ path: '/' })
          });
      },

      async createPaymentIntent() {
        const paymentData = {
          userAlias: this.alias,
          amount: this.amount
        }
        return await axios.post(`${process.env.VUE_APP_SLACH_BACKEND}/payment_intents`, { data: paymentData })
          .then((response) => {
            return response.data;
          });
      },
    }
  }
</script>