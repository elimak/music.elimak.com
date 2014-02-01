/**
 * User: elimak
 * Date: 1-4-13
 * Time: 11:43
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.Router = Backbone.Router.extend({

    routes: {
        "": "page",
        "page/:id/:nr": "page",
        "contact": "contact"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
    },

    page: function (id, nr) {
        id = _.isUndefined(id)? "Funk":id;
        nr = _.isUndefined(nr)? 0:nr;

        if( !this.releaseModel ){
            this.releaseModel = new ReleaseCollection();
        }

        if( !this.searchData ){
            this.searchData = new SearchData();
        }

        if (!this.tagsView) {
            this.tagsView = new TagsView({model:this.searchData});
        }
        if (!this.infoView) {
            this.infoView = new InfoView({model:this.searchData});
        }
        if ( this.currentPage == null || this.currentPage != id){
            this.currentPage = id;
            this.searchData.loadData(id);
            $('#first').html(this.tagsView.render().el);
            $('#sidebar').html(this.infoView.render().el);
       }
        else{
            $('#first').html(this.tagsView.render().el);
            $('#sidebar').html(this.infoView.render().el);
            this.tagsView.updateGenres();
            this.tagsView.updateStyles();
            this.tagsView.updateLabels();
            this.infoView.updateCountries();
            this.infoView.updateArtists();
            this.infoView.updateYears();
        }

        if (!this.vizView) {
            this.vizView = new VizView({model:this.releaseModel});
        }
        if (!this.paginationView) {
            this.paginationView = new PaginationView({model:this.releaseModel});
        }

        this.vizView.update(id, nr);
        this.paginationView.update(id, nr);

        $('#middle').html(this.vizView.el);
        $('.pagination').html(this.paginationView.el);
        this.headerView.select(id.toLowerCase()+'-menu');
    }
});

templateLoader.load(["HeaderView", "ReleaseView", "TagsView", "PaginationView", "InfoView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });