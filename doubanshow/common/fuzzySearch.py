# -*- coding: utf8 -*-

from fuzzywuzzy import fuzz
from fuzzywuzzy import process


def searchResult(search_content, movies, limit):


    return process.extract(query=search_content, choices=movies, limit=limit)

