
import os,lp
from flask import Flask, url_for,redirect,render_template,jsonify, request, send_from_directory
from flask_uploads import UploadSet, configure_uploads, IMAGES, patch_request_class
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField
from app import app

@app.route('/', methods = ['GET', 'POST'])
@app.route('/front_page', methods = ['GET', 'POST'])
# @login_required
def index():
    return render_template('front_page.htm')

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template('signup.htm')

@app.route('/home_page', methods = ['GET', 'POST'])
def home_page():
    return render_template('home_page.htm')

@app.route('/your_profile', methods = ['GET', 'POST'])
def your_profile():
    return render_template('your_profile.htm')


@app.route('/signin', methods = ['GET', 'POST'])
def signin():
    return render_template('signin.htm')

@app.route('/search_results', methods = ['GET', 'POST'])
def search_results():
    return render_template('search_results.htm')


# class RegexConverter(BaseConverter):
#     def __init__(self, map, *args):
#         self.map = map
#         self.regex = args[0]

# app = Flask(__name__)
# app.url_map.converters['regex'] = RegexConverter

# @app.route('/<regex(".*htm"):url>', methods = ['GET', 'POST'])
# def signup(url):
#     print url
#     return render_template(url)

@app.route('/signup/_submit', methods = ['GET', 'POST'])
def signup_submit():
    print 'get request'
    mobile = request.args.get("mobile")
    nickname = request.args.get("nickname")
    password = request.args.get("password")
    print request.values
    print 'mobile : ',mobile
    print 'password : ',password
    print 'nickname : ',nickname
    if nickname and password and mobile:
        print 'success!'
        return jsonify({"USER_ID":"11267890"})
    else:
        print 'fail'
        return jsonify({"ERROR":'Invalid Input'})


@app.route('/signin/_submit', methods = ['GET', 'POST'])
def signin_submit():
    mobile = request.args.get("mobile")
    password = request.args.get("password")
    print 'mobile',mobile
    print 'password',password
    if mobile and password:
        return "1"
    else:
        return jsonify({"ERROR":'Invalid Input'})

search_value = ""
@app.route('/search', methods = ['GET', 'POST'])
def search():
    global search_value 
    search_value = request.args.get("search_value")
    print 'search_value',search_value
    return "1"

s_r = [{'name':'name1','count':'count1'},{'name':'name2','count':'count2'}]
@app.route('/search_results_function', methods = ['GET', 'POST'])
def search_results_function():
    global search_value 
    global s_r
    print 'in search_results, get search_value:',search_value
    return jsonify({"search_value_in_search_results":search_value,"search_results":s_r,"page_num":10,"total_result_len":13456})

@app.route('/initialize_homepage', methods = ['GET','POST'])
def initialize_homepage():
    print '~~~'
    return jsonify({"nickname":"this is a nickname"})

@app.route('/upload_your_profile', methods = ['GET','POST'])
def upload_your_profile():
    NickName = request.args.get("NickName")
    print 'get NickName:' , NickName
    print "upload_profile";
    return ""

@app.route('/change_password', methods = ['GET','POST'])
def change_password():
    return ""

@app.route('/change_mobile_number', methods = ['GET','POST'])
def change_mobile_number():
    return ""

@app.route('/delete_account', methods = ['GET','POST'])
def delete_account():
    return ""










