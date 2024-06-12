<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Badge } from '@/components/ui/badge'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const data = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('http://10.1.15.208:8000/schedule/student/'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const result = await response.json();
    data.value = result;
  } catch (err) {
    error.value = 'Failed to load data';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs default-value="all">
        <div class="flex items-center">
          <!-- Tabs content... -->
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Mahasiswa</CardTitle>
              <CardDescription>
                Timeline their data and view their completeness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">img</span>
                    </TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead class="hidden md:table-cell">Semester</TableHead>
                    <TableHead class="hidden md:table-cell">Pembimbing</TableHead>
                    <TableHead class="hidden md:table-cell">Soft Copy</TableHead>
                    <TableHead class="hidden md:table-cell">KRS</TableHead>
                    <TableHead class="hidden md:table-cell">UKT lunas</TableHead>
                    <TableHead class="hidden md:table-cell">Pas Foto</TableHead>
                    <TableHead><span class="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <template v-if="isLoading">
                    <TableRow>
                      <TableCell colspan="10">Loading...</TableCell>
                    </TableRow>
                  </template>
                  <template v-else-if="error">
                    <TableRow>
                      <TableCell colspan="10">{{ error }}</TableCell>
                    </TableRow>
                  </template>
                  <template v-else>
                    <TableRow v-for="item in data" :key="item.id">
                      <TableCell class="hidden sm:table-cell">
                        <img
                          :alt="'Image of ' + item.name"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          :src="item.image || '/placeholder.svg'"
                          width="64"
                        />
                      </TableCell>
                      <TableCell class="font-medium">{{ item.nim }}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{{ item.nama }}</Badge>
                      </TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.semester }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.pembimbing }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.soft_copy }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ new Date(item.createdAt).toLocaleString() }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.krs }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.ukt_lunas }}</TableCell>
                      <TableCell class="hidden md:table-cell">{{ item.pas_foto }}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <router-link :to="{ name: 'create', params: { id: item.id } }">Edit</router-link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </template>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div class="text-xs text-muted-foreground">
                Showing <strong>{{ data.length }}</strong> items
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>