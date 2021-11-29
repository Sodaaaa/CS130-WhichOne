import json
import urllib.request
import unittest
from fakeData import generate_fake_data
from api import db, User, Question, Option, UserVote, UserAttitude

test_data = [{'username': 'testuser', 'email': 'testuser@gmail.com', 'password': '123456', 'confirm_password': '123456'},
             {'username': 'testuser2', 'email': 'testuser2@gmail.com', 'password': '1234562', 'confirm_password': '1234562'}]


def drop_all():
    db.drop_all()
    db.session.commit()


def drop_all_and_create_all():
    db.drop_all()
    db.create_all()
    db.session.commit()


class MyTestClass(unittest.TestCase):

    # test method for register function
    def test_right_register(self):
        self.__request_data = {'username': 'testuser2', 'email': 'testuser2@gmail.com',
                               'password': '1234562', 'confirm_password': '1234562'}
        self.__url = "http://127.0.0.1:3000/api/register"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test register function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the sucessful registrition, code is 200")

    # test method for login function
    def test_wrong_register(self):
        self.__request_data = {
            'email': 'testuser2@gmail.com', 'password': '1234562'}
        self.__url = "http://127.0.0.1:3000/api/login"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test register function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the login function, code is 200")

    # test method for getAllQuestions
    def test_get_all_questions(self):
        self.__request_data = {'UID': 1}
        self.__url = "http://127.0.0.1:5000/api/getAllQuestions"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test getAllQuestions")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : getAllQuestions success, code is 200")

    # test method for listTopics
    def test_list_topics(self):
        self.__request_data = {'UID': 1, 'tags': 'Movie,Food'}
        self.__url = "http://127.0.0.1:5000/api/listTopics"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test listTopics")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : listTopics success, code is 200")

    def test_right_get_Vote(self):
        self.__request_data = {'UID': 5}
        self.__url = "http://127.0.0.1:3000/api/getVotes"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test getVote function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the getVote function, code is 200")

    def test_right_get_Attitude(self):
        self.__request_data = {'UID': 6}
        self.__url = "http://127.0.0.1:3000/api/getAttitudes"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test getVote function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the getAttitude function, code is 200")

    def test_right_get_HistoricalQuestions(self):
        self.__request_data = {'UID': 3}
        self.__url = "http://127.0.0.1:3000/api/getHistoricalQuestions"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test getVote function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the getHistoricalQuestions function, code is 200")

    def test_right_getUserinfo(self):
        self.__request_data = {'UID': 4}
        self.__url = "http://127.0.0.1:3000/api/getUserinfo"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test getVote function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the getUserinfo function, code is 200")

    def test_recordVote(self):
        generate_fake_data()
        self.__request_data = {
            "userID"        : 5,
            "questionID"    : 1,
            "optionID"      : 1
        }
        self.__url = "http://127.0.0.1:3000/api/recordVote"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test recordVote function")
        self.assertEqual(response.getcode(), 200)
        response_json = json.loads(bytes.decode(response.read(), 'utf-8'))
        self.assertEqual(response_json['success'], True)
        print("Finish test : success recording vote, code is 200")
    
    def test_recordAttitude(self):
        generate_fake_data()
        self.__request_data = {
            "userID"        : 5,
            "questionID"    : 1,
            "attitude"      : 0
        }
        self.__url = "http://127.0.0.1:3000/api/recordAttitude"
        req = urllib.request.Request(self.__url, data=json.dumps(
            self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test recordAttitude function")
        self.assertEqual(response.getcode(), 200)
        response_json = json.loads(bytes.decode(response.read(), 'utf-8'))
        self.assertEqual(response_json['success'], True)
        print("Finish test : success recording attitude, code is 200")

    def setUp(self):
        drop_all_and_create_all()

    def tearDown(self) -> None:
        drop_all()
        return super().tearDown()


# runs the unit tests in the module
if __name__ == '__main__':
    unittest.main()
