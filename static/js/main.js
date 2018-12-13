var component_movie = {
    template:
        `
                    <div class="container">
                        <div class="row">
                            <div class="container col-md-3">
                                <div class="input-group">
                                    <input v-model='search_content' type="text" class="form-control input-lg"><span @click="searching" class="input-group-addon btn btn-primary">搜索</span>
                                    <child :search_results="search_data"></child>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default">热门</button>
                                    <button type="button" class="btn btn-default">经典</button>
                                    <button type="button" class="btn btn-default">最新</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default">日韩</button>
                                    <button type="button" class="btn btn-default">欧美</button>
                                    <button type="button" class="btn btn-default">其他</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default">动作</button>
                                    <button type="button" class="btn btn-default">爱情</button>
                                    <button type="button" class="btn btn-default">悬疑</button>
                                </div>
                                
                                <div class="slider-bar">
                                <span class="span-slider"> 评分 : </span>
                                <select class="score-slect-1" data-live-search="true" data-size="11">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                </select>
                                <span class="span-slider"> ~ </span>
                                <select class="score-slect-2" data-live-search="true" data-size="11">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                </select>
                                </div>

                            </div>
                            <div class="container col-md-9">
                                <router-view ref="updateView"></router-view>
                            </div>
                        </div>
                    </div>
            `,
    data:function () {
        return{
            search_content:'',
            search_data:'',
        }

    },
    methods:{
        searching(){

            console.log('点击搜索 电影')
            console.log(this.search_content)

            var self = this
            $.ajax({
                url:'/api/v1/search/?search_content='+self.search_content,
                async:false,
                type:'GET',
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){

                        console.log('收到 搜索电影 数据回复');
                        self.search_data = data.data;
                        console.log('开始跳转')
                    }else {
                    }
                }
            })
            console.log('开始跳转')
            this.$refs.updateView.freshView(self.search_data)
            this.$router.push(
                {
                    name:'movieSearch',
                    params:{
                        'search_data':self.search_data,
                    }
                }
            )



        }
    }
};

var component_movie_child_init = {
    template:
        `
            <div class="container">
                <button @click="goback" class="btn btn-default goback" >返回</button>
               
                <div class="movie-list-item" v-for="(item,index) in movie_list" >
                    <div class="row">        
                          <div class="col-md-5 movie-cover">
                              <img @click="moviePage(index)" :src= "item['cover']">
                          </div>
                          <div class="col-md-7 movie-msg">
                              <h1 class="movie-item-title">名称 : {{ item['title'] }}</h1>
                              <h3 class="movie-item-rate">评分 : {{ item['rate'] }}</h3>
                              <a class="movie-url">地址 : {{ item['url'] }} </a>
                          </div>
                     </div>   
                </div>
            </div>

        `,
    data:function(){
                return{
                    movie_list: '',
                    movie_detail_data:'',

                }
            },
    methods:{
        moviePage(index){
            console.log('查看 电影详细界面');
            var self = this;
            $.ajax({
                url:'/api/v1/movieDetail/?url='+this.movie_list[index]['url']+'&movie_id='+this.movie_list[index]['id'],
                async:false,
                type:'GET',
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){

                        console.log('收到 电影详细数据');
                        self.movie_detail_data = data.data;
                        console.log(data.data['word_cloud'])
                        console.log(self.movie_detail_data)
                        console.log('开始发送')
                    }else {
                        alert(data.message)
                    }
                }
            });
            console.log(this.movie_detail_data)
            this.$router.push({
                    name: 'movieDetail',
                    params:{
                        movie_detail: this.movie_list[index],
                        movie_data: this.movie_detail_data,
                    }
                })
        },
        goback(){
            this.$router.go(-1)
        },
        freshView(data){
            this.movie_list = data;
            this.$forceUpdate()
        }

    },
    created(){

        console.log('初始化 电影界面');
        var self = this;

        if( this.$route.params['search_data'] === undefined ) {

            $.ajax({
                url: '/api/v1/initView/',
                type: 'Get',
                dataType: 'json',
                success: function (data) {
                    if (data.status == 200) {

                        console.log('收到数据开始初始化界面')
                        self.movie_list = data.data

                    } else {
                        alert(data.message)
                    }

                }
            });
        }else{
            self.movie_list = this.$route.params['search_data']
            console.log('收到 搜索结果')
        }
    }


};

