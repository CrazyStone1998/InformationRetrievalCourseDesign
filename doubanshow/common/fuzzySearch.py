# -*- coding: utf8 -*-

from fuzzywuzzy import fuzz
from fuzzywuzzy import process


def searchResult(search_content, movies, limit):


    return process.extract(query=search_content, choices=movies, limit=limit)




a = ['123', '46', '78']

print(process.extract('12',a))
