# -*- coding:utf-8 -*-
import sqlite3
import traceback
import urllib

from flask import render_template, jsonify, request, g

from app import app, db
from config import SQLALCHEMY_DATABASE_LOC, PAGINATION_PER_PAGE
from datetime import datetime

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

@app.route('/restaurant_profile', methods = ['GET', 'POST'])
def restaurant_profile():
    return render_template('restaurant_profile.htm')

@app.route('/restaurant_home_page', methods = ['GET', 'POST'])
def restaurant_home_page():
    return render_template('restaurant_home_page.htm')

@app.route('/owner_home_page', methods = ['GET', 'POST'])
def owner_home_page():
    return render_template('owner_home_page.htm')

@app.route('/restaurant_dish_management', methods = ['GET', 'POST'])
def restaurant_dish_management():
    return render_template('restaurant_dish_management.htm')

@app.route('/restaurant_order_history', methods = ['GET', 'POST'])
def restaurant_order_history():
    return render_template('restaurant_order_history.htm')


def get_user_no():
    total_user_num = len(db.engine.execute("SELECT * FROM customer").fetchall())
    return '0' * (3 - len(str(total_user_num))) + str(total_user_num)

@app.route('/user_signup_submit', methods = ['GET', 'POST'])
def user_signup_submit():
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

def get_restaurant_no():
    total_restaurant_num = len(db.engine.execute("SELECT * FROM restaurant").fetchall()) + 1
    print total_restaurant_num
    print '0' * (3 - len(str(total_restaurant_num))) + str(total_restaurant_num)
    return '0' * (3 - len(str(total_restaurant_num))) + str(total_restaurant_num)

@app.route('/restaurant_signup_submit', methods = ['GET', 'POST'])
def restaurant_signup_submit():
    print 'get request'
    owner_nickname = request.args.get("owner_nickname")
    restaurant_name = request.args.get("restaurant_name")
    owner_password = request.args.get("owner_password")
    print owner_nickname
    print restaurant_name
    print owner_password
    restaurant_id = get_restaurant_no()
    try:
        user_exist = g.cursor.execute("SELECT * FROM restaurant WHERE owner_nickname = '%s'" % (owner_nickname)).fetchall()
        if user_exist:
            return jsonify({"ERROR": "This nickname has been registered, you can sign in now."})
        db.engine.execute("INSERT INTO restaurant VALUES ('%s', '%s', '%s', '%s', NULL, NULL, NULL, NULL, NULL, NULL, NULL)" \
                         % (restaurant_id, owner_nickname, owner_password, restaurant_name))
        print 'new restaurant inserted into database!'
        return jsonify({"status": 0, "restaurant_id": restaurant_id, "owner_nickname": owner_nickname, "restaurant_name": restaurant_name})
    except Exception as e:
        print 'insert failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Registration failed! Please try again..."})


@app.route('/user_signin_submit', methods = ['GET', 'POST'])
def user_signin_submit():
    customer_mobile_number = request.args.get("customer_mobile_number")
    print customer_mobile_number
    customer_password = request.args.get("customer_password")
    print customer_password
    try:
        result = g.cursor.execute("SELECT * FROM customer WHERE customer_mobile_number = '%s'" % (customer_mobile_number)).fetchall()
        print result
        if result:
            customer_id, customer_nickname, db_password, customer_mobile_number, customer_address, customer_description, customer_appellation = result[0]
            if customer_password == db_password:
                return jsonify(jsonify_customer(result[0]))
            else:
                return jsonify({"ERROR": "Wrong username or password."})
        else:
            print 'User not exist!'
            return jsonify({"ERROR": "User not exist."})
    except Exception as e:
        print 'login failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Sign in failed, please try again later."})


@app.route('/restaurant_signin_submit', methods = ['GET', 'POST'])
def restaurant_signin_submit():
    owner_nickname = request.args.get("owner_nickname")
    owner_password = request.args.get("owner_password")
    try:
        result = g.cursor.execute("SELECT * FROM restaurant WHERE owner_nickname = '%s'" % (owner_nickname)).fetchall()
        print result
        if result:
            db_password = result[0][2]
            if owner_password == db_password:
                return jsonify(jsonify_restaurant(result[0]))
            else:
                return jsonify({"ERROR": "Wrong owner_nickname or password."})
        else:
            print 'Restaurant not exist!'
            return jsonify({"ERROR": "Restaurant not exist."})
    except Exception as e:
        print 'login failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Sign in failed, please try again later."})

