from django.shortcuts import render
from django.http import HttpResponse
from bs4 import BeautifulSoup
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json

class GetQuestionStack(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        data = data['search']
        check_filter_split = data.split(':')
        check_filter = check_filter_split[0]
        try:
            if len(check_filter_split) == 1:
                res = requests.get(f"https://stackoverflow.com/questions/tagged/{data}")
            elif check_filter == 'answers':
                res = requests.get(f"https://stackoverflow.com/search?q=answers%3A{check_filter_split[1]}")
            elif check_filter == 'score':
                res = requests.get(f"https://stackoverflow.com/search?q=score%3A{check_filter_split[1]}")
            elif check_filter == 'isaccepted':
                res = requests.get(f"https://stackoverflow.com/search?q=isaccepted%3A{check_filter_split[1]}")
            soup = BeautifulSoup(res.text, "html.parser")
            questions = soup.select(".question-summary")

            res = []
            for que in questions:
                q = que.select_one('.question-hyperlink').getText()
                vote_count = que.select_one('.vote-count-post').getText()
                try:
                    views = que.select_one('.views').attrs['title']
                except:
                    views = None
                tags = [i.getText() for i in (que.select('.post-tag'))]
                res.append({"question": q, "vote_count": vote_count, "views": views, "tags": tags})
        
            return Response({'data': res})
        except:
            return Response({'Error': "Error"})