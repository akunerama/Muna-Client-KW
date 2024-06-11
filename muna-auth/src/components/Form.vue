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
<div> <router-link :to="{ name: 'create' }"> </router-link>
    </div>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 py-4">
        <a
          href="#"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home class="h-5 w-5" />
                <span class="sr-only">Dashboard</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Dashboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <!-- <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShoppingCart class="h-5 w-5" />
                <span class="sr-only">Orders</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Orders
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Package class="h-5 w-5" />
                <span class="sr-only">Products</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Products
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Users2 class="h-5 w-5" />
                <span class="sr-only">Customers</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Customers
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChart class="h-5 w-5" />
                <span class="sr-only">Analytics</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Analytics
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings class="h-5 w-5" />
                <span class="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" variant="outline" class="sm:hidden">
              <PanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <a
                href="#"
                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart class="h-5 w-5" />
                Orders
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Package class="h-5 w-5" />
                Products
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 class="h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart class="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Dashboard</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Data Manager</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Input Data</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <!-- <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          /> -->
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-4 md:p-6">
        <div class="mx-auto grid w-full max-w-6xl gap-2">
        </div>
          <div class="mx-auto grid w-full max-w-6xl items-start gap-4 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
            <nav class="grid gap-4 text-sm text-muted-foreground">
            </nav>
            <div class="grid gap-6">
                <Card class="w-full">
                    <CardHeader>
                        <CardTitle class="text-xl">
                        Input Mahasiswa Seminar
                        </CardTitle>
                        <CardDescription>
                        Input your data
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div class="grid gap-4">
                        <div class="grid gap-2">
                            <Label for="idmuna">Muna ID</Label>
                            <Input id="idmuna" type="id-muna" v-model="id_muna" placeholder="12345JKP" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="nim">Username (NIM)</Label>
                            <Input id="nim" type="nim" v-model="nim" placeholder="0123456789" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="nama-lengkap">Full Name</Label>
                            <Input id="nama-lengkap" type="nama-lengkap" v-model="nama_lengkap" placeholder="Anisa Huha" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="program-studi">Study Program</Label>
                            <Input id="program-studi" v-model="program_studi" type="program-studi" placeholder="Sistem Informasi" required  />
                        </div>
                        <div class="grid gap-2">
                            <Label for="dospem">Supervising Lecturer 1</Label>
                            <Input id="dospem" v-model="dospem" type="dospem" placeholder="Subhan Noor, M.T" required />
                        </div>
                        <div class="grid gap-2">
                          <Label for="thesis">Softcopy Thesis</Label>
                            <Select>
                              <SelectTrigger
                                id="thesis"
                                aria-label="Select thesis"
                                v-model="thesis"
                                type="thesis"
                              >
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sudah">Already</SelectItem>
                                <SelectItem value="belum">Not Yet</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div class="grid gap-2">
                            <Label for="payment">Proof of UKT Payment</Label>
                            <Select>
                              <SelectTrigger
                                id="payment"
                                aria-label="Select payment"
                                v-model="payment"
                                type="payment"
                              >
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sudah">Already</SelectItem>
                                <SelectItem value="belum">Not Yet</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div class="grid gap-2">
                            <Label for="photo">Pass Photo</Label>
                            <Select>
                              <SelectTrigger
                                id="photo"
                                aria-label="Select photo"
                                v-model="photo"
                                type="photo"
                              >
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sudah">Already</SelectItem>
                                <SelectItem value="belum">Not Yet</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div class="grid gap-2">
                            <Label for="krs">KRS</Label>
                            <Select>
                              <SelectTrigger
                                id="krs"
                                aria-label="Select krs"
                                v-model="krs"
                                type="krs"
                              >
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sudah">Already</SelectItem>
                                <SelectItem value="belum">Not Yet</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <Button type="save" class="w-full">
                            Save
                        </Button>
                    </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
    </div>
  </div>
</template>