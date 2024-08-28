function(instance, properties, context) {

    var height = properties.bubble.height();
    var font_size = properties.bubble.font_size();
    var font_alignment = properties.bubble.font_alignment();
    var font_color = properties.bubble.font_color();
    var font_face = properties.bubble.font_face();
        
    var title = properties.title;
    var title_align = properties.title_alignment;
    var xaxis_type = properties.xaxis_type;
    var xaxis_position = properties.xaxis_position;
    var upper_color = properties.upper_color;
    var lower_color = properties.lower_color;
    var zoomable = properties.zoomable;
   
  
    var no_data_text = properties.no_data_text;
    var dark_mode = properties.dark_mode;
    var tooltip_enabled = properties.tooltip_enabled;
    var downloading_enabled = properties.downloading_enabled;
    
    var xaxis_values =
      properties.xaxis_values?.get(0, properties.xaxis_values.length()) || [];
    var series_data_x =
      properties.series_data_x?.get(0, properties.series_data_x.length()) || [];
    var series_data_y =
      properties.series_data_y?.get(0, properties.series_data_y.length()) || [];
        
    var style = { fontSize: font_size, fontFamily: font_face, colors: font_color }  

    var options = {
      series: [
          { type: 'boxPlot', data: series_data_y.map((y, i) => ({x: series_data_x[i], y: y.split(',').map(n => parseInt(n))})) } 
      ],
      chart: {
        type: 'boxPlot',
        height: height,
        fontFamily: font_face,
        toolbar: {
            tools: {
               download: downloading_enabled
            }
        },
        zoom: {
          enabled: zoomable,
        },
      },
      plotOptions: {          
          boxPlot: {
            colors: {
              upper: upper_color,
              lower: lower_color
            }
          }
       },
      title: {
        text: title || "",
        align: title_align,
      },
      xaxis: {
        labels: { style: style }
      },
      yaxis: {
        labels: { style: style } 
      },
      noData: {
      	text: no_data_text
      },
      theme: {
        mode: dark_mode ? 'dark': 'light'
      },
      tooltip: {
      	enabled: tooltip_enabled
      }
    };

    instance.data.container = document.createElement("div");
    instance.canvas.append(instance.data.container);

    var apexChart = new ApexCharts(instance.data.container, options);
    apexChart.render();

}