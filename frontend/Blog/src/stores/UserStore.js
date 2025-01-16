import { defineStore } from 'pinia'
import router from '../router/index';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userToken: '',
        username: '',
        password: '',
        registerEmail: '',
        registerUsername: '',
        registerPassword: '',
        userLoggedIn: false,
        csrfToken: '',
        posted: [],
        title: '',
        body: '',
        singleViewData: {},
        authToken: '',
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
                    // console.log('Fetched CSRF token: ', this.csrfToken);
                } else {
                    console.error('Failed to fetch CSRF token');
                }
            } catch (error) {
                console.error('Error fetching CSRF token: ', error);
            }
        },
        async signUp() {
            try {
                const response = await fetch('http://localhost:8000/user/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        // 'X-CSRFToken': this.csrfToken,
                    },
                    body: JSON.stringify({
                        email: this.registerEmail,
                        username: this.registerUsername,
                        password: this.registerPassword,
                    })
                })

                if (!response.ok) {
                    console.log('Error found register response: ', response.status);
                }

                this.userLoggedIn = true;
                this.username = this.registerUsername;
                this.password = this.registerPassword;

                this.login();

                this.password = '';
                this.registerEmail = '';
                this.registerUsername = '';
                this.registerPassword = '';

            } catch (error) {
                console.error('Error found sign up :', error)
            }
        },
        async login() {
            try { 
                // console.log(this.csrfToken)
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

                })
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }

                const responseData = await response.json();
                this.authToken = responseData.token;
                this.userLoggedIn = true;  
                console.log(this.authToken);
                router.replace('/blogs')
                

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
                    'Authorization': `Token ${this.authToken}`
                },
            })
            this.userLoggedIn = false;
            console.log('logout successful');
        } catch (error) {
            console.error('Error found: ', error);
        }
       },
        async blogPosts() {
            try {
                // const token = document.cookie.match(/access_token=([^;]+)/)[1];
                const response = await fetch('http://localhost:8000/blog/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.authToken}`
                    }
                });
                // console.log(this.csrfToken)
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json();
                this.posted = data;

            } catch (error) {
                console.error('Error found: ', error);
            }
        },
       async createPost () {
        try {
            const response = await fetch('http://localhost:8000/blog/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                    'Authorization': `Token ${this.authToken}`
                },
                body: JSON.stringify({
                    title: this.title,
                    body: this.body
                })
            })

            this.title = '';
            this.body = '';
            router.replace('/blogs');


        } catch (error) {
            console.error('Error found creating post: ', error)
        }
       },
       async deletePost (id) {

        // console.log('deletePost called');
        const url = `http://localhost:8000/blog/${id}/`;
        // console.log('URL constructed:', url);

        try { 
            const response = await fetch(url, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                    'Authorization': `Token ${this.authToken}`
                },
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status ${response.status}`);
            }

            // console.log('deleted task: ', id)

            this.blogPosts();

            this.posted = this.posted.filter(post => post.id !== id);

            } catch (error) {
                console.error('Error found: ', error);
            }
        },
        async singlePost (id) {
            this.singleViewData = {}
            const url = `http://localhost:8000/blog/${id}/`
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.authToken}`
                    }
                })
                .then(response => response.json())
                .then(response => this.singleViewData = response)
            } catch (error) {
                console.error('Error found single post: ', error)
            }
        },
        async updatePost (id) {
            const url = `http://localhost:8000/blog/${id}/`
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.match(/csrftoken=([^;]+)/)[1],
                        'Authorization': `Token ${this.authToken}`
                    },
                    body: JSON.stringify({
                        title: this.singleViewData.title,
                        body: this.singleViewData.body
                    })
                })
                
                if (!response.ok) {
                    console.log('Error found updating: ', response.status);
                }

                router.replace('/blogs')

            } catch (error) {
                console.error('Error found single post: ', error)
            }
        }
    }
})