def jsonify_restaurant(restaurant):
    key_words = ("restaurant_id", "owner_nickname", "owner_password", "restaurant_name", "restaurant_address",\
                 "delivery_fee", "base_delivery_price", "time_span", "open_time", "total_month_sale", "restaurant_description")
    return dict(zip(key_words, restaurant))

def jsonify_customer(customer):
    key_words = ("customer_id", "customer_nickname", "customer_password", "customer_mobile_number", \
                 "customer_address", "customer_description", "customer_appellation")
    return dict(zip(key_words, customer))

def jsonify_dish(dish):
    key_words = ("dish_id", "dish_name", "restaurant_id", "dish_price", "dish_month_sale")
    return dict(zip(key_words, dish))

def jsonify_dish_with_restaurant_name(dish):
    key_words = ("dish_id", "dish_name", "restaurant_id", "dish_price", "dish_month_sale", "restaurant_name")
    return dict(zip(key_words, dish))

@app.route('/search', methods = ['GET', 'POST'])
def search():
    search_value = request.args.get("search_value")
    # TODO
    return "1"

@app.route('/search_restaurant_results', methods = ['GET', 'POST'])
def search_restaurant_results():
    customer_id = request.args.get("customer_id")
    page = int(request.args.get("page")) -1
    search_value = request.args.get("search_value")
    print "get_search_value:",search_value
    search_value = urllib.unquote(str(search_value))
    print search_value
    try:
        result = g.cursor.execute("SELECT * FROM restaurant WHERE restaurant_name LIKE '%%%s%%'" % (search_value)).fetchall()
        print result
        total_result = len(result)
        total_page = total_result / PAGINATION_PER_PAGE + 1
        restaurant_result = []
        selected_result = result[page * PAGINATION_PER_PAGE: (page+1) * PAGINATION_PER_PAGE]
        for res in selected_result:
            restaurant_result.append(jsonify_restaurant(res))
        print "restaurant_result:",restaurant_result
        return jsonify({"customer_id": customer_id, "result_list":restaurant_result, "total_result": total_result, "total_page": total_page})
    except Exception as e:
        print 'search failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Search failed, please try again later..."})

@app.route('/search_dish_results', methods = ['GET', 'POST'])
def search_dish_results():
    customer_id = request.args.get("customer_id")
    page = int(request.args.get("page")) - 1
    search_value = request.args.get("search_value")
    print "get_search_value:",search_value
    search_value = urllib.unquote(str(search_value))
    print search_value
    try:
        result = g.cursor.execute("SELECT dish_id, dish_name, dish.restaurant_id, dish_price, dish_month_sale, restaurant_name FROM dish, restaurant WHERE dish_name LIKE '%%%s%%' AND dish.restaurant_id = restaurant.restaurant_id" % (search_value)).fetchall()
        print result
        total_result = len(result)
        total_page = total_result / PAGINATION_PER_PAGE + 1
        dish_result = []
        selected_result = result[page * PAGINATION_PER_PAGE: (page+1) * PAGINATION_PER_PAGE]
        for res in selected_result:
            dish_result.append(jsonify_dish_with_restaurant_name(res))
        print "dish_result",dish_result
        return jsonify({"customer_id": customer_id, "result_list":dish_result, "total_result": total_result, "total_page": total_page})
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
    customer_description = request.args.get("customer_description")
    customer_appellation = request.args.get("customer_apppellation")
    try:
        db.engine.execute("UPDATE customer SET customer_nickname = '%s', customer_address = '%s', customer_description = '%s', customer_apppellation = '%s' WHERE customer_id = '%s'" %(customer_nickname, customer_address, customer_description, customer_appellation, customer_id))
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

def get_dish_no(restaurant_name):
    prefix = g.cursor.execute("SELECT restaurant_id FROM restaurant WHERE restaurant_name = '%s'" % (restaurant_name)).fetchall()[0]
    total_dish_num = len(g.cursor.execute("SELECT * FROM dish, restaurant WHERE dish.restaurant_id = restaurant.restaurant_id AND restaurant.restaurant_id = '%s'" % prefix))
    return prefix + '-' + '0' * (2 - len(total_dish_num)) + str(total_dish_num)