var component_movie_child_search = {
    template:
        `
            <div class="container">
                <button @click="goback" class="btn btn-default goback" >返回</button>
               
                <div class="movie-list-item" v-for="(item,index) in movie_list" >
                    <div class="row">        
                          <div class="col-md-5 movie-cover">
                              <img @click="moviePage(index)" :src= "item['cover']">
                          </div>
                          <div class="col-md-7 movie-msg">
                              <h1 class="movie-item-title">名称 : {{ item['title'] }}</h1>
                              <h3 class="movie-item-rate">评分 : {{ item['rate'] }}</h3>
                              <a class="movie-url">地址 : {{ item['url'] }} </a>
                          </div>
                     </div>   
                </div>
            </div>

        `,
    data:function(){
                return{
                    movie_list: '',
                    movie_detail_data:'',

                }
            },
    props:[
        'search_results',
    ],

    methods:{
        moviePage(index){
            console.log('查看 电影详细界面');
            var self = this;
            $.ajax({
                url:'/api/v1/movieDetail/?url='+this.movie_list[index]['url']+'&movie_id='+this.movie_list[index]['id'],
                async:false,
                type:'GET',
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){

                        console.log('收到 电影详细数据');
                        self.movie_detail_data = data.data;
                        console.log(data.data['word_cloud'])
                        console.log(self.movie_detail_data)
                        console.log('开始发送')
                    }else {
                        alert(data.message)
                    }
                }
            });
            console.log(this.movie_detail_data)
            this.$router.push({
                    name: 'movieDetail',
                    params:{
                        movie_detail: this.movie_list[index],
                        movie_data: this.movie_detail_data,
                    }
                })
        },
        goback(){
            this.$router.go(-1)
        },

    },
    created(){

        console.log('准备 接受搜索数据');
        var self = this;

        self.movie_list = this.$route.params['search_data']
        console.log('收到 搜索结果')

    }

};

