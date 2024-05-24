<template>
  <form @submit.prevent="handleSubmit">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            v-model="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full"> Sign in </Button>
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
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // Logic for handling form submission
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    },
  },
};
</script>