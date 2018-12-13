from snownlp import SnowNLP
from snownlp import sentiment

from matplotlib import pyplot as plt


def pltView(list, path):

    '''
    生成 柱状图
    :param short_sentiment_list:
    :param movie_sentiment_list:
    :return:
    '''
    count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if list:

        for each in list:
            count[int(float('%.1f' % each)*10)] = count[int(float('%.1f' % each)*10)] + 1
        print(count)
        # 绘图
        plt.bar(range(11), count, align='center', color='steelblue', alpha=0.8)
        # 添加轴标签
        plt.ylabel('num')
        # 添加标题
        plt.title('sentiment analysis')
        # 添加刻度标签
        plt.xticks(range(11), ['hate', '', '', '', '', '', '', '', '', '', 'love'])
        # 设置Y轴的刻度范围
        plt.ylim([0, 200])

        plt.savefig(path)

