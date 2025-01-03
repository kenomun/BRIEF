<template>
    
    <div>
    <GoogleLogin :clientId="google_client_id" :callback="loginWithGoogle" />
    </div>
        
</template>
  
  <script>
  import { ref } from 'vue'
  import { GoogleLogin, decodeCredential } from 'vue3-google-login'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/useStore.js'

  export default {
    components: {
      GoogleLogin,
    },
    setup() {
        const google_client_id = '297585825425-2olunic5fqtu3ja8srsahdr1b1kgvt1i.apps.googleusercontent.com'

        const router = useRouter();
   
      
      // const loginWithGoogle = (response) => {
      //   console.log(response)
      //   const user = decodeCredential(response.credential)
      //   console.log(user)
      //   // alert('Redirecting to Google login...', user)
      //   router.push({name: 'AdminDashboard' });

      // }


      const loginWithGoogle = async (response) => {
      try {
        const user = decodeCredential(response.credential)
        // const res = await axios.post('/users/login', { email: user.email })
        const userData = res.data.data
        const imagen = user.picture
        const googleToken = response.credential
        if (res.status === 200) {
          const userStore = useUserStore()
          userStore.login({
            name: userData.name,
            token: userData.token,
            email: userData.email,
            role: userData.role,
            picture: imagen,
            googleToken: googleToken
          })

          router.push({ name: 'AdminDashboard' })
          // if(role ==1 ) router.push({name: ' '})
          // if(role ==2 ) router.push({name: ' '})
          // if(role ==3 ) router.push({name: ' '})
        }
      } catch (error) {
        if (error.response.status === 401) {
          // Usuario no registrado
          toast(error.response.data.msg, {
            type: 'error'
          })
        } else if (error.response.status === 403) {
          // Usuario sin autorización para acceder
          toast(error.response.data.msg, {
            type: 'error'
          })
        } else {
          console.log(error)
        }
      }
    }
  
      return {
        google_client_id,
        loginWithGoogle,
      }
    }
  }
  </script>
  
  <style scoped>
  /* Puedes añadir estilos adicionales específicos para este componente aquí */
  </style>