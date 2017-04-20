import os,lp
import traceback
from flask import Flask, url_for,redirect,render_template,jsonify, request, g, session, flash
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField
from app import app, db, lm
from config import SQLALCHEMY_DATABASE_LOC
import sqlite3

@app.before_request
def before_request():
    g.conn = sqlite3.connect(SQLALCHEMY_DATABASE_LOC)
    g.cursor = g.conn.cursor()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'cursor'):
        g.cursor.close()
    if hasattr(g, 'conn'):
        g.conn.close()

@app.route('/', methods = ['GET', 'POST'])
@app.route('/front_page', methods = ['GET', 'POST'])
def index():
    return render_template('front_page.htm')

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template('signup.htm')

@app.route('/home_page', methods = ['GET', 'POST'])
# @login_required
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


def get_user_no():
    total_user_num = len(db.engine.execute("SELECT * FROM customer").fetchall())
    return '0' * (2 - total_user_num) + str(total_user_num)

@app.route('/signup/_submit', methods = ['GET', 'POST'])
def signup_submit():
    print 'get request'
    customer_mobile_number = request.args.get("customer_mobile_number")
    customer_nickname = request.args.get("customer_nickname")
    customer_password = request.args.get("customer_password")
    customer_id = get_user_no()
    try:
        g.cursor.execute("INSERT INTO customer VALUES ('%s', '%s', '%s', '%s', NULL, NULL, NULL, NULL)" \
                         % (customer_id,  customer_nickname, customer_password, customer_mobile_number))
        print 'new user inserted into database!'
        return jsonify({"status": 0, "customer_id": customer_id, "customer_nickname": customer_nickname, "customer_mobile_number": customer_mobile_number})
    except Exception as e:
        print 'insert failed!'
        print traceback.format_exc()
        return jsonify({"ERROR": "Registration failed! Please try again..."})

@app.route('/signin/_submit', methods = ['GET', 'POST'])
def signin_submit():
    customer_mobile_number = request.args.get("customer_mobile_number")
    customer_password = request.args.get("customer_password")
    try:
        result = g.cursor.execute("SELECT * FROM customer WHERE customer_mobile = '%s'" % (customer_mobile_number)).fetchall()
        if result:
            customer_id, customer_nickname, db_password, customer_mobile_number, customer_address, customer_discription, customer_gender, customer_appellation = result[0]
            if customer_password == db_password:
                return jsonify{"status": 0, "customer_id": customer_id,  "customer_nickname": customer_nickname, "customer_mobile_number": customer_mobile_number, "customer_address": customer_address, "customer_discription": customer_discription, "customer_gender": customer_gender, "customer_appellation": customer_appellation}
        else:
            print 'User not exist!'
            return jsonify{"ERROR": "User not exist."}
    except Exception as e:
        print 'login failed!'
        print traceback.format_exc()
        return jsonify{"ERROR": "Sign in failed, please try again later."}

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









