# -*- coding:utf-8 -*-
import sqlite3
import traceback
import urllib

from flask import render_template, jsonify, request, g

from app import app, db
from config import SQLALCHEMY_DATABASE_LOC


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

@app.route('/view_history', methods = ['GET', 'POST'])
def view_history():
    return render_template('view_history.htm')

@app.route('/signin', methods = ['GET', 'POST'])
def signin():
    return render_template('signin.htm')

@app.route('/search_results', methods = ['GET', 'POST'])
def search_results():
    return render_template('search_results.htm')

@app.route('/restaurant_home_page', methods = ['GET', 'POST'])
def restaurant_home_page():
    return render_template('restaurant_home_page.htm')

def get_user_no():
    total_user_num = len(db.engine.execute("SELECT * FROM customer").fetchall())
    return '0' * (2 - total_user_num) + str(total_user_num)

@app.route('/signup/_submit', methods = ['GET', 'POST'])
def signup_submit():
    print 'get request'
    customer_mobile_number = request.args.get("customer_mobile_number")
    customer_nickname = request.args.get("customer_nickname")
    customer_password = request.args.get("customer_password")
    print customer_mobile_number
    print customer_nickname
    print customer_password
    customer_id = get_user_no()
    try:
        user_exist = g.cursor.execute("SELECT * FROM customer WHERE customer_mobile_number = '%s'" % (customer_mobile_number)).fetchall()
        if user_exist:
            return jsonify({"ERROR": "This mobile has been registered, you can sign in now."})
        db.engine.execute("INSERT INTO customer VALUES ('%s', '%s', '%s', '%s', NULL, NULL, NULL)" \
                         % (customer_id,  customer_nickname, customer_password, customer_mobile_number))
        print 'new user inserted into database!'
        return jsonify({"status": 0, "customer_id": customer_id, "customer_nickname": customer_nickname, "customer_mobile_number": customer_mobile_number})
    except Exception as e:
        print 'insert failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Registration failed! Please try again..."})

@app.route('/signin/_submit', methods = ['GET', 'POST'])
def signin_submit():
    customer_mobile_number = request.args.get("customer_mobile_number")
    print customer_mobile_number
    customer_password = request.args.get("customer_password")
    print customer_password
    try:
        result = g.cursor.execute("SELECT * FROM customer WHERE customer_mobile_number = '%s'" % (customer_mobile_number)).fetchall()
        print result
        if result:
            customer_id, customer_nickname, db_password, customer_mobile_number, customer_address, customer_discription, customer_gender, customer_appellation = result[0]
            if customer_password == db_password:
                return jsonify({"status": 0, "customer_id": customer_id,  "customer_nickname": customer_nickname, "customer_mobile_number": customer_mobile_number, "customer_address": customer_address, "customer_discription": customer_discription, "customer_gender": customer_gender, "customer_appellation": customer_appellation})
            else:
                return jsonify({"ERROR": "Wrong username or password."})
        else:
            print 'User not exist!'
            return jsonify({"ERROR": "User not exist."})
    except Exception as e:
        print 'login failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Sign in failed, please try again later."})

def jsonify_restaurant(restaurant):
    key_words = ("restaurant_id", "owner_nickname", "owner_password", "restaurant_name", "restaurant_addresss",\
                 "delivery_fee", "base_delivery_price", "time_span", "open_time", "total_month_sale", "restaurant_description")
    return dict(zip(key_words, restaurant))

def jsonify_customer(customer):
    key_words = ("customer_id", "customer_nickname", "customer_password", "customer_mobile_number", \
                 "customer_address", "customer_discription", "customer_appellation")
    return dict(zip(key_words, customer))

@app.route('/search', methods = ['GET', 'POST'])
def search():
    search_value = request.args.get("search_value")
    # TODO
    return "1"

@app.route('/search_results_function', methods = ['GET', 'POST'])
def search_results_function():
    search_value = request.args.get("search_value")
    print "get_search_value:",search_value
    search_value = urllib.unquote(str(search_value))
    print search_value
    try:
        result = g.cursor.execute("SELECT * FROM restaurant WHERE restaurant_name LIKE '%%%s%%'" % (search_value)).fetchall()
        print result
        restaurant_result = []
        for res in result:
            restaurant_result.append(jsonify_restaurant(res))
        print restaurant_result
        return jsonify({"restaurants":restaurant_result})
    except Exception as e:
        print 'search failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Search failed, please try again later..."})

@app.route('/initialize_homepage', methods = ['GET','POST'])
def initialize_homepage():
    customer_id = request.args.get("customer_id")
    try:
        res = g.cursor.execute("SELECT * FROM customer WHERE customer_id = '%s'" % (customer_id)).fetchall()
        if res:
            return jsonify(jsonify_customer(res[0]))
    except Exception as e:
        print 'db search failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Initialized failed, please try again later.."})

@app.route('/upload_your_profile', methods = ['GET','POST'])
def upload_your_profile():
    customer_id = request.args.get("customer_id")
    customer_nickname = request.args.get("customer_nickname")
    customer_address = request.args.get("cutomer_address")
    customer_discription = request.args.get("customer_discription")
    customer_appellation = request.args.get("customer_apppellation")
    try:
        db.engine.execute("UPDATE customer SET customer_nickname = '%s', customer_address = '%s', customer_discription = '%s', customer_apppellation = '%s' WHERE customer_id = '%s'" %(customer_nickname, customer_address, customer_discription, customer_appellation, customer_id))
        print 'successfully updated profile!'
        updated_profile = g.cursor.execute("SELECT * FROM customer WHERE customer_id = '%s'" % (customer_id)).fetchall()
        return jsonify(jsonify_customer(updated_profile[0]))
    except Exception as e:
        print 'update profile failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Update profile failed, please try again later.."})

@app.route('/change_password', methods = ['GET','POST'])
def change_password():
    customer_id = request.args.get("customer_id")
    customer_password = request.args.get("customer_password")
    try:
        db.engine.execute("UPDATE customer SET customer_password = '%s' WHERE customer_id = '%s'" % (customer_password, customer_id))
        print 'successfully changed password!'
    except Exception as e:
        print 'Change password failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Change password failed, please try again later.."})
