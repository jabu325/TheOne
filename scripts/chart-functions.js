function renderLineChart(chart_id, json_labels, json_data, json_config){


	var label_array = JSON.parse(json_labels);
    var data_obj = JSON.parse(json_data);
    var config_obj = JSON.parse(json_config);
	var data_array = new Array();


     
    for(var i = 0; i < data_obj.length; i++) {
        if(typeof data_obj[i]["series"] !== 'undefined' && data_obj[i]["series"] !== null){
            series = {};
            series.data = data_obj[i]['series'];
            if(typeof data_obj[i]["name"] !== 'undefined'){
                series.name = data_obj[i]["name"];
            }
            if(typeof data_obj[i]["colour"] !== 'undefined'){
                series.colour = data_obj[i]["colour"];
            }
            data_array.push(series);
        }else{
            //console.log("%c There were some NULL series values in your dataset. Ignoring.", 'background: #0a0a0a; color: #f59e42');
        }
    }
    

	var options = generateOptionsArray('line', data_array, label_array, config_obj);
    renderChart(chart_id, options);

}

function renderAreaChart(chart_id, json_labels, json_data, json_config){


	var label_array = JSON.parse(json_labels);
    var data_obj = JSON.parse(json_data);
    var config_obj = JSON.parse(json_config);
	var data_array = new Array();


     
    for(var i = 0; i < data_obj.length; i++) {
        if(typeof data_obj[i]["series"] !== 'undefined' && data_obj[i]["series"] !== null){
            series = {};
            series.data = data_obj[i]['series'];
            if(typeof data_obj[i]["name"] !== 'undefined'){
                series.name = data_obj[i]["name"];
            }
            if(typeof data_obj[i]["colour"] !== 'undefined'){
                series.colour = data_obj[i]["colour"];
            }
            data_array.push(series);
        }else{
            //console.log("%c There were some NULL series values in your dataset. Ignoring.", 'background: #0a0a0a; color: #f59e42');
        }
    }
    

	var options = generateOptionsArray('area', data_array, label_array, config_obj);
    renderChart(chart_id, options);

}

function renderBarChart(chart_id, json_labels, json_data, json_config){


	var label_array = JSON.parse(json_labels);
    var data_obj = JSON.parse(json_data);
    var config_obj = JSON.parse(json_config);
	var data_array = new Array();

        for(var i = 0; i < data_obj.length; i++) {
            if(typeof data_obj[i]["series"] !== 'undefined'){
                series = {};
                series.data = data_obj[i]['series'];
                if(typeof data_obj[i]["name"] !== 'undefined'){
                    series.name = data_obj[i]["name"];
                }
                if(typeof data_obj[i]["colour"] !== 'undefined'){
                    series.colour = data_obj[i]["colour"];
                }
                data_array.push(series);
            }else{
                console.log("%c There were some NULL series values in your dataset. Ignoring.", 'background: #0a0a0a; color: #f59e42');
            }
        }
    
    options = generateOptionsArray('bar', data_array, label_array, config_obj);
    renderChart(chart_id, options);

}

function renderPieChart(chart_id, json_labels, json_data, json_config){


	var label_array = JSON.parse(json_labels);
    var data_obj = JSON.parse(json_data);
    var config_obj = JSON.parse(json_config);
    var data_array = new Array();
    
    if(Array.isArray(data_obj[0]['series'])){
        series = {}
        series.data = data_obj[0]['series'];
        if(typeof data_obj[0]["colour"] !== 'undefined'){
            series.colour = data_obj[0]["colour"];
        }
        data_array.push(series);
    }else{
        series = {}
        series.data = data_obj['series'];
        if(typeof data_obj["colour"] !== 'undefined'){
            series.colour = data_obj["colour"];
        }
        data_array.push(series);
    }


    
    options = generateOptionsArray('pie', data_array, label_array, config_obj);
    renderChart(chart_id, options);
	
}

