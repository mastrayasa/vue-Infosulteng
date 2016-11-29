var BASE_URL 	= 'http://infosulteng.com/';
//var BASE_URL 	= 'http://localhost/infosulteng.com/';
var APIURL 		= BASE_URL + 'api/';
var PERPAGE		= 12;


function getThumb(src, w = 0, h = 0){
	var txt = '';
	if(w != 0){
		txt += '&w=' + w;
	}
	if(h != 0){
		txt += '&h=' + h;
	}
	
	return BASE_URL + 'thumb?src=' + src + txt;
}

function getUserFoto(foto, w = 0, h = 0){
	if(w != 0){
		return getThumb(BASE_URL + 'data/dp/' + foto,w,h);
	}else{
		return BASE_URL + 'data/dp/' + foto;
	}
	
}

//Vue.http.headers.common['Access-Control-Allow-Origin'] = BASE_URL
//Vue.http.headers.common['Access-Control-Request-Method'] = '*'


Vue.use(VueResource);
Vue.use(Vue.lazyimg,{
		fadein: true,
		nohori: true,
		speed: 20
	});

Vue.http.options.emulateJSON = true;


var home = Vue.extend({
	template : '#el_home',
	data: function(){
		return {
			dir: [],
			terbaru: [],
			readMore : false,
			API_URL : APIURL
		}
	},
	ready: function() {
		this.ambilData();
	},
	methods: {
		ambilData: function() {
			var url = this.API_URL + "dir/category";
			console.log(url);
			this.$http.get( url ).then(function (res) {
				this.dir = res.data.map(function (item){  
					
					if(item.des.length > 200){
						item.readMore = false;
					}else{
						item.readMore = true;
					}

					item.commentBox = false;
					return item
				})
			}, 
			function (res) {
				alert("oh no");
			})
		},
		openReadMore: function (index) {
			this.dir[index].readMore = true;
		},
		openComment: function (index) {
			if (this.dir[index].commentBox == false) {
			  this.dir[index].commentBox = true;
			} else {
			  this.dir[index].commentBox = false;
			}
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		},
		getImage:function(name){
			return BASE_URL + 'data/dir/' + name + '.jpg';
		}
	}
});


var terbaru = Vue.extend({
	template : '#el_dirList',
	data: function(){
		return {
			dir: [],
			page : 1,
			perpage 	: PERPAGE, 
			isLoading 	: false,
			noMoreData 	: false,
			noData 		: false,
			API_URL 	: APIURL,
			headTitle 	: 'Terbaru'
		}
	},
	ready: function() {
		this.ambilData();
	},
	methods: {
		ambilData: function() {
			var susu = this.API_URL + "dir/terbaru/perpage/" + this.perpage + "/page/" + this.page;
			console.log(susu);
			this.$http.get( susu ).then(function (res) {
				 
				for(index in res.data.items){  
					this.dir.push(res.data.items[index]) ;
				}
				
				if(res.data.total <= this.dir.length){
					this.isLoading 	= true;
					this.noMoreData = true;
				}else{
					this.isLoading = false;
				}
			}, 
			function (res) {
				this.noMoreData = true;
			})
		},
		openReadMore: function (index) {
			this.dir[index].readMore = true;
		},
		openComment: function (index) {
			if (this.dir[index].commentBox == false) {
			  this.dir[index].commentBox = true;
			} else {
			  this.dir[index].commentBox = false;
			}
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		},
		getImage:function(image){
			return getThumb(image,200);
		},
		loadNext : function (){
			this.page++;
			this.isLoading = true;
			this.ambilData();
		}
	}
});


var loker = Vue.extend({
	template : '#el_loker',
	data: function(){
		return {
			lokers: [],
			page : 1,
			perpage : PERPAGE, 
			isLoading : false,
			noMoreData : false,
			API_URL : APIURL
		}
	},
	ready: function() {
		this.getData();
	},
	methods: {
		getData: function() {
			var susu = this.API_URL +  "loker/read/perpage/" + this.perpage + "/page/" + this.page;
			console.log(susu);
			this.$http.get(susu).then(function (res) {
				for(index in res.data.items){  
					this.lokers.push(res.data.items[index]) ;
				}
				
				if(res.data.total <= this.lokers.length){
					this.isLoading 	= true;
					this.noMoreData = true;
				}else{
					this.isLoading = false;
				}
			}, 
			function (res) {
				alert("oh no");
			})
		},
		loadNext : function(){
			this.page++;
			this.isLoading = true;
			this.getData();  
		},
		userUrl:function(name){
			return  'user/' + name;
		}, 
		getImage:function(image){
			return getThumb(image,200);
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		}
	}
});


