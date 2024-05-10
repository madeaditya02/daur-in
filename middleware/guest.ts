export default defineNuxtRouteMiddleware((to, from) => {
  const loggedUser: any = useState('loggedUser')
  if (loggedUser.value) {
    return navigateTo(loggedUser.role == 'Customer' ? '/' : '/dashboard')
  }
})
