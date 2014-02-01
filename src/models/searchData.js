/**
 * User: elimak
 * Date: 7-4-13
 * Time: 11:03
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.SearchData = Backbone.Model.extend({
    defaults: {
        artists: null,
        countries: null,
        genres: null,
        labels: null,
        styles: null,
        years:null
    },

    initialize: function(){
    },

    loadData : function(id){

        var arr = ['artists','countries','genres','labels','styles','years'];
        var scope = this;

        $.each(arr, function(item) {

            $.ajax({
                url: "deploy/data/"+id+"_"+arr[item]+".json",
                dataType:"json",
                success:function (data){
                    scope.set(arr[item], data);
                },
                error:function(msg){
                    throw ("Error while loading the constants file "+url);
                }
            });
        });
    }


});