function renderDonutChart(chart_id, json_labels, json_data, json_config){


	var label_array = JSON.parse(json_labels);
    var data_obj = JSON.parse(json_data);
    var config_obj = JSON.parse(json_config);
    var data_array = new Array();
    
    if(Array.isArray(data_obj[0]['series'])){
        series = {}
        series.data = data_obj[0]['series'];
        if(typeof data_obj[0]["colour"] !== 'undefined'){
            series.colour = data_obj[0]["colour"];
        }
        data_array.push(series);
    }else{
        series = {}
        series.data = data_obj['series'];
        if(typeof data_obj["colour"] !== 'undefined'){
            series.colour = data_obj["colour"];
        }
        data_array.push(series);
    }
    
    options = generateOptionsArray('donut', data_array, label_array, config_obj);
    renderChart(chart_id, options);
	
}

function renderChart(chart_id, options=false){

    if(options){
        if ( $( "#"+chart_id ).length ) {
            var chart = new ApexCharts(document.querySelector("#"+chart_id), options);
            chart.render();
            //console.log("%c Chart rendered successfully to '#"+chart_id+"'!", 'background: #0a0a0a; color: #00ff00');
        }else{
            //console.log("%c You are trying to render a chart to: '#"+chart_id+"'. But that element does not exist!", 'background: #0a0a0a; color: #ff0000');
        }
    }
    

}