var event = Vue.extend({
	template : '#el_event',
	data: function(){
		return {
			events: [],
			page : 1,
			perpage : PERPAGE, 
			isLoading : false,
			noMoreData : false,
			API_URL : APIURL
		}
	},
	ready: function() {
		this.getData();
	},
	methods: {
		getData: function() {
			var susu = this.API_URL +  "event/read/perpage/" + this.perpage + "/page/" + this.page;
			console.log(susu);
			this.$http.get(susu).then(function (res) {
				for(index in res.data.items){  
					this.events.push(res.data.items[index]) ;
				}
				
				if(res.data.total <= this.events.length){
					this.isLoading 	= true;
					this.noMoreData = true;
				}else{
					this.isLoading = false;
				}
			}, 
			function (res) {
				alert("oh no");
			})
		},
		loadNext : function(){
			this.page++;
			this.isLoading = true;
			this.getData();  
		},
		userUrl:function(name){
			return  'user/' + name;
		},
		getImage:function(image){
			return getThumb(image,200);
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		}
	}
});


var categoryByName = Vue.extend({
	template : '#el_dirList',
	data: function(){
		return {
			dir: [],
			page : 1,
			perpage : PERPAGE, 
			isLoading : false,
			noMoreData : false,
			noData		: false,
			API_URL : APIURL,
			headTitle : 'By Kategori'
		}
	},
	ready: function() {
		this.ambilData();
	},
	methods: {
		ambilData: function() {
			var susu = this.API_URL + "dir/by_category/cate/"+ this.$route.params.catName +"/perpage/" + this.perpage + "/page/" + this.page;
			console.log(susu);
			
			this.$http.get( susu ).then(function (res) {
				
				this.headTitle =  res.data.cat.title;
				
				for(index in res.data.items){  
					this.dir.push(res.data.items[index]) ;
				}
				
				if(res.data.total <= this.dir.length){
					this.isLoading 	= true;
					this.noMoreData = true;
				}else{
					this.isLoading = false;
				}
				
				if( res.data.total == 0){
					 this.noData = true;
				} 
			}, 
			function (res) {
				this.noMoreData = true;
				console.log("error!");
			})
		},
		openReadMore: function (index) {
			this.dir[index].readMore = true;
		},
		openComment: function (index) {
			if (this.dir[index].commentBox == false) {
			  this.dir[index].commentBox = true;
			} else {
			  this.dir[index].commentBox = false;
			}
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		},
		getImage:function(image){
			return getThumb(image,200);
		},
		loadNext : function (){
			this.page++;
			this.isLoading = true;
			this.ambilData();
		}
	}
});


var singleDir = Vue.extend({
	template : '#el_singleDir',
	data: function(){
		return {
			item: [], 
			API_URL : APIURL,
			readMore : false,
			headTitle : ''
		}
	},
	ready: function() {
		this.ambilData();
	},
	methods: {
		ambilData: function() {
			var susu = this.API_URL + "dir/by_name/name/"+ this.$route.params.dirName;
			console.log(susu);
			
			this.$http.get( susu ).then(function (res) {
				
				this.item =  res.data.item;
				
				 
			}, 
			function (res) {
				this.noMoreData = true;
				console.log("error!");
			})
		},
		openReadMore: function () {
			this.readMore = true;
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		},
		getImage:function(image){
			return getThumb(image,200);
		},
		getUserFoto:function(foto){
			return getUserFoto(foto,32);
		},
		punyaRoom:function(option){ 
			
			if(typeof option.room){
				return true;
			}
			
			if(option.room.length != 0){
				return true;
			}
			
			return false;
		},
		punyaFeature:function(option){
			
			console.log(option.feature.length);
			
			if(typeof option.feature){
				if(option.feature.length == 0){
					return false;
				}
				return true;
			} 
			if(option.feature.length > 0){
				return true;
			}
			
			return false;
		}
	}
});

