<script setup lang="ts">
import { ref } from 'vue'; // Pastikan impor ini ada
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Declare form fields using refconst first_name = ref('');
const name = ref('');
const username = ref('');
const password = ref('');

const router = useRouter();
const handleSubmit = async () => {
  const data = {
    user_name: username.value,
  };

  try {
    const response = await fetch('http://10.1.15.208:8000/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error occurred during sign up');
    }

    const result = await response.json();
    if (result.password != null) {
      alert(`Registration successful! Your temporary password is: ${result.password}`);
      console.log(result);
    } else {
      alert('Registration successful! But no password was provided by the server.');
    }



    // Redirect to another page, for example login page
    router.push({ name: 'login' });
  } catch (error) {
    // Handle error response
    console.error('Sign up failed:', error.message);
  };
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your NIM to get your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <!-- <div class="grid gap-2">
            <Label for="full-name">Full Name</Label>
            <Input id="name" type="text" v-model="name" placeholder="Indah Dewi" required />
          </div> -->
          <div class="grid gap-2">
            <Label for="nim">NIM</Label>
            <Input id="username" type="text" v-model="username" placeholder="090123456XX" required />
          </div>
          <!-- <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" />
          </div> -->
          <Button type="submit" class="w-full">
            Create an account
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <router-link :to="{ name: 'login' }"> Login</router-link>
        </div>
      </CardContent>
    </Card>
  </form>
</template>