<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input id="first-name" v-model="first_name" placeholder="Max" required />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name" v-model="last_name" placeholder="Robinson" required />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" />
          </div>
          <div class="grid gap-2">
            <Label for="password-confirm">Password Confirmation</Label>
            <Input id="password-confirm" v-model="password_confirm" type="password" />
          </div>
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