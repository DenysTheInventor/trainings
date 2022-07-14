import { courses } from "../settings";

export function createGraph(lessons) {
  return {
    type: "doughnut",
    data: {
      labels: courses,
      datasets: [
        {
          data: lessons,
          backgroundColor: [
            "rgba(0, 149, 213, 0.9)",
            "rgba(237, 116, 33, 0.9)",
            "rgba(73, 89, 245, 0.9)",
            "rgba(126, 99, 166, 0.9)",
            "rgba(192, 29, 31, 0.9)",
            "rgba(118, 118, 118, 0.9)",
            "rgba(75, 175, 109, 0.9)",
            "rgba(255, 224, 58, 0.9)",
          ],
          borderColor: [
            "rgba(0, 95, 136,1)",
            "rgba(160, 78, 22, 1)",
            "rgba(50, 61, 168, 1)",
            "rgba(67, 53, 89, 1)",
            "rgba(115, 17, 18, 1)",
            "rgba(41, 41, 41, 1)",
            "rgba(42, 98, 61, 1)",
            "rgba(178, 156, 40, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "rgb(33, 33, 33)",
          },
        },
      },
      cutoutPercentage: 50,
      responsive: false,
      hoverOffset: 4,
    },
  };
}
