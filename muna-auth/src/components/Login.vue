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
        <Button class="w-full bg-black text-white hover:bg-gray-800 focus:ring focus:ring-black active:bg-gray-900"> Sign in </Button>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <router-link :to="{ name: 'signup' }"> Signup</router-link>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>

<script>
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const result = await response.json();

        if (result.message === "login successful") {
          alert(`${result.message}`);
          this.$router.push({ name: 'home' }); // Use this.$router for navigation
        } else if (result.message === "login failed") {
          alert(`${result.message}: ${result.details}`);
        } else {
          alert(`Unexpected result: ${result.message}`);
        }
      } catch (error) {
        console.error('Login error:', error.message);
        alert(error.message);
      }
    }
  }
};
</script>