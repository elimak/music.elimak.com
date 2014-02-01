/**
 * User: elimak
 * Date: 1-4-13
 * Time: 11:50
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.PaginationView = Backbone.View.extend({

    className:"pagenr",
   /* render: function () {
        $(this.el).html(this.template());

        _.each(m.models, function (release) {
            $(this.el).append(new ReleaseView({model:release}).render().el);
        }, this);

        return this;
    },*/

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function () {
        var nrPages = this.model.totalPages();
        var i=1;

        $(this.el).empty();
        while(i <= nrPages){
            if(this.nr == (i-1)){
                $(this.el).append("<a class='active' href='#page/"+this.id+"/"+i+"'>" +i+"</a>");
            }
            else{
                $(this.el).append("<a href='#page/"+this.id+"/"+(i-1)+"'>" +i+"</a>");
            }
            i++;
        }
        /*switch(true){
            case nrPages <= 36:
                $(".pagination").css({height:30+"px"});
                break;
            case nrPages > 36 && nrPages <= 72 :
                $(".pagination").css({height:60+"px"});
                break;
        }*/

        /*
        var m = new ReleaseCollection(this.model.servePage(this.nr));
        */
       /* $(this.el).empty();
        _.each(m.models, function (release) {
            $(this.el).append(new ReleaseView({model:release}).render().el);
        }, this);*/
        return this;
    },

    update: function(id, nr){
        this.nr = nr;
        this.id = id;
       // this.model.loadResult(id);
    },

    select: function(menuItem) {
        /*
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
        */
    }

});