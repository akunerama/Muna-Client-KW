<template>
    <div>
      <button @click="downloadPdf">Download PDF</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  
  const downloadPdf = () => {
    const element = document.getElementById('report-content');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    });
  };
  </script>
  