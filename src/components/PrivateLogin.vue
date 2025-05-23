<template>
    <main v-if="!success && props.password" id="main" class="main private-login">
        <div class="login-form">
            <h2 class="form-heading visuallyhidden">Private Page</h2>
            <div class="input-group">
                <label for="password">Password</label>
                <input v-model=password type="text" id="password" name="password" required autocomplete="false" spellcheck="false"/>
            </div>
            <button class="button submit-button" aria-label="enter" @click.prevent="submit">ENTER</button>
            <p v-if="error" class="error">
                Incorrect Password
            </p>
        </div>
    </main>
</template>

<script setup>

import {ref, defineExpose, defineProps, computed } from 'vue'

const error = ref(false)
const password = ref(null)
const success = ref(false)

const props = defineProps(['password'])

defineExpose({success})

const submit = () =>{
    if (password.value === props.password){
        success.value = true
    } else {
        error.value = true
    }
}

</script>