var login = Vue.extend({
	template : '#el_login',
	data: function(){
		return {
			API_URL : APIURL,
			email : '',
			password : ''
		}
	},
	ready: function() {
		 
	},
	methods: {
		logIn:function(){
			
			
			this.$http.post(APIURL + '/login', {
				email: this.email,
				password: this.password
			}).then(function (response) { 
			
				localStorage.setItem('auth_token', response.data.new_key);
				localStorage.setItem('user_name', response.data.user.username);
				localStorage.setItem('user_nama', response.data.user.nama);
				localStorage.setItem('user_foto', getUserFoto(response.data.user.foto));
				localStorage.setItem('is_login', true);
				
			}, function (data) {
			  
			});
		  
		} 
	}
});

var userProfile = Vue.extend({
	template : '#el_userprofile',
	data: function(){
		return {
			API_URL : APIURL,
			email : '',
			password : ''
		}
	},
	ready: function() {
		 
	},
	methods: {
		logIn:function(){
			
			
			this.$http.post(APIURL + '/login', {
				email: this.email,
				password: this.password
			}).then(function (response) { 
			
				localStorage.setItem('auth_token', response.data.new_key);
				localStorage.setItem('user', response.data.user);
				localStorage.setItem('is_login', true);
				
			}, function (data) {
			  
			});
		  
		} 
	}
});


var singleLoker = Vue.extend({
	template : '#el_singleLoker',
	data: function(){
		return {
			item: [], 
			next: [], 
			prev: [], 
			API_URL : APIURL,
			readMore : false
		}
	},
	ready: function() {
		console.log("susu");
		this.ambilData();
	},
	methods: {
		ambilData: function() {
			var susu = this.API_URL + "loker/by_name/name/"+ this.$route.params.lokerName;
			console.log(susu);
			
			this.$http.get( susu ).then(function (res) {
				
				this.item =  res.data.item;
				this.next =  res.data.loker_next;
				this.prev =  res.data.loker_prev;
				
				 
			}, 
			function (res) {
				this.noMoreData = true;
				console.log("error!");
			})
		},
		openReadMore: function () {
			this.readMore = true;
		},
		tanggalCantik :function(tgl){
			return moment(tgl, "YYYY-MM-DD, hh:mm:ss").fromNow()
		},
		getImage:function(image){
			return getThumb(image,200);
		},
		getUserFoto:function(foto){
			return getUserFoto(foto,32);
		},
		punyaRoom:function(option){ 
			
			if(typeof option.room){
				return true;
			}
			
			if(option.room.length != 0){
				return true;
			}
			
			return false;
		},
		punyaFeature:function(option){
			
			console.log(option.feature.length);
			
			if(typeof option.feature){
				if(option.feature.length == 0){
					return false;
				}
				return true;
			} 
			if(option.feature.length > 0){
				return true;
			}
			
			return false;
		}
	}
});



var App 	= Vue.extend({
	
	data : function(){
		return {
			is_login : false,
			user :[]
		}
	},
	ready:function(){
		var c = localStorage.getItem('is_login');
		if(c){
			this.is_login = true;
			 
		}
	},
	methods: {
		logout:function() {
			alert("keluar");
			localStorage.removeItem('is_login')
			localStorage.removeItem('auth_token')
			localStorage.removeItem('user')
			this.is_login = false
		}
		
	}
	
});

var router 	= new VueRouter();

router.map({
	'/' : {
		component: home
	},
	'category/:catName' : {
		name : 'category',
		component: categoryByName
	},
	'p/:dirName' : {
		name : 'singleDir',
		component: singleDir
	},
	'terbaru' : {
		component: terbaru
	},
	'loker' : {
		component: loker
	},
	'loker/:lokerName' : {
		name : 'singleLoker',
		component: singleLoker
	},
	'event' : {
		component: event
	},
	'login' : {
		name : 'login',
		component: login
	},'user' : {
		name : 'userProfile',
		component: userProfile
	}
});

router.start(App,'#app');
