<template>
    <form @submit.prevent="handleSubmit">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl"> Login </CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="username">Username </Label>
                    <Input id="username" type="text" v-model="username" placeholder="09202903XX" required />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input id="password" v-model="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter class="grid gap-4">
                <Button class="w-full"> Login </Button>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <router-link :to="{ name: 'signup' }"> Signup</router-link>
                </div>
            </CardFooter>
        </Card>
    </form>
</template>

<script>
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { mapState } from 'vuex';

export default {
    name: "Login",
    components: {
        Button,
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
        CardFooter,
        Input,
        Label,
    },
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async handleSubmit() {
            const data = {
                user_name: this.username,
                password: this.password,
            };

            try {
                const response = await fetch('http://10.1.15.208:8000/auth/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });

                if (response.ok && result.message === 'login success') {
                    alert('Login berhasil!');
                    router.push({ name: 'HelloWorld' });
                } else if (result.message === 'login failed') {
                    alert('Login gagal: ' + result.message);
                } else {
                    throw new Error(result.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error.message);
                alert('Login gagal: ' + error.message); // Tampilkan pesan gagal login
            }
        }
    }
}
</script>