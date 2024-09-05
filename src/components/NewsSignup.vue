<template>
    <section id="email-signup" class="signup-form">
        <div class="signup-container cap">
            <p class="cap signup-text">
                Sign up to our newsletter for updates, news and announcements
            </p>
            <div class="signup">
                <input class="email-input cap" v-model="email" placeholder="EMAIL" :disabled="signed_up"/>
                <button :disabled="signed_up" @click="signup()" class="email-submit">SUBSCRIBE</button>
            </div>
            <div class="signup-confirm">
                <p :class="{'signup-error': signup_error}" >{{signup_res}}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
	import { ref, computed } from 'vue'
	
	const email = ref(null)
	const signed_up = ref(false)
	const signup_res = ref('')
	const signup_url = import.meta.env.VITE_SIGNUP_URL
	const signup_error = ref(false)

	const signup = async() => {
		if (!email.value){
			signup_error.value = true
			signup_res.value = "PLEASE ENTER AN EMAIL"
		} else {
			signed_up.value = true
			const res = await fetch(signup_url, {
			    method: "post",
			    body: JSON.stringify({'email': email.value})
			})
			const json = await res.json()
			if (res.ok) {
				signup_error.value = false
	        	signup_res.value = 'THANK YOU FOR SIGNING UP'
			} else {
				console.log(json.message)
				signed_up.value = false
				signup_error.value = true
				signup_res.value = json.message
			}
		}
        
    }
</script>

<style scoped>

.signup-text{
  font-size: 22px;
  font-family: "Monument-Semi-Mono", monospace;
  margin: 0 auto 0;
  max-width: 536px;
}

.signup-confirm{
  font-size: 22px;
  font-family: "Monument-Semi-Mono", monospace;
  margin: 0 auto 0;
  max-width: 536px;
  padding: 1em 0 ;
}

.signup-form {
      padding: 0 3.5em 3.5em;
      font-size: 1em;
      display: flex;
      justify-content: center;
    }

    .signup-container {
      max-width: 599px;
      text-align: center;
      text-transform: uppercase;
    }

    .signup {
      margin: 1.6em auto 0;
      border: black solid 2px;
      max-width: 475px;
    }

    .email-input {
        font-size: 22px;
        width: 100%;
        font-family: "Monument-Semi-Mono", monospace;
        line-height: 1.2;
        height: 50px;
        padding-left: 10px;
        border: 0px;
    }

    .email-input:focus-visible {
      outline: none;
    }

    .email-submit {
          width: 100%;
          height: 50px;
          background-color: white;
          border: 0px solid black;
          border-top: 2px solid black;
          font-size: 22px;
          width: 100%;
          font-family: "Monument-Semi-Mono", monospace;          
          line-height: 1.2;
          cursor: pointer;
        }

    .email-submit:hover {
        background-color: var(--dawes-green);
        color: #8b0402;
    }

    .signup-confirm {
      height: 1em;
      margin-bottom: 2em;
    }

    .signup-error {
      color: #8b0402;
    }

    @media only screen and (min-width: 1500px){
        .signup-form{
          padding-top: 100px;
        }

        .news-index {
          padding-top: 100px;
        }
    }
    @media only screen and (min-width: 600px) {
        .signup-form {
          padding: 160px 30px 0px;
          padding-top: 160px;
          font-size: 1.6em;
        }

        .news-index {
          padding: 60px 30px 0px;
          padding-top: 100px;
          min-height: 100vh;
        }

        .signup{
          display: grid;
          grid-template-columns: 1fr 150px;
        }

        .email-submit {
          border-top: 0px;
          border-left: 2px solid black;
        }

    }
	
</style>