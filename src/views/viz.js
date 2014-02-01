/**
 * User: elimak
 * Date: 1-4-13
 * Time: 12:33
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.VizView = Backbone.View.extend({

    className:"spotify-preview",

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function () {
        var m = new ReleaseCollection(this.model.servePage(this.nr));

        $(this.el).empty();
        _.each(m.models, function (release) {
           $(this.el).append(new ReleaseView({model:release}).render().el);
        }, this);
        return this;
    },

    update: function(id, nr){
        this.nr = nr;
        this.model.loadResult(id);
    }
});

window.ReleaseView = Backbone.View.extend({
   // tagName:"li",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
        var jsonObj = this.model.toJSON();
        jsonObj.styles = jsonObj.styles.join(", ");
        jsonObj.genres = jsonObj.genres.join(", ");
        jsonObj.artistLinks = [];
        _.templateSettings.variable = "rc";
        $(this.el).html(this.template(jsonObj));
        return this;
    }
});