/**
 * User: elimak
 * Date: 1-4-13
 * Time: 12:33
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.InfoView = Backbone.View.extend({

    className:"infos-viz",

    initialize:function () {
        this.model.bind("change:artists", this.updateArtists, this);
        this.model.bind("change:years", this.updateYears, this);
        this.model.bind("change:countries", this.updateCountries, this);
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    updateArtists: function(){

       var data = this.model.get("artists");
       var d = [].concat(data);
       d= d.splice(0, 20);

        $("#chart-artists").css({height:(d.length*16)+"px"});
        $("#chart-artists").kendoChart({
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
                field: "count",
                colorField: "userColor"
            }],
            valueAxis: {
                max: d[0].count+100,
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
                var link='http://www.discogs.com/artist/'+e.value;
                window.open(link, '_blank');
            }
        });
    },

    updateYears: function(){

       var data = this.model.get("years");
        $("#chart-years").css({height:(data.length*16)+"px"});
        $("#chart-years").kendoChart({
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
            }
        });
    },

    updateCountries: function(){

       var data = this.model.get("countries");
        $("#chart-countries").css({height:(data.length*16)+"px"});
        $("#chart-countries").kendoChart({
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
                max: data[0].count+50,
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
            }
        });
    }
});
