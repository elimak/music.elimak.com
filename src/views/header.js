/**
 * User: elimak
 * Date: 1-4-13
 * Time: 11:50
 * Website: http://www.elimak.com
 * Email: info@elimak.com
 */
window.HeaderView = Backbone.View.extend({

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    }

});