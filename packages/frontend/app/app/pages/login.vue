<script lang="ts" setup>
import { graphql } from '~/gql';

definePageMeta({
  middleware: ['no-auth'],
  hideNavigationBar: true
});

const email = ref('');
const password = ref('');

const { executeMutation } = useMutation(
  graphql(/* GraphQL */ `
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `)
);

const token = useCookie('token', {
  secure: !import.meta.dev
});

const login = async () => {
  try {
    const response = await executeMutation({
      email: email.value,
      password: password.value
    });


    if (response?.data?.login?.token) {
      token.value = response.data.login.token;
    }

    await navigateTo('/recipes');
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="container max-w-lg p-4">
      <form
        class="flex w-full flex-col"
        @submit.prevent="login"
      >
        <Logo class="mb-10 h-10" />
        <input
          v-model="email"
          class="mb-2 block w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:border-pink-500 focus:ring-pink-500"
          type="text"
          placeholder="E-Mail"
        />
        <input
          v-model="password"
          class="mb-4 block w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:border-pink-500 focus:ring-pink-500"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" color="pink"> Login </Button>
      </form>
    </div>
  </div>
</template>
