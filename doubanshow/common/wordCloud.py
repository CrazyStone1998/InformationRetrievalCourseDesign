# -*- coding: utf8 -*-

import matplotlib.pyplot as plt
# -*- coding: utf-8 -*-
import jieba

from jieba import analyse
from scipy.misc import imread
import matplotlib as mpl
import matplotlib.pyplot as plt
from wordcloud import WordCloud


def wordCloud(text, movie_id):

    original_text = text

    wordList = jieba.cut(original_text)

    print('全文分词完成...')

    tags = analyse.extract_tags(original_text, topK=500, withWeight=False)

    print('关键词筛选完成...')

    stags = " ".join(tags)
    with open('F:\Code\Py_CODE\InformationRetrievalCourseDesign\doubanshow\common\stopwords.txt', 'r', encoding='utf-8') as f :
        stopwords = list(f.read().split('\n'))

    outstr = ''
    for word in wordList:
        if word in stags:
            if word not in stopwords:
                if word != '\t':

                    outstr += word
                    outstr += " "
    cloud = WordCloud(
        font_path='C:/Windows/Fonts/msyhbd.ttc',
        background_color='white',
        mask=imread('F:/Code/Py_CODE/InformationRetrievalCourseDesign/static/img/mask.jpg'),
        max_words=500,
        max_font_size=60)
    # 设置词云参数，字体，模板，背景白色，最大词量100个，最大字体尺寸60
    word_cloud = cloud.generate(outstr)  # 产生词云数据 word_cloud

    path = 'F:/Code/Py_CODE/InformationRetrievalCourseDesign/static/img/'+movie_id+'.jpg'
    word_cloud.to_file(path)



