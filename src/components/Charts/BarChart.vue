<script setup>
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut, Bar } from "vue-chartjs";

// import { Bar, Doughnut } from "vue-chartjs";
ChartJS.register(...registerables);

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      barPercentage: 100,
      barThickness: 60,
      maxBarThickness: 60,
      minBarLength: 2,
      data: [40, 30, 20, 10, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)", // Red
        "rgba(54, 162, 235, 0.2)", // Blue
        "rgba(255, 206, 86, 0.2)", // Yellow
        "rgba(75, 192, 192, 0.2)", // Green
        "rgba(153, 102, 255, 0.2)", // Purple
        "rgba(255, 159, 64, 0.2)", // Orange
      ],
    },
  ],
};
const options = {
  responsive: true,
};

const data1 = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Doughnut Chart",
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
      ],
      data: [300, 200, 100, 50, 40, 20, 5],
    },
  ],
};

const options1 = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div class="md:flex gap-10 w-full items-center justify-center mx-auto">
    <div class="w-full mt-10 md:px-5 px-2">
      <Bar
        :data="data"
        :options="options"
        class="md:max-w-[50rem] md:max-h-[29rem]"
      />
    </div>
    <div class="w-full mt-10 md:px-5 px-2">
      <Doughnut
        :data="data1"
        :options="options1"
        class="md:max-w-[50rem] md:max-h-[29rem]"
      />
    </div>
  </div>
</template>
