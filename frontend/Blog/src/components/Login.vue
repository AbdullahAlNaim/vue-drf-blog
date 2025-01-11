<script>
export default {
    data () {
        return {
            loginData: {
                username: '',
                password: '',
            },
            csrfToken: '',
        }
    },
    created() {
        this.fetchCsrfToken();
    },
    methods: {
        async fetchCsrfToken() {
            try {
                const response = await fetch('http://localhost:8000/api/get-csrf-token');
                if (response.ok) {
                    this.csrfToken = await response.text();
                } else {
                    console.error('Failed to fetch CSRF token');
                }
            } catch (error) {
                console.error('Error fetching CSRF token: ', error);
            }
        },
        async login() {
            try {
                    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                    const response = await fetch('http://localhost:8000/loginlogin/?next=/blog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    body: JSON.stringify(this.loginData)
                });
                
                if(!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`)
                }

                this.$router.push('/blogs')

            } catch (error) {
                console.error('Error found: ', error);
            }
       }
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