export default defineNuxtRouteMiddleware(async (to, from) => {
  // const auth = useAuthStore();
  // console.log(auth.token);
  
  // if (!auth.token) {
  //   return navigateTo('/auth');
  // }
  // auth.getLoggedUser();
  // const user = await $fetch('https://daurin-api-production.up.railway.app/user')
  // console.log(user);
  
  
  // const session: any = await useFetch('/api/user');
  // console.log(session.data.value);
  // useState('loggedUser', () => null)
  // if (session.data.value.user) {
  //   const user = await $fetch('https://daurin-api-production.up.railway.app/user', {
  //     headers: {
  //       "Authorization": "Bearer " + session.data.value.user.token
  //     }
  //   });
  //   // console.log(user);
  //   const loggedUser = useState('loggedUser')
  //   loggedUser.value = user

  //   if (!user) {
  //     return navigateTo('/auth')
  //   }
  // } else {
  //   const user = {email: 'imadeaditya4@gmail.com', name: 'Made Aditya'}
  //   console.log('Hello');
  //   return navigateTo('/auth')
  // }

  const loggedUser = useState('loggedUser')
  // console.log(loggedUser.value);
  if (!loggedUser.value) {
    return navigateTo('/auth')
  }
})
