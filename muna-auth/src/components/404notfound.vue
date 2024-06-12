<script setup lang="ts">
import { Button } from './ui/button';
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          404 Page Not Found
        </CardTitle>
        <CardDescription>
          The Page you are looking for doesn't exist or other error occurred. Go back, or head over to choose a new
          direction
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button class="w-full bg-black text-white hover:bg-gray-800 focus:ring focus:ring-black active:bg-gray-900" @click="goBack">
          Go Back
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
