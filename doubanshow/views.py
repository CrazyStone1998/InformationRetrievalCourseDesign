from django.shortcuts import render

# Create your views here.
import os
from snownlp import SnowNLP
from snownlp import sentiment

from django.views.decorators.cache import never_cache
from django.http import JsonResponse
from doubanshow import models
from w3lib.html import remove_tags
from doubanshow.common.wordCloud import wordCloud
from doubanshow.common.fuzzySearch import searchResult
from doubanshow.common.snownlp import pltView
import redis

'''
views.initView, name='
 views.wordCould, name
ews.search, name='sear
$', views.shortComment
$', views.movieComment'''

@never_cache
def initView(request):
    '''

    初始化电影界面：返回电影信息

    :param request:
    :return:
        {
            'status':200,
            'message':SUCCESS,
            'data':[
                    { 'title': xxoo,
                      'cover': xxoo,
                      'rate': xxoo,
                      'url': xxoo,
                      'id': xxoo,
                    },
                    { 'title': xxoo,
                      'cover': xxoo,
                      'rate': xxoo,
                      'url': xxoo,
                      'id': xxoo,
                    },
                ]

    }
    '''
    if request.method == 'GET':

        data = []
        movie_list = models.movie.objects.all()
        if movie_list:
            for each_movie in movie_list:

                data.append(
                    {
                        'id': each_movie.id,
                        'title': each_movie.title,
                        'url': each_movie.url,
                        'rate': each_movie.rate,
                        'cover': each_movie.cover,
                    }
                )
            return JsonResponse(
                {
                    'status': 200,
                    'message': 'SUCCESS',
                    'data': data,
                }
            )
        else:
            return JsonResponse(
                {
                    'status': 202,
                    'message': 'there is no movies',
                }
            )



    return JsonResponse(
        {
            'status': 202,
            'message': 'method wrong',

        }
    )

@never_cache
def movieDetail(request):
    '''
    获取 单个电影的详细界面

    :param request:

        'url':xxoo
        'movie_id':id

    :return:{
                'status':200,
                'message':'SUCCESS',
                'data':{
                    'word_clould': img.file
                    'short_comment': [
                        {
                            'id':xxoo,
                            'rate':xxoo,
                            'comment':xxoo,
                            'sentiment':xxoo,
                            },
                        {
                            'id':xxoo,
                            'rate':xxoo,
                            'comment':xxoo,
                            'sentiment':xxoo,
                            },

                    ]
                    'movie_comment':[
                        {
                            'id':xxoo,
                            'rate':xxoo,
                            'title':xxoo,
                            'comment':xxoo,
                            'sentiment':xxoo,
                            'keyword':xxoo,
                            'summary':xxoo,
                            },
                        {
                            'id':xxoo,
                            'rate':xxoo,
                            'title':xxoo,
                            'comment':xxoo,
                            'sentiment':xxoo,
                            'keyword':xxoo,
                            'summary':xxoo,
                            },
                }

    '''


    if request.method == 'GET':

        movie_id = request.GET.get('movie_id')

        url = request.GET.get('url')


        short_sentiment_list = []
        movie_sentiment_list = []

        short_comment_data = []
        movie_comment_data = []

        original_text = ''
        short_comment_list = models.shortComment.objects.filter(movie_id=movie_id)
        movie_comment_list = models.movieComment.objects.filter(movie_id=movie_id)
        for each_comment in short_comment_list:
            original_text = original_text + each_comment.comment

            short_s = SnowNLP(each_comment.comment)
            short_sentiment_list.append(short_s.sentiments)

            short_comment_data.append(
                {
                    'id': each_comment.id,
                    'rate': each_comment.rate,
                    'comment': each_comment.comment,
                    'sentiment': short_s.sentiments,
                }
            )

        for each_comment in movie_comment_list:
            original_text = original_text + each_comment.comment

            movie_s = SnowNLP(remove_tags(each_comment.comment))
            movie_sentiment_list.append(movie_s.sentiments)

            movie_comment_data.append(
                {
                    'id': each_comment.id,
                    'rate': each_comment.rate,
                    'title': each_comment.title,
                    'comment': each_comment.comment,
                    'sentiment': movie_s.sentiments,
                    'keyword': movie_s.keywords(3),
                    'summary': movie_s.summary(3),
                }
            )

        pltView(short_sentiment_list, 'F:/Code/Py_CODE/InformationRetrievalCourseDesign/static/img/'+movie_id+'_short.jpg')
        pltView(movie_sentiment_list, 'F:/Code/Py_CODE/InformationRetrievalCourseDesign/static/img/'+movie_id+'_movie.jpg')


        if not os.path.exists('F:/Code/Py_CODE/InformationRetrievalCourseDesign/static/img/'+movie_id+'.jpg'):
            wordCloud(remove_tags(original_text), movie_id)

        return JsonResponse(
            {
                'status': 200,
                'message': 'SUCCESS',
                'data': {
                    'word_cloud': '../static/img/' + movie_id + '.jpg',
                    'short_comment': short_comment_data,
                    'movie_comment': movie_comment_data,
                    'short_sentiment_img': '../static/img/' + movie_id + '_short.jpg',
                    'movie_sentiment_img': '../static/img/' + movie_id + '_movie.jpg',
                }
            }
        )

    return JsonResponse(
        {
            'status': 202,
            'message': 'method wrong',

        }
    )

@never_cache
def search(request):
    '''
    模糊搜索 系统

        1.提取关键字
        2.模糊搜索
        3.返回结果

    :param request:{
                search_content:xxoo
                }

    :return:  {
            'status':200,
            'message':SUCCESS,
            'data':[
                    { 'title': xxoo,
                      'cover': xxoo,
                      'rate': xxoo,
                      'url': xxoo,
                      'id': xxoo,
                    },
                    { 'title': xxoo,
                      'cover': xxoo,
                      'rate': xxoo,
                      'url': xxoo,
                      'id': xxoo,
                    },
                ]

    }

    '''

    if request.method == 'GET':

        data = []

        search_content = request.GET.get('search_content')
        movie_list = models.movie.objects.all()

        print(search_content)

        raw_result = searchResult(search_content, [each.title for each in movie_list], 5)

        print(raw_result)

        search_result = models.movie.objects.filter(title__in=[each[0] for each in raw_result])

        print(search_result)
        for each_movie in search_result:
            data.append(
                {
                    'id': each_movie.id,
                    'title': each_movie.title,
                    'url': each_movie.url,
                    'rate': each_movie.rate,
                    'cover': each_movie.cover,
                }
            )
        return JsonResponse(
            {
                'status': 200,
                'message': 'SUCCESS',
                'data': data,
            }
        )


    return JsonResponse(
        {
            'status': 202,
            'message': 'method wrong',

        }
    )