var component_movie_child_detail = {
    template:
        `
            <div class="container">
            
                <button @click="goback" class="btn btn-default goback">返回</button>
                
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=1>
                
                <div class="row detail-msg">
                
                    
                    <div class="col-md-3 detail-header">
                      
                         <img :src="movie_detail['cover']" class="detail-cover">
                         
                         <div>
                            <h3 style="margin: 5px"> 名称 : {{ this.movie_detail['title'] }}</h3>
                            <h3 style="margin: 5px"> 评分 : {{ this.movie_detail['rate']  }}</h3>
                            <a style="margin: 5px"> 地址 : {{ this.movie_detail['url'] }}</a>
                            
                         </div>
                    </div>
                    <div class="col-md-7 detail-tail">
                        
                        <img :src="this.word_cloud" class="word-cloud">
                        
                    </div>
                    
                   
                </div> 
                
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>
                <h2 style="text-align: center" class="movie-title">评论情感分析</h2>
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>
                <div class="row">
                    <div class="col-md-6">
                        <img class="sentiment-img" :src="short_sentiment">
                    </div>   
                    <div class="col-md-6">
                        <img class="sentiment-img" :src="movie_sentiment">

                    </div>    
                
                </div>
                
                 
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>
                <h2 style="text-align: center" class="short-title">短评</h2>
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>

                <div v-for="(item,index) in short_comment_list" class="short-comment-list">

                    <div class="comment">
                        <h3>
                            <span class="comment-info">
                                <span  class="rate">评分 : {{ item['rate'] }}</span>
                                <br>
                                <span  v-if="item['sentiment'] > 0.8" class="rate">情感 : 超赞的呦 </span>
                                <span  v-if="item['sentiment'] < 0.5" class="rate">情感 : 差评 </span>
                                <span class="rate" v-if="item['sentiment'] > 0.5 && item['sentiment'] < 0.9 " class="rate">情感 : 喜欢 </span>

                            </span>
                        </h3>
                        <p class="comment-content">
                    
                                <span style="font-size: large" class="short">    {{ item['comment'] }} </span>
                        </p>
                    </div>
                    
                </div>  
                
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>
                <h2 style="text-align: center" class="movie-title">影评</h2>
                <hr style="border:2px dashed #987cb9" width="80%" color=#987cb9 SIZE=3>
                
                <div v-for="(item,index) in movie_comment_list" class="movie-comment-list">
                    <div class="article">

                        <a>
                            <h2>{{ item['title'] }}</h2>
                        </a>
                        <a style="color: orchid font-size: large">
                            关键词 : <span v-for="key in item['keyword']">{{ key }}</span> 
                            <br> 
                        </a>
                        <header class="main-hd">
                            <span  class="rate" :title="item['rate']"></span>
                            <br>  
                            <span  v-if="item['sentiment'] > 0.9" class="rate">情感 : 超赞的呦 </span>
                            <span  v-if="item['sentiment'] < 0.5" class="rate">情感 : 差评 </span>
                            <span class="rate" v-if="item['sentiment'] > 0.5 && item['sentiment'] < 0.9 " class="rate">情感 : 喜欢 </span>
                        </header>
                              
                        <div class="main-bd">
                            <div>
                                <span class="rate"> 总结 : </span>
                                <span class="rate" v-for="summary in item['summary']"> {{ summary }} </span>
                                <br>
                                <br>
                            
                            </div>  
                        <div id="link-report">
                             <div style="font-size: large" class="review-content" v-html="item['comment']">
                                {{ item['comment'] }}
                             </div>
                        </div>
                      </div>
                    </div>
                </div>
                
            </div>
        
        `,
    data:function () {
        return{
            movie_detail:'',
            word_cloud: '',
            short_comment_list: '',
            movie_comment_list: '',
            short_sentiment: '',
            movie_sentiment: '',
        }

    },
    methods:{

        goback(){
            this.$router.go(-1);
        }

    },
    created(){
        console.log('准备接收 电影详细信息')
        this.movie_detail = this.$route.params['movie_detail']
        this.word_cloud = this.$route.params['movie_data']['word_cloud']
        this.short_comment_list = this.$route.params['movie_data']['short_comment']
        this.movie_comment_list = this.$route.params['movie_data']['movie_comment']
        this.short_sentiment = this.$route.params['movie_data']['short_sentiment_img']
        this.movie_sentiment = this.$route.params['movie_data']['movie_sentiment_img']

    }



}

var routes = [
    {
        path:'/movie',
        name:'movie',
        component: component_movie,
        redirect:'/movie/movieInit',

        children:[
            {
                path:'movieInit',
                name:'movieInit',
                component: component_movie_child_init,

            },
            {
                path:'movieDetail',
                name:'movieDetail',
                component:component_movie_child_detail,
            },
            {
                path:'movieSearch',
                name:'movieSearch',
                component:component_movie_child_search
            }
        ]
    },
    {
        path:'/',
        name:'root',
        redirect:'/movie',

    }
];

var router = new VueRouter({
    routes:routes
});

var app = new Vue({
    el:'#app',
    router:router,
    data:{
        flag:false,
        page:0,
        user_id:'',
        passwd:'',
        status:'',
        message:'',
        data:'',
    },
    methods:{
        submit : function () {
            $.ajax({
                url:'http://loaclhost:8000/api/v1/login',
                type:'Post',
                data:{
                    user_id:this.user_id,
                    passwd:this.passwd,
                },
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){
                        console.log(data);
                        this.data = data.data;
                    }else {
                        console.log()
                        alert(data.message)
                    }

                }
            })

        }
    }

});

