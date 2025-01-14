import { defineStore } from 'pinia'
import router from '../router/index';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userToken: '',
        username: '',
        password: '',
        userLoggedIn: false,
        csrfToken: '',
        // posts: [],
    }),
    getters: {
        userCheck () {
            return this.userLoggedIn;
        },
        getToken () {
            return this.csrfToken;
        }
    },
    actions: {
        async getCsrfToken () {
            try {
                const response = await fetch('http://localhost:8000/csrf-token', { credentials: 'include'})
                if (response.ok) {
                    const data = await response.json();
                    this.csrfToken = data.csrf_token;
                    localStorage.setItem('csrfToken', this.csrfToken);
                    console.log('Fetched CSRF token: ', this.csrfToken);
                } else {
                    console.error('Failed to fetch CSRF token');
                }
            } catch (error) {
                console.error('Error fetching CSRF token: ', error);
            }
        },
        async login() {
            try { 
                    console.log(this.csrfToken)
                    const response = await fetch('http://localhost:8000/api/login/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-CSRFToken': this.csrfToken,
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    })
                });
                
                if(!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }

                
                this.userLoggedIn = true;

                // const data = await response.json();           

                router.push('/blogs');

            } catch (error) {
                console.error('Error found: ', error);
            }
       },
       async logout() {
        try {
            fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                },
            })
            this.userLoggedIn = false;
            console.log('logout successful');
        } catch (error) {
            console.error('Error found: ', error);
        }
       },
       async deletePost (id) {
        try {   
            const url = 'http://localhost:8000/blog/' + id + '/'
            console.log(url);
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.csrfToken,
                    // 'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                }
            })

            if (response.ok) {
                console.log('deleted post: ', id);
            } else {
                
                console.error(`failed to delete post. status ${response.status}`)
                
            }

        } catch (error) {
            console.error('Error found: ', error);
        }
       }
    }
})