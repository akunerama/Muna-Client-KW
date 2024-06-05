<template>
    <div class="calendar-container">
      <FullCalendar
        :plugins="calendarPlugins"
        :events="calendarEvents"
        initial-view="timeGridWeek"
        :header-toolbar="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }"
      />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  
  export default defineComponent({
    name: 'Calendar',
    components: {
      FullCalendar
    },
    setup() {
      const calendarEvents = ref([
        { title: 'Event 1', start: '2024-05-28T09:30:00', end: '2024-05-28T10:30:00' },
        { title: 'Event 2', start: '2024-05-29T11:00:00', end: '2024-05-29T12:00:00' },
        { title: 'Event 3', start: '2024-05-30T13:00:00', end: '2024-05-30T14:00:00' }
      ]);
  
      const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  
      return {
        calendarEvents,
        calendarPlugins
      };
    }
  });
  </script>
  
  <style scoped>
  .calendar-container {
    position: relative;
    margin: auto;
    height: 70vh;
    width: 90vw;
  }
  </style>
  