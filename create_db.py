

from app import db


# In[98]:

db.engine.execute('''
CREATE TABLE restaurant(
restaurant_id CHAR(3) NOT NULL,
owner_nickname CHAR(20) NOT NULL,
owner_password CHAR(20) NOT NULL,
restaurant_name CHAR(50) NOT NULL,
restaurant_address CHAR(100),
delivery_price DECIMAL(5,2),
base_deliver_price DECIMAL(5,2),
time_span SMALLINT,
open_time  CHAR(20),
total_month_sale INTEGER,
restaurant_discription CHAR(200),
PRIMARY KEY(restaurant_id)
);''')


db.engine.execute("""
CREATE TABLE customer(
customer_id CHAR(3) NOT NULL,
customer_nickname CHAR(20) NOT NULL,
customer_password CHAR(20) NOT NULL,
customer_mobile_number CHAR(20) NOT NULL,
customer_address CHAR(100),
customer_discription CHAR(100),
customer_gender CHAR(20),
customer_appellation CHAR(20),
PRIMARY KEY(customer_id)
);
""")


# In[101]:

db.engine.execute("""CREATE TABLE dish(
dish_id CHAR(6) NOT NULL,
dish_name CHAR(30) NOT NULL,
restaurant_id CHAR(3) NOT NULL,
dish_price DECIMAL(5,2) NOT NULL,
dish_month_sale SMALLINT,
PRIMARY KEY(dish_id),
FOREIGN KEY(restaurant_id)REFERENCES restaurant(restaurant_id)
);""")


# In[102]:

db.engine.execute("""CREATE TABLE customer_order(
restaurant_id CHAR(3) NOT NULL,
customer_id CHAR(3) NOT NULL,
order_id CHAR(3) NOT NULL,
create_time DATETIME NOT NULL,
receive_time DATETIME,
PRIMARY KEY(order_id),
FOREIGN KEY(restaurant_id)REFERENCES restaurant(restaurant_id),
FOREIGN KEY(customer_id)REFERENCES customer(customer_id)
);""")


# In[103]:

db.engine.execute("""CREATE TABLE dish_order(
dish_order_id CHAR(4) NOT NULL,
order_id CHAR(4) NOT NULL,
dish_id CHAR(6) NOT NULL,

PRIMARY KEY(dish_order_id),
FOREIGN KEY(order_id)REFERENCES customer_order(order_id),
FOREIGN KEY(dish_id)REFERENCES dish(dish_id)
);""")


# In[104]:

db.engine.execute("select * from restaurant").fetchall()


# In[105]:

f = open('insert.sql')


# In[106]:

line = f.readline()
while line:
    db.engine.execute(line)
    print line
    line = f.readline()

