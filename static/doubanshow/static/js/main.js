var component_movie = {
    template:
        `
                    <div class="container">
                        <div class="row">
                            <div class="container col-md-3">
                                <div class="input-group">
                                    <input type="text" class="form-control input-lg"><span class="input-group-addon btn btn-primary">搜索</span>
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

                            </div>
                            <div class="container col-md-9">
                                <!--<router-view></router-view>-->
                            </div>
                        </div>
                    </div>
            `,
};

var component_movie_child_init = {
    template:
        `
            <div class="container">
                <div class="movie-list" v-for="(item,index) in movie_list" >
                    <div class="movie-list-item">
                        <div class="row">
                            <div class="col-xs-5">
                                <img @click="moviePage" class="movie-cover" src= {{ item['cover'] }}>
                            </div>
                            <div class="col-xs-7">
                                <div class="title">{{ item['title'] }}</div>
                                <div class="rate">rate : {{ item['rate'] }}</div>
                                <div class="movie-url">address: {{ item['url'] }} </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>

        `,
    data:function(){
                return{
                    movie_list:'',
                    movie_detail_data:'',
                }
            },
    methods:{
        moviePage(){
            console.log('查看 电影详细界面');
            var self = this;
            $.ajax({
                url:'/api/v1/preplot/',
                type:'Get',
                dataType:'json',
                success:function (data) {
                    if(data.status == 200){
                        console.log(data);
                        self.movie_detail_data = data.data;
                    }else {
                        alert(data.message)
                    }
                }
            });
            this.$router.push({
                    name: 'movie_detail',
                    params:{
                        movie_detail_data: this.movie_detail_data
                    }
                })
        },


    },
    created(){

                console.log('初始化 电影界面');
                 var self = this;
                    $.ajax({
                        url:'/',
                        type:'Get',
                        dataType:'json',
                        success:function (data) {
                            if(data.status == 200){
                                console.log(data);
                                self.movie_list = data.data;
                            }else {
                                alert(data.message)
                            }

                        }
                    })
            }

};

var component_movie_child_detail = {
    template:
        `
        `,
    data:function () {
        return{

        }

    },
    methods:{},
    created(){

    }



}

var routes = [
    // {
    //     path:'/',
    //     name:'movie',
    //     component: {
    //         template:
    //             `
    //                  <div class="container">
    //                      <div class="row">
    //                          <div class="container col-md-3">
    //                              <div class="input-group">
    //                                  <input type="text" class="form-control input-lg"><span class="input-group-addon btn btn-primary">搜索</span>
    //                              </div>
    //                              <div class="btn-group">
    //                                  <button type="button" class="btn btn-default">热门</button>
    //                                  <button type="button" class="btn btn-default">经典</button>
    //                                  <button type="button" class="btn btn-default">最新</button>
    //                              </div>
    //                              <div class="btn-group">
    //                                  <button type="button" class="btn btn-default">日韩</button>
    //                                  <button type="button" class="btn btn-default">欧美</button>
    //                                  <button type="button" class="btn btn-default">其他</button>
    //                              </div>
    //                              <div class="btn-group">
    //                                  <button type="button" class="btn btn-default">动作</button>
    //                                  <button type="button" class="btn btn-default">爱情</button>
    //                                  <button type="button" class="btn btn-default">悬疑</button>
    //                              </div>
    //
    //                          </div>
    //                          <div class="container col-md-9">
    //                              <!--<router-view></router-view>-->
    //                          </div>
    //                      </div>
    //                  </div>
    //                 `,
    //     },
    //
    //     // children:[
    //     //     {
    //     //         path:'movieInit',
    //     //         name:'movieInit',
    //     //         component: component_movie_child_init,
    //     //
    //     //     },
    //     //     {
    //     //         path:'movieDetail',
    //     //         name:'movieDetail',
    //     //         component:component_movie_child_detail,
    //     //     }
    //     // ]
    // },
    {
        path:'/movie',
        name:'movie',
        component:{
            template:`
                            <div class="container login">
                                <div class="form-container">
                                    <h1>
                                        注册
                                    </h1>
                                    <form @submit.prevent="submit">
                                        <div class="form-group">
                                            <label>用户名</label>
                                            <input v-model="user_id" type="text" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>密码</label>
                                            <input v-model="passwd" type="password" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>姓名</label>
                                            <input v-model="user_name" type="text" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>身份证号</label>
                                            <input v-model="id_num" type="test" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>邮箱</label>
                                            <input v-model="email" type="email" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>电话</label>
                                            <input v-model="phone" type="text" class="form-control">
                                        </div>
                                        <p>忘记密码？</p>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">登录</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
             `,
            data(){
                return{
                    user_id:'',
                    passwd:'',
                    user_name:'',
                    id_num:'',
                    email:'',
                    phone:'',
                }
            },
            methods:{
                submit(){
                    var self = this
                    $.ajax({
                        url:'/api/v1/register',
                        type:'Post',
                        data:{
                            user_id:this.user_id,
                            passwd:this.passwd,
                            user_name:this.user_name,
                            id_num:this.id_num,
                            email:this.email,
                            phone:this.phone,
                        },
                        dataType:'json',
                        success:function (data) {
                            if(data.status == 200){
                                console.log(data);
                                self.$router.push({name: 'home',params: {user_id:this.user_id}});
                                self.$emit('get_user',self.user_id)
                            }else {
                                alert(data.message)
                            }

                        }
                    })

                }
            }
        },
    },
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
                        alert(data.message)
                    }

                }
            })

        }
    }

});

