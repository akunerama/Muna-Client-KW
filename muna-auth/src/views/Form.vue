<script setup lang="ts">
import {
  CircleUser,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-vue-next'

// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40 p-4">
      <div class="mx-auto grid w-full max-w-6xl gap-6">
        <Card class="w-full">
          <CardHeader>
            <CardTitle class="text-xl">Input Mahasiswa Seminar</CardTitle>
            <CardDescription>Input your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4">
              <div class="grid gap-2">
                <label for="idmuna">Muna ID</label>
                <Input id="idmuna" v-model="id_muna" placeholder="12345JKP" required />
              </div>
              <div class="grid gap-2">
                <label for="nim">Username (NIM)</label>
                <Input id="nim" v-model="nim" placeholder="0123456789" required />
              </div>
              <div class="grid gap-2">
                <label for="nama-lengkap">Full Name</label>
                <Input id="nama-lengkap" v-model="nama_lengkap" placeholder="Anisa Huha" required />
              </div>
              <div class="grid gap-2">
                <label for="program-studi">Study Program</label>
                <Input id="program-studi" v-model="program_studi" placeholder="Sistem Informasi" required />
              </div>
              <div class="grid gap-2">
                <label for="dospem">Supervising Lecturer 1</label>
                <Input id="dospem" v-model="dospem" placeholder="Subhan Noor, M.T" required />
              </div>
              <div class="grid gap-2">
                <label for="thesis">Softcopy Thesis</label>
                <Select v-model="thesis">
                  <SelectTrigger id="thesis" aria-label="Select thesis">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sudah">Already</SelectItem>
                    <SelectItem value="belum">Not Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <label for="payment">Proof of UKT Payment</label>
                <Select v-model="payment">
                  <SelectTrigger id="payment" aria-label="Select payment">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sudah">Already</SelectItem>
                    <SelectItem value="belum">Not Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <label for="photo">Pass Photo</label>
                <Select v-model="photo">
                  <SelectTrigger id="photo" aria-label="Select photo">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sudah">Already</SelectItem>
                    <SelectItem value="belum">Not Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-2">
                <label for="krs">KRS</label>
                <Select v-model="krs">
                  <SelectTrigger id="krs" aria-label="Select krs">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sudah">Already</SelectItem>
                    <SelectItem value="belum">Not Yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button @click="saveData" class="w-full">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </template>