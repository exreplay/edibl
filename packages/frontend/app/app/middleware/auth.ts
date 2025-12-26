import { checkAuthenticated } from '~/utils/checkAuthenticated';

export default defineNuxtRouteMiddleware(async () => {
  const authenticated = await checkAuthenticated();
  if (!authenticated) return navigateTo('/login');
});
