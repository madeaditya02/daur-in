export default defineEventHandler(async (event) => {
  const {token} = await readBody(event);
  console.log(token);
  await setUserSession(event, {
    user: {
      token,
      password: 'Hello'
    }
    // Any extra fields
  })
})
