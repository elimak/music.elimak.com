window.Release=Backbone.Model.extend({defaults:{labels:null,year:null,artists:null,popularity:null,id:null,uri:null,tagsScore:null,title:null,styles:null,spotifyHref:null,country:null,genres:null}});window.ReleaseCollection=Backbone.Collection.extend({model:Release,nrItemPerPage:10,loadResult:function(e){var t="deploy/data/results_"+e+".json";var n=this;$.ajax({url:t,dataType:"json",success:function(e){n.reset(e)},error:function(){console.log("error loading "+t)}})},totalPages:function(){return Math.ceil(this.models.length/this.nrItemPerPage)},servePage:function(e){var t=this.nrItemPerPage;var n=e*t;var r=n+t<this.models.length?n+t:this.models.length;var i=this.models.slice(e*t,r);return i}});window.SearchData=Backbone.Model.extend({defaults:{artists:null,countries:null,genres:null,labels:null,styles:null,years:null},initialize:function(){},loadData:function(e){var t=["artists","countries","genres","labels","styles","years"];var n=this;$.each(t,function(r){$.ajax({url:"deploy/data/"+e+"_"+t[r]+".json",dataType:"json",success:function(e){n.set(t[r],e)},error:function(e){throw"Error while loading the constants file "+url}})})}});window.HeaderView=Backbone.View.extend({render:function(){$(this.el).html(this.template());return this},select:function(e){$(".nav li").removeClass("active");$("."+e).addClass("active")}});window.InfoView=Backbone.View.extend({className:"infos-viz",initialize:function(){this.model.bind("change:artists",this.updateArtists,this);this.model.bind("change:years",this.updateYears,this);this.model.bind("change:countries",this.updateCountries,this)},render:function(){$(this.el).html(this.template());return this},updateArtists:function(){var e=this.model.get("artists");var t=[].concat(e);t=t.splice(0,20);$("#chart-artists").css({height:t.length*16+"px"});$("#chart-artists").kendoChart({dataSource:{data:t},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count",colorField:"userColor"}],valueAxis:{max:t[0].count+100,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}},axisLabelClick:function(e){var t="http://www.discogs.com/artist/"+e.value;window.open(t,"_blank")}})},updateYears:function(){var e=this.model.get("years");$("#chart-years").css({height:e.length*16+"px"});$("#chart-years").kendoChart({dataSource:{data:e},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count",colorField:"userColor"}],valueAxis:{max:e[0].count+100,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}}})},updateCountries:function(){var e=this.model.get("countries");$("#chart-countries").css({height:e.length*16+"px"});$("#chart-countries").kendoChart({dataSource:{data:e},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count"}],valueAxis:{max:e[0].count+50,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}}})}});window.PaginationView=Backbone.View.extend({className:"pagenr",initialize:function(){this.model.bind("reset",this.render,this)},render:function(){var e=this.model.totalPages();var t=1;$(this.el).empty();while(t<=e){if(this.nr==t-1){$(this.el).append("<a class='active' href='#page/"+this.id+"/"+t+"'>"+t+"</a>")}else{$(this.el).append("<a href='#page/"+this.id+"/"+(t-1)+"'>"+t+"</a>")}t++}return this},update:function(e,t){this.nr=t;this.id=e},select:function(e){}});window.TagsView=Backbone.View.extend({className:"tags-viz",initialize:function(){this.model.bind("change:styles",this.updateStyles,this);this.model.bind("change:labels",this.updateLabels,this);this.model.bind("change:genres",this.updateGenres,this)},render:function(){$(this.el).html(this.template());return this},updateStyles:function(){var e=this.model.get("styles");$("#chart-styles").css({height:e.length*16+"px"});$("#chart-styles").kendoChart({dataSource:{data:e},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count",colorField:"userColor"}],valueAxis:{max:e[0].count+100,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}},axisLabelClick:function(e){var t="http://www.discogs.com/explore?style="+e.value;window.open(t,"_blank")}})},updateGenres:function(){var e=this.model.get("genres");$("#chart-genres").css({height:e.length*16+"px"});$("#chart-genres").kendoChart({dataSource:{data:e},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count"}],valueAxis:{max:e[0].count+100,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}},axisLabelClick:function(e){var t="http://www.discogs.com/explore?genre="+e.value;window.open(t,"_blank")}})},onSeriesClick:function(e){console.log("test?");console.log(e.dataItem)},onAxisLabelClick:function(e){console.log(e.dataItem)},updateLabels:function(){var e=this.model.get("labels");var t=[].concat(e);t=t.splice(0,20);$("#chart-labels").css({height:t.length*16+"px"});$("#chart-labels").kendoChart({dataSource:{data:t},legend:{visible:false},seriesDefaults:{type:"bar",labels:{visible:true,background:"transparent"}},series:[{field:"count"}],valueAxis:{max:e[0].count+100,majorGridLines:{visible:false},visible:false},categoryAxis:{field:"name",majorGridLines:{visible:false},line:{visible:false}},axisLabelClick:function(e){var t="http://www.discogs.com/label/"+e.value;window.open(t,"_blank")}})}});window.VizView=Backbone.View.extend({className:"spotify-preview",initialize:function(){this.model.bind("reset",this.render,this)},render:function(){var e=new ReleaseCollection(this.model.servePage(this.nr));$(this.el).empty();_.each(e.models,function(e){$(this.el).append((new ReleaseView({model:e})).render().el)},this);return this},update:function(e,t){this.nr=t;this.model.loadResult(e)}});window.ReleaseView=Backbone.View.extend({initialize:function(){this.model.bind("change",this.render,this);this.model.bind("destroy",this.close,this)},render:function(){var e=this.model.toJSON();e.styles=e.styles.join(", ");e.genres=e.genres.join(", ");e.artistLinks=[];_.templateSettings.variable="rc";$(this.el).html(this.template(e));return this}});window.templateLoader={load:function(e,t){console.log("loading");var n=[];$.each(e,function(e,t){if(window[t]){n.push($.get("tpl/"+t+".html",function(e){window[t].prototype.template=_.template(e)},"html"))}else{alert(t+" not found")}});$.when.apply(null,n).done(t)}};window.Router=Backbone.Router.extend({routes:{"":"page","page/:id/:nr":"page",contact:"contact"},initialize:function(){this.headerView=new HeaderView;$(".header").html(this.headerView.render().el)},page:function(e,t){e=_.isUndefined(e)?"Funk":e;t=_.isUndefined(t)?0:t;if(!this.releaseModel){this.releaseModel=new ReleaseCollection}if(!this.searchData){this.searchData=new SearchData}if(!this.tagsView){this.tagsView=new TagsView({model:this.searchData})}if(!this.infoView){this.infoView=new InfoView({model:this.searchData})}if(this.currentPage==null||this.currentPage!=e){this.currentPage=e;this.searchData.loadData(e);$("#first").html(this.tagsView.render().el);$("#sidebar").html(this.infoView.render().el)}else{$("#first").html(this.tagsView.render().el);$("#sidebar").html(this.infoView.render().el);this.tagsView.updateGenres();this.tagsView.updateStyles();this.tagsView.updateLabels();this.infoView.updateCountries();this.infoView.updateArtists();this.infoView.updateYears()}if(!this.vizView){this.vizView=new VizView({model:this.releaseModel})}if(!this.paginationView){this.paginationView=new PaginationView({model:this.releaseModel})}this.vizView.update(e,t);this.paginationView.update(e,t);$("#middle").html(this.vizView.el);$(".pagination").html(this.paginationView.el);this.headerView.select(e.toLowerCase()+"-menu")}});templateLoader.load(["HeaderView","ReleaseView","TagsView","PaginationView","InfoView"],function(){app=new Router;Backbone.history.start()})