<template>
    <div id="app">
        <form action="" @submit.prevent="login">
            <input
                type="text"
                v-model="email"
                name="email"
                id="email"
                ref="email"
            />
            <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                ref="password"
            />
            <button type="submit">Logar</button>
        </form>
    </div>
</template>

<script>
import http from '../src/http';

export default {
    data() {
        return {
            email: 'Clinton.Robel69@hotmail.com',
            password: '123',
        };
    },
    methods: {
        async login() {
            try {
                const { data } = await http.post('/api/login', {
                    username: this.email,
                    password: this.password,
                });

                console.log(data);
            } catch (error) {
                if (error.response.data === 'Unauthorized') {
                    console.log('error');
                }
            }
        },
    },
};
</script>

<style></style>