@app.route('/add_dish', methods = ['GET', 'POST'])
def add_dish():
    dish_name = request.args.get("dish_name")
    restaurant_name = request.args.get("restaurant_name")
    dish_price = request.args.get("dish_price")
    # dish_month_sale = request.args.get("dish_month_sale")
    try:
        dish_id = get_dish_no()
        db.engine.execute("INSERT INTO dish VALUES('%s','%s', '%s', '%f', '%d');" % (dish_id, dish_name, dish_id[:3], float(dish_price), 0 ))
        print 'new dish inserted into database!'
        # TODO
        return "1"
    except Exception as e:
        print 'dish insert failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "New dish created failed, please try again later"})

@app.route('/get_restaurant_detail', methods = ['GET', 'POST'])
def get_restaurant_detail():
    customer_id = request.args.get("custmer_id")
    restaurant_id = request.args.get("restaurant_id")
    try:
        restaurant = g.cursor.execute("SELECT * FROM restaurant WHERE restaurant_id = '%s'" % (restaurant_id)).fetchall()
        if restaurant:
            dish_list = []
            dish_result = g.cursor.execute("SELECT  dish_id, dish_name, dish.restaurant_id, dish_price, dish_month_sale FROM dish, restaurant WHERE dish.restaurant_id = restaurant.restaurant_id AND restaurant.restaurant_id = '%s'" % (restaurant_id)).fetchall()
            print dish_result
            for dish in dish_result:
                dish_list.append(jsonify_dish(dish))
            print "result_restaurant:",restaurant[0]
            print "result_dish_list:",dish_list
            return jsonify({"restaurant": jsonify_restaurant(restaurant[0]), "dish": dish_list})
        else:
            return jsonify({"ERROR": "restaurant doesn't exist!"})
    except Exception as e:
        print 'search restaurant failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR": "Can't get restaurant details, please try again later..."})

@app.route('/get_user_history', methods= ['GET', 'POST'])
def get_user_history():
    pass

@app.route('/get_restaurant_history', methods=['GET', 'POST'])
def get_restaurant_history():
    pass

def get_customer_order_no():
    total_customer_order_num = len(db.engine.execute("SELECT * FROM customer_order").fetchall())
    return '0' * (3 - len(str(total_customer_order_num))) + str(total_customer_order_num)

def get_dish_order_no():
    total_dish_order_num = len(db.engine.execute("SELECT * FROM dish_order").fetchall())
    return '0' * (4 - len(str(total_dish_order_num))) + str(total_dish_order_num)

@app.route('/submit_order', methods=['GET', 'POST'])
def submit_order():
    # TODO
    dish_counts = request.args.get("dish_counts")
    print "dish_counts",dish_counts
    print type(dish_counts)
    dish_counts = dict(eval(dish_counts))
    dish_counts = {dish: count for dish, count in dish_counts.items() if count}
    customer_id = request.args.get("customer_id")
    print "customer_id",customer_id
    restaurant_id = request.args.get("restaurant_id")
    print "restaurant_id",restaurant_id
    customer_order_id = get_customer_order_no()
    try:
        db.engine.execute("INSERT INTO customer_order VALUES('%s', '%s', '%s', '%s', NULL);" % (restaurant_id, customer_id, customer_order_id, datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
        for order, count in dish_counts.items():
            dish_order_id = get_dish_order_no()
            db.engine.execute("INSERT INTO dish_order VALUES('%s', '%s', '%s', '%d');" % (dish_order_id, customer_order_id, order, int(count)))
        return jsonify({"succeed!": "succeed!"})
    except Exception as e:
        print 'order insert failed!'
        print traceback.format_exc(e)
        return jsonify({"ERROR":"Submit order failed, please try again later.."})

@app.route('/change_restaurant_password', methods=['GET', 'POST'])
def change_restaurant_password():
    pass

@app.route('/upload_restaurant_profile', methods=['GET', 'POST'])
def upload_restaurant_profile():
    pass

@app.route('/change_dish', methods=['GET', 'POST'])
def change_dish():
    pass

@app.route('/receive_order', methods=['GET', 'POST'])
def receive_order():
    pass

