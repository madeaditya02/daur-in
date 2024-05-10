export default defineEventHandler(async (event) => {
  const {token} = await readBody(event);
  await setUserSession(event, {
    user: {
      token
    }
    // Any extra fields
  })
})
