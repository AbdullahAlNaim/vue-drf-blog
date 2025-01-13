<script>
export default {
    
    data () {
        return {
            loginData: {
                username: '',
                password: '',
            },
            // csrfToken: '',
        }
    },
    created() {
        // this.getCsrfToken();
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
                    throw new Error(`HTTP error! status ${response.status}`)
                }

                const data = await response.json();           

                this.$router.push('/blogs')

            } catch (error) {
                console.error('Error found: ', error);
            }
       },
    }
}
</script>

<template>
    <form @submit.prevent="login">
        <input type="username"
        v-model="loginData.username"
        placeholder="username">
        <br>
        <input type="password"
        v-model="loginData.password"
        placeholder="password">
        <br>
        <button type="submit">Login</button>
    </form>
</template>