export default defineNuxtRouteMiddleware((to, from) => {
  const loggedUser: any = useState('loggedUser')
  if (loggedUser.value.role != 'Agent') {
    return abortNavigation()
  }
  console.log(loggedUser.value.role);
})