function generateOptionsArray(chart_type=false, data_array, label_array, config=false){


    if(chart_type && config){

        //set default chart settings
        var options = {};
        options.chart = {type: chart_type, toolbar:{show:false}, height:"500px"};
        
        series_data = data_array;
        if(chart_type == "pie" || chart_type == "donut"){
            series_data = data_array[0].data;
        }
        
        options.series = series_data;
        if(chart_type == 'pie'){
            options.labels = label_array;
        }else{
            options.xaxis = {categories: label_array, tickPlacement: 'on'};
        }

        options.responsive = [{
            breakpoint: 800,
            options: {
                chart: {
                    height: "auto",
                    toolbar: {show: false}
                }
            }
        }]

        options.legend = {show: true, position: 'top'};
        //options.theme = {palette: 'palette3'};
        options.dataLabels = { enabled:false};
        //options.markers = {size: 4, strokeColours: "#F5F5F5", hover:{size: 6}};
        //options.stroke = {show: true, curve: "smooth", width: 3}
    
        //options.fill = {};

        //console.log(config);

        //check config for any custom settings
        if(typeof config['legend'] !== 'undefined'){
            if(typeof config['legend']['show'] !== 'undefined'){
            options.legend.show = config['legend'];
            }
            if(typeof config['legend']['position'] !== 'undefined'){
                options.legend.position = config['legend']['position']
            }
            if(typeof config['legend']['horizontalAlign'] !== 'undefined'){
                options.legend.horizontalAlign = config['legend']['horizontalAlign']
            }
        }
        if(typeof config['title'] !== 'undefined'){
            if(typeof config['title']['text'] !== 'undefined'){
                options.title = {text: config['title']['text'], align: 'center', style:{ fontSize: '14px', fontWeight: 'bold'}};
            }
            if(typeof config['title']['align'] !== 'undefined'){
                options.title.align = config['title']['align'];
            }
            if(typeof config['title']['style'] !== 'undefined'){
                if(typeof config['title']['style']['fontsize'] !== 'undefined'){
                    options.title.align = config['title']['align'];
                }
            }
        }
        if(typeof config['dataLabels'] !== 'undefined'){
            if(typeof config['dataLabels']["enabled"] !== 'undefined'){
                options.dataLabels.enabled = config['dataLabels']["enabled"];
                if(typeof config['dataLabels']["position"] !== 'undefined'){
                    options.plotOptions = {[chart_type] : {dataLabels: {position: config['dataLabels']["position"]}}};
                }
                if(typeof config['dataLabels']["style"] !== 'undefined'){
                    options.dataLabels.style = {};
                    if(typeof config['dataLabels']["style"]["colours"] !== 'undefined'){
                        options.dataLabels.style.colours = config['dataLabels']["style"]["colours"];
                    }
                }
            }
        }
        if(typeof config['theme'] !== 'undefined'){
            options.theme.palette = config['theme'];
        }
        if(typeof config['dropShadow'] !== 'undefined'){
            if(typeof config['dropShadow']["enabled"] !== 'undefined'){
                options.dropShadow = {enabled: config['dropShadow']["enabled"]};
                if(typeof config['dropShadow']["top"] !== 'undefined'){
                    options.dropShadow.top = config['dropShadow']["top"];
                }
                if(typeof config['dropShadow']["left"] !== 'undefined'){
                    options.dropShadow.left = config['dropShadow']["left"];

                }
                if(typeof config['dropShadow']["blur"] !== 'undefined'){
                    options.dropShadow.blur = config['dropShadow']["blur"];

                }
                if(typeof config['dropShadow']["opacity"] !== 'undefined'){
                    options.dropShadow.opacity = config['dropShadow']["opacity"];
                } 
            }
        }
        if(typeof config['height'] !== 'undefined'){
            options.chart.height = config['height'];
        }
        if(typeof config['width'] !== 'undefined'){
            options.chart.width = config['width'];
        }
        if(typeof config['toolbar']!== 'undefined'){
            if(typeof config['toolbar']['show'] !== 'undefined'){
                options.chart.toolbar = {show: config['toolbar']['show'], tools:{download: true, zoom:true, zoomin:true, zoomout:true, pan:true, reset:true}};
                if(typeof config['toolbar']['zoom'] !== 'undefined'){
                    options.chart.toolbar.tools.zoom = config['toolbar']['zoom']; 
                    options.chart.toolbar.tools.zoomin = config['toolbar']['zoom'];
                    options.chart.toolbar.tools.zoomout = config['toolbar']['zoom'];
                }
                if(typeof config['toolbar']['pan'] !== 'undefined'){
                    options.chart.toolbar.tools.pan = config['toolbar']['reset']; 
                }
                if(typeof config['toolbar']['reset'] !== 'undefined'){
                    options.chart.toolbar.tools.reset = config['toolbar-reset']; 
                }
                if(typeof config['toolbar']['download'] !== 'undefined'){
                    options.chart.toolbar.tools.download = config['toolbar']['download']; 
                }
            }
            
        }
        if(typeof config['markers']!== 'undefined'){
            if(typeof config['markers']['size'] !== 'undefined'){
                options.markers = { size: config['markers']['size']};
                if(typeof config['markers']['colours'] !== 'undefined'){
                    options.markers.colors = config['markers']['colours'];
                }
                if(typeof config['markers']['strokeColours'] !== 'undefined'){
                    options.markers.strokeColors = config['markers']['strokeColours'];
                }
                if(typeof config['markers']['strokeWidth'] !== 'undefined'){
                    options.markers.strokeWidth = config['markers']['strokeWidth'];
                }
                if(typeof config['markers']['strokeOpacity'] !== 'undefined'){
                    options.markers.strokeOpacity = config['markers']['strokeOpacity'];
                }
                if(typeof config['markers']['strokeDashArray'] !== 'undefined'){
                    options.markers.strokeDashArray = config['markers']['strokeDashArray'];
                }
                if(typeof config['markers']['fillOpacity'] !== 'undefined'){
                    options.markers.fillOpacity = config['markers']['fillOpacity'];
                }
                if(typeof config['markers']['discrete'] !== 'undefined'){
                    options.markers.discrete = config['markers']['discrete'];
                }
                if(typeof config['markers']['shape'] !== 'undefined'){
                    options.markers.shape = config['markers']['shape'];
                }
                if(typeof config['markers']['radius'] !== 'undefined'){
                    options.markers.radius = config['markers']['radius'];
                }
                if(typeof config['markers']['offsetX'] !== 'undefined'){
                    options.markers.offsetX = config['markers']['offsetX'];
                }
                if(typeof config['markers']['offsetY'] !== 'undefined'){
                    options.markers.offsetY = config['markers']['offsetY'];
                }
                if(typeof config['markers']['showNullDataPoints'] !== 'undefined'){
                    options.markers.showNullDataPoints = config['markers']['showNullDataPoints'];
                }
                if(typeof config['markers']['hover'] !== 'undefined'){
                    hover_options = {}
                    if(typeof config['markers']['hover']['size'] !== 'undefined'){
                        hover_options.size = config['markers']['hover']['size']; 
                    }
                    if(typeof config['markers']['hover']['sizeOffset'] !== 'undefined'){
                        hover_options.sizeOffset = config['markers']['hover']['sizeOffset']; 
                    }
                    options.markers.hover = hover_options;
                }
            }
        }
        if(typeof config['stroke'] !== 'undefined'){
            if(typeof config['stroke']['show'] !== 'undefined'){
                options.stroke = {show: config['stroke']['show'], curve:'straight'};
                if(typeof config['stroke']['curve'] !== 'undefined'){
                    options.stroke.curve = config['stroke']['curve'];   
                }
                if(typeof config['stroke']['lineCap'] !== 'undefined'){
                    options.stroke.lineCap = config['stroke']['lineCap'];   
                }
                if(typeof config['stroke']['colours'] !== 'undefined'){
                    options.stroke.colors = config['stroke']['colours'];   
                }
                if(typeof config['stroke']['width'] !== 'undefined'){
                    options.stroke.width = config['stroke']['width'];   
                }
                if(typeof config['stroke']['dashArray'] !== 'undefined'){
                    options.stroke.dashArray = config['stroke']['dashArray'];   
                }
            }
            
        }
        if(typeof config['yaxis'] !== 'undefined'){
            options.yaxis = {};
            if(typeof config['yaxis']['min'] !== 'undefined'){
                options.yaxis.min = config['yaxis']['min'];
            }
            if(typeof config['yaxis']['max'] !== 'undefined'){
                options.yaxis.max = config['yaxis']['max'];
            }
            
        }
        if(typeof config['annotations'] !== 'undefined'){
            options.annotations = {};
            if(typeof config['annotations']['yaxis'] !== 'undefined'){
                options.annotations.yaxis = [];
                for(var i = 0; i < config['annotations']['yaxis'].length; i++) {
                    if(typeof config['annotations']['yaxis'][i]['y'] !== 'undefined'){
                        yaxis = {};
                        yaxis.y = config['annotations']['yaxis'][i]['y'];

                        if(typeof config['annotations']['yaxis'][i]['strokeDashArray'] !== 'undefined'){
                            yaxis.strokeDashArray = config['annotations']['yaxis'][i]['strokeDashArray'];
                        }

                        if(typeof config['annotations']['yaxis'][i]['borderColour'] !== 'undefined'){
                            yaxis.borderColor = config['annotations']['yaxis'][i]['borderColour'];
                        }

                        if(typeof config['annotations']['yaxis'][i]['fillColour'] !== 'undefined'){
                            yaxis.fillColor = config['annotations']['yaxis'][i]['fillColour'];    
                        }
                        if(typeof config['annotations']['yaxis'][i]['width'] !== 'undefined'){
                            yaxis.width = config['annotations']['yaxis'][i]['width'];    
                        }

                        if(typeof config['annotations']['yaxis'][i]['offsetX'] !== 'undefined'){
                            yaxis.offsetX = config['annotations']['yaxis'][i]['offsetX'];    
                        }

                        if(typeof config['annotations']['yaxis'][i]['label'] !== 'undefined'){
                            yaxis.label = {}
                            if(typeof config['annotations']['yaxis'][i]['label']['borderColour'] !== 'undefined'){
                                yaxis.label.borderColor = config['annotations']['yaxis'][i]['label']['borderColour'];    
                            }
                            if(typeof config['annotations']['yaxis'][i]['label']['offsetX'] !== 'undefined'){
                                yaxis.label.offsetX = config['annotations']['yaxis'][i]['label']['offsetX'];    
                            }
                            if(typeof config['annotations']['yaxis'][i]['label']['offsetY'] !== 'undefined'){
                                yaxis.label.offsetY = config['annotations']['yaxis'][i]['label']['offsetY'];    
                            }
                            if(typeof config['annotations']['yaxis'][i]['label']['position'] !== 'undefined'){
                                yaxis.label.position = config['annotations']['yaxis'][i]['label']['position'];    
                            }
                            if(typeof config['annotations']['yaxis'][i]['label']['style'] !== 'undefined'){
                                yaxis.label.style = {}  
                                if(typeof config['annotations']['yaxis'][i]['label']['style']['colour'] !== 'undefined'){
                                    yaxis.label.style.color = config['annotations']['yaxis'][i]['label']['style']['colour'];    
                                }
                                if(typeof config['annotations']['yaxis'][i]['label']['style']['background'] !== 'undefined'){
                                    yaxis.label.style.background = config['annotations']['yaxis'][i]['label']['style']['background'];    
                                }
                            }
                            if(typeof config['annotations']['yaxis'][i]['label']['text'] !== 'undefined'){
                                yaxis.label.text = config['annotations']['yaxis'][i]['label']['text'];    
                            }
                        }
                        options.annotations.yaxis.push(yaxis);
                    }
                }
            }
            if(typeof config['annotations']['xaxis'] !== 'undefined'){
                options.annotations.xaxis = [];
                for(var i = 0; i < config['annotations']['xaxis'].length; i++) {
                    if(typeof config['annotations']['xaxis'][i]['y'] !== 'undefined'){
                        xaxis = {};
                        xaxis.y = config['annotations']['xaxis'][i]['y'];

                        if(typeof config['annotations']['xaxis'][i]['strokeDashArray'] !== 'undefined'){
                            xaxis.strokeDashArray = config['annotations']['xaxis'][i]['strokeDashArray'];
                        }

                        if(typeof config['annotations']['xaxis'][i]['borderColour'] !== 'undefined'){
                            xaxis.borderColor = config['annotations']['xaxis'][i]['borderColour'];
                        }

                        if(typeof config['annotations']['xaxis'][i]['fillColour'] !== 'undefined'){
                            xaxis.fillColor = config['annotations']['xaxis'][i]['fillColour'];    
                        }
                        if(typeof config['annotations']['xaxis'][i]['width'] !== 'undefined'){
                            xaxis.width = config['annotations']['xaxis'][i]['width'];    
                        }

                        if(typeof config['annotations']['xaxis'][i]['offsetX'] !== 'undefined'){
                            xaxis.offsetX = config['annotations']['xaxis'][i]['offsetX'];    
                        }

                        if(typeof config['annotations']['xaxis'][i]['label'] !== 'undefined'){
                            xaxis.label = {}
                            if(typeof config['annotations']['xaxis'][i]['label']['borderColour'] !== 'undefined'){
                                xaxis.label.borderColor = config['annotations']['xaxis'][i]['label']['borderColour'];    
                            }
                            if(typeof config['annotations']['xaxis'][i]['label']['offsetX'] !== 'undefined'){
                                xaxis.label.offsetX = config['annotations']['xaxis'][i]['label']['offsetX'];    
                            }
                            if(typeof config['annotations']['xaxis'][i]['label']['offsetY'] !== 'undefined'){
                                xaxis.label.offsetY = config['annotations']['xaxis'][i]['label']['offsetY'];    
                            }
                            if(typeof config['annotations']['xaxis'][i]['label']['position'] !== 'undefined'){
                                xaxis.label.position = config['annotations']['xaxis'][i]['label']['position'];    
                            }
                            if(typeof config['annotations']['xaxis'][i]['label']['style'] !== 'undefined'){
                                xaxis.label.style = {}  
                                if(typeof config['annotations']['xaxis'][i]['label']['style']['colour'] !== 'undefined'){
                                    xaxis.label.style.color = config['annotations']['xaxis'][i]['label']['style']['colour'];    
                                }
                                if(typeof config['annotations']['xaxis'][i]['label']['style']['background'] !== 'undefined'){
                                    xaxis.label.style.background = config['annotations']['xaxis'][i]['label']['style']['background'];    
                                }
                            }
                            if(typeof config['annotations']['xaxis'][i]['label']['text'] !== 'undefined'){
                                xaxis.label.text = config['annotations']['xaxis'][i]['label']['text'];    
                            }
                        }
                        options.annotations.xaxis.push(xaxis);
                    }
                }
            }    
        }

        var colors = new Array();
        for(var i = 0; i < data_array.length; i++) {
            if(typeof data_array[i].colour !== undefined){
                if(Array.isArray(data_array[i].colour)){
                    colors = data_array[i].colour;
                }else{
                    colors.push(data_array[i].colour);
                }
            }
        }
        if(colors.length > 0){
            options.colors = colors;
        }
        /*
        if(typeof config['colours'] !== 'undefined'){
            if(Array.isArray(config['colours'])){
                options.colors = config['colours'];
            }
        }
        */
        if(typeof config['fill'] !== 'undefined'){
                if(typeof config['fill']['colours'] !== 'undefined'){
                    if(Array.isArray(config['fill']['colours'])){
                        options.fill.colors = config['fill']['colours'];
                    }
                }
                if(typeof config['fill']['type'] !== 'undefined'){
                    if(config['fill']['type'] == "gradient"){
                        if(chart_type != "area"){
                            console.log("%c You are trying to render a graph with fill that doesn't support it. Choose an Area graph to do this", 'background: #0a0a0a; color: #f59e42');
                        }
                        options.fill.type = "gradient";
                        gradient_options = {};
                        if(typeof config['fill']['shade'] !== 'undefined'){
                            gradient_options.shade = config['fill']['shade'];
                        }
                        if(typeof config['fill']['gradient-type'] !== 'undefined'){
                            gradient_options.type = config['fill']['gradient-type'];
                        }
                        if(typeof config['fill']['shadeIntensity'] !== 'undefined'){
                            gradient_options.shadeIntensity = config['fill']['shadeIntensity'];
                        }
                        if(typeof config['fill']['gradientToColours'] !== 'undefined'){
                            gradient_options.gradientToColors = config['fill']['gradientToColours'];
                        }
                        if(typeof config['fill']['opacityFrom'] !== 'undefined'){
                            gradient_options.opacityFrom = config['fill']['opacityFrom'];
                        }
                        if(typeof config['fill']['opacityTo'] !== 'undefined'){
                            gradient_options.opacityTo = config['fill']['opacityTo'];
                        }
                        if(typeof config['fill']['stops'] !== 'undefined'){
                            if(Array.isArray(config['fill']['stops'])){
                                gradient_options.stops = config['fill']['stops'];
                            }
                        }
                        if(typeof config['fill']['colourStops'] !== 'undefined'){
                            if(Array.isArray(config['fill']['colourStops'])){
                                gradient_options.colorStops = config['fill']['colourStops'];
                            }
                        }
                        options.fill.gradient = gradient_options;
                    }
                    if(config['fill']['type'] == 'image'){
                        options.fill.type = "image";
                        image_options = {};
                        if(typeof config['fill']['src'] !== 'undefined'){
                            image_options.src = config['fill']['src'];
                        }
                        if(typeof config['fill']['width'] !== 'undefined'){
                            image_options.width = config['fill']['width'];
                        }
                        if(typeof config['fill']['height'] !== 'undefined'){
                            image_options.height = config['fill']['height'];
                        }
                        options.fill.image = image_options;
                    }
                    if(config['fill']['type'] == 'pattern'){
                        options.fill.type = "pattern";
                        pattern_options = {};
                        if(typeof config['fill']['style'] !== 'undefined'){
                            pattern_options.style = config['fill']['style'];
                        }
                        if(typeof config['fill']['width'] !== 'undefined'){
                            pattern_options.width = config['fill']['width'];
                        }
                        if(typeof config['fill']['height'] !== 'undefined'){
                            pattern_options.height = config['fill']['height'];
                        }
                        if(typeof config['fill']['strokeWidth'] !== 'undefined'){
                            pattern_options.strokeWidth = config['fill']['strokeWidth'];
                        }
                        options.fill.pattern = pattern_options;
                    }
                }
                
        }
        console.log(options);
        
        return options;

    }


}