/**
 * User: elimak
 * Date: 1-4-13
 * Time: 12:33
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.TagsView = Backbone.View.extend({

    className:"tags-viz",

    initialize:function () {
        this.model.bind("change:styles", this.updateStyles, this);
        this.model.bind("change:labels", this.updateLabels, this);
        this.model.bind("change:genres", this.updateGenres, this);
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    updateStyles: function(){

       var data = this.model.get("styles");
        $("#chart-styles").css({height:(data.length*16)+"px"});
        $("#chart-styles").kendoChart({
            dataSource: {
                data: data
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "count",
                colorField: "userColor"
            }],
            valueAxis: {
                max: data[0].count+100,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: "name",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            },
            axisLabelClick: function(e) {
                var link='http://www.discogs.com/explore?style='+e.value;
                window.open(link, '_blank');
            }
        });
    },

    updateGenres: function(){
       var data = this.model.get("genres");
        $("#chart-genres").css({height:(data.length*16)+"px"});
        $("#chart-genres").kendoChart({
            dataSource: {
                data: data
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "count"/*,
                color: "#a0b0c0"*/
            }],
            valueAxis: {
                max: data[0].count+100,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: "name",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            },
            axisLabelClick: function(e) {
                var link='http://www.discogs.com/explore?genre='+e.value;
                window.open(link, '_blank');
            }
        });

    },

    onSeriesClick: function(e) {
        console.log("test?");
        console.log(e.dataItem);
    },

    onAxisLabelClick: function(e) {
        console.log(e.dataItem);
    },

    updateLabels: function(){

        var data = this.model.get("labels");
        var d = [].concat(data);
        d= d.splice(0, 20);
        $("#chart-labels").css({height:(d.length*16)+"px"});
        $("#chart-labels").kendoChart({
            dataSource: {
                data: d
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar",
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "count"/*,
                 color: "#a0b0c0"*/
            }],
            valueAxis: {
                max: data[0].count+100,
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                field: "name",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            },
            axisLabelClick: function(e) {
                var link='http://www.discogs.com/label/'+e.value;
                window.open(link, '_blank');
            }
        });
    }
});
