<template>
    <form @submit.prevent="userStore.login()">
        <input type="username"
        v-model="userStore.username"
        placeholder="username">
        <br>
        <input type="password"
        v-model="userStore.password"
        placeholder="password">
        <br>
        <button type="submit">Login</button>
    </form>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
export default {
    setup () {
        const userStore = useUserStore();
        return { userStore }
    },
    data () {
        return {
            loginData: {
                username: '',
                password: '',
            },
            userAuthenticated: false,
            // csrfToken: '',
        }
    },
    created() {
        this.userStore.getCsrfToken();
    },
    methods: {
        // async getCsrfToken () {
        //     try {
        //         const response = await fetch('http://localhost:8000/csrf-token');
        //         if (response.ok) {
        //             const data = await response.json()
        //             this.csrfToken = data.csrf_token;
        //             console.log('Fetched CSRF token: ', this.csrfToken)
        //         } else {
        //             console.error('Failed to fetch CSRF token');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching CSRF token: ', error);
        //     }
        // },
        async login() {
            try { 
                    console.log(this.csrfToken)
                    const response = await fetch('http://localhost:8000/api/login/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                    },
                    body: JSON.stringify({
                        username: this.loginData.username,
                        password: this.loginData.password,
                    })
                });
                
                if(!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }

                this.userAuthenticated = true;

                // const data = await response.json();           

                this.$router.push('/blogs');

            } catch (error) {
                console.error('Error found: ', error);
            }
       },
    }
}
</script>
