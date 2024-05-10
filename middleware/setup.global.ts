export default defineNuxtRouteMiddleware(async (to, from) => {
  // const auth = useAuthStore();
  // console.log(auth.token);
  
  // if (!auth.token) {
  //   return navigateTo('/auth');
  // }
  // auth.getLoggedUser();
  // const user = await $fetch('https://daurin-api-production.up.railway.app/user')
  // console.log(user);
  const session: any = await useFetch('/api/user');
  console.log(session.data.value);
  useState('loggedUser', () => null)
  console.log(session.data.value);
  
  if (session.data.value?.user) {
    const user:any = await $fetch('https://daurin-api-production.up.railway.app/user', {
      headers: {
        "Authorization": "Bearer " + session.data.value.user.token
      }
    });
    // console.log(user);
    const loggedUser = useState('loggedUser')
    user.token = session.data.value.user.token
    loggedUser.value = user
    // if (!user) {
    //   return navigateTo('/auth')
    // }
  }
})