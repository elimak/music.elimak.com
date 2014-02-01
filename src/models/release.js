/**
 * User: elimak
 * Date: 1-4-13
 * Time: 13:22
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.Release = Backbone.Model.extend({
    defaults: {
        labels: null,
        year: null,
        artists: null,
        popularity: null,
        id: null,
        uri: null,
        tagsScore: null,
        title: null,
        styles: null,
        spotifyHref: null,
        country: null,
        genres: null
    }

});

window.ReleaseCollection = Backbone.Collection.extend({

    model: Release,
    nrItemPerPage: 10,

    loadResult: function(key){
        var url = "deploy/data/results_" + key+".json";
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                self.reset(data);
            },
            error:function(){
                console.log("error loading "+url);
            }
        });
    },

    totalPages: function(){
        return Math.ceil(this.models.length/this.nrItemPerPage);
    },

    servePage: function( n ){
        var nrPerPage = this.nrItemPerPage;
        var start = n*nrPerPage;
        var end = ( (start+nrPerPage) < this.models.length )? (start+nrPerPage) : this.models.length;
        var sliced = this.models.slice(n*nrPerPage, end );
        return sliced;
    }
});