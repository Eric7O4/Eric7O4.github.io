const vis16Legends = {
  MaxTemp: {
    title: "Max Temperature (°C)",
    items: [
      { color: "#fee5d9", label: "<20°C" },
      { color: "#fcae91", label: "20–24°C" },
      { color: "#fb6a4a", label: "24–28°C" },
      { color: "#de2d26", label: "28–32°C" },
      { color: "#a50f15", label: "≥32°C" }
    ]
  },
  Rainfall: {
    title: "Rainfall (mm/day)",
    items: [
      { color: "#eff3ff", label: "<1 mm" },
      { color: "#bdd7e7", label: "1–2 mm" },
      { color: "#6baed6", label: "2–3 mm" },
      { color: "#2171b5", label: "3–4 mm" },
      { color: "#084594", label: "≥4 mm" }
    ]
  },
  WindSpeed3pm: {
    title: "Wind Speed (km/h)",
    items: [
      { color: "#f2f0f7", label: "<13" },
      { color: "#cbc9e2", label: "13–16" },
      { color: "#9e9ac8", label: "16–19" },
      { color: "#756bb1", label: "19–22" },
      { color: "#54278f", label: "≥22" }
    ]
  },
  Humidity3pm: {
    title: "Humidity (%)",
    items: [
      { color: "#edf8e9", label: "<47%" },
      { color: "#bae4b3", label: "47–49%" },
      { color: "#74c476", label: "49–51%" },
      { color: "#31a354", label: "51–53%" },
      { color: "#006d2c", label: "≥53%" }
    ]
  }
};

function renderVis16Legend(metric) {
  const el = document.getElementById('vis16-legend');
  if (!el) return;
  const data = vis16Legends[metric];
  if (!data) return;
  const segments = data.items.map(item =>
    `<div style="flex:1;background:${item.color};height:14px;"></div>`
  ).join('');
  const labels = data.items.map(item =>
    `<div style="flex:1;text-align:center;font-size:10px;color:#555;white-space:nowrap;">${item.label}</div>`
  ).join('');
  el.innerHTML =
    `<div style="font-size:12px;font-family:'Inter',-apple-system,sans-serif;padding:5px 0 4px;max-width:280px;">` +
    `<div style="font-weight:600;color:#333;font-size:11px;margin-bottom:3px;">${data.title}</div>` +
    `<div style="display:flex;border-radius:3px;overflow:hidden;border:1px solid rgba(0,0,0,0.12);">${segments}</div>` +
    `<div style="display:flex;">${labels}</div>` +
    `</div>`;
}

const charts = [
  { id: "#vis2",  file: "js/vis2_bar.vg.json" },
  { id: "#vis3",  file: "js/vis3_bar.vg.json" },
  { id: "#vis4",  file: "js/vis4_scatter.vg.json" },
  { id: "#vis5",  file: "js/vis5_area.vg.json" },
  { id: "#vis6",  file: "js/vis6_histogram.vg.json" },
  { id: "#vis7",  file: "js/vis7_stacked_bar.vg.json" },
  { id: "#vis8",  file: "js/vis8_heatmap.vg.json" },
  { id: "#vis9",  file: "js/vis9_table.vg.json" },
  { id: "#vis10", file: "js/vis10_small_chart.vg.json" },
  { id: "#vis12", file: "js/vis12_parallel.vg.json" },
  { id: "#vis14", file: "js/vis14_bump.vg.json" },
  { id: "#vis16", file: "js/vis16_interactive_map.vg.json" },
  { id: "#vis17", file: "js/vis17_wind_rose.vg.json" },
  { id: "#vis18", file: "js/vis18_bivariate_map.vg.json" }
];

const vegaConfig = {
  font: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  axis: {
    labelFont: "Inter, -apple-system, sans-serif",
    titleFont: "Inter, -apple-system, sans-serif"
  },
  legend: {
    labelFont: "Inter, -apple-system, sans-serif",
    titleFont: "Inter, -apple-system, sans-serif"
  },
  header: {
    labelFont: "Inter, -apple-system, sans-serif",
    titleFont: "Inter, -apple-system, sans-serif"
  },
  title: {
    font: "Inter, -apple-system, sans-serif"
  }
};

requestAnimationFrame(() => {
  charts.forEach(chart => {
    const opts = { actions: false, config: vegaConfig };
    if (chart.id === '#vis16') {
      opts.bind = document.getElementById('vis16-controls');
      vegaEmbed(chart.id, chart.file, opts).then(result => {
        renderVis16Legend('MaxTemp');
        result.view.addSignalListener('metric', (_, value) => {
          renderVis16Legend(value);
        });
      }).catch(console.error);
    } else if (chart.id === '#vis18') {
      opts.bind = document.getElementById('vis18-controls');
      vegaEmbed(chart.id, chart.file, opts).catch(console.error);
    } else {
      vegaEmbed(chart.id, chart.file, opts).catch(console.error);
    }
  });
});
