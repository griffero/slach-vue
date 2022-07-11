<template>
  <div class="w-full">
    <div class="flex flex-col bg-white dark:bg-gray-900">
      <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-start px-2">
        <div class="flex-1 flex flex-col items-center justify-start">
          <h2 class="mt-12 text-6xl font-bold text-gray-900 dark:text-white">⚡ Slach ⚡</h2>

          <h3 class="my-12 text-center text-2xl text-gray-800 dark:text-white">Al registrarte obtendrás un <strong>link único que te servirá para recibir pagos</strong> de quién quieras.</h3>

          <router-link
            to="/accounts"
            class="font-medium py-2 px-10 border border-gray-200 bg-indigo-500
                  mb-28 flex hover:bg-indigo-400 text-white rounded-full"
          >
            <span class="w-full">Empezar</span>
          </router-link>
        </div>
      </div>
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
