import json
import urllib.request
import unittest

test_data = [{'username': 'testuser', 'email': 'testuser@gmail.com','password': '123456', 'confirm_password': '123456'},
            {'username': 'testuser2', 'email': 'testuser2@gmail.com', 'password': '1234562', 'confirm_password': '1234562'}]

class MyTestClass(unittest.TestCase):
    
    # test method for register function
    def test_right_register(self):
        self.__request_data = {'username': 'testuser2', 'email': 'testuser2@gmail.com', 
                                'password': '1234562', 'confirm_password': '1234562'}
        self.__url = "http://127.0.0.1:3000/api/register"
        req = urllib.request.Request(self.__url, data=json.dumps(self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test register function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the sucessful registrition, code is 200")
    
    # test method for login function
    def test_wrong_register(self):
        self.__request_data = {'email': 'testuser2@gmail.com', 'password': '1234562'}
        self.__url = "http://127.0.0.1:3000/api/login"
        req = urllib.request.Request(self.__url, data=json.dumps(self.__request_data).encode('utf8'))
        req.add_header('Content-Type', 'application/json')
        response = urllib.request.urlopen(req)
        print("Start to test register function")
        self.assertEqual(response.getcode(), 200)
        print("Finish test : success the unsucessful registrition, code is 200")


# runs the unit tests in the module
if __name__ == '__main__':
    unittest.main()
