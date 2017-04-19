

from app import db


# In[98]:

db.engine.execute('''
CREATE TABLE restaurant(
rno CHAR(3) NOT NULL,
rusername CHAR(20) NOT NULL,
rpassword CHAR(20) NOT NULL,
rname CHAR(50) NOT NULL,
raddress CHAR(100),
delivery_fee DECIMAL(5,2),
lowprice DECIMAL(5,2),
speed SMALLINT,
openhour  CHAR(20),
monsale INTEGER,
bulletin CHAR(200),
PRIMARY KEY(rno)
);''')


# In[99]:

db.engine.execute("select * from restaurant").fetchall()


# In[100]:

db.engine.execute("""
CREATE TABLE customer(
cno CHAR(3) NOT NULL,
cusername CHAR(20) NOT NULL,
cpassword CHAR(20) NOT NULL,
cphone CHAR(20) NOT NULL,
caddress CHAR(100),
signature CHAR(100),
appellation CHAR(20),
PRIMARY KEY(cno)
);
""")


# In[101]:

db.engine.execute("""CREATE TABLE dish(
dno CHAR(6) NOT NULL,
dname CHAR(30) NOT NULL,
rno CHAR(3) NOT NULL,
price DECIMAL(5,2) NOT NULL,
monsale SMALLINT,
PRIMARY KEY(dno),
FOREIGN KEY(rno)REFERENCES restaurant(rno)
);""")


# In[102]:

db.engine.execute("""CREATE TABLE customer_order(
rno CHAR(3) NOT NULL,
cno CHAR(3) NOT NULL,
createtime DATETIME NOT NULL,
oaddress CHAR(100) NOT NULL,
ophone CHAR(20) NOT NULL,
receipttime DATETIME,
PRIMARY KEY(rno,cno),
FOREIGN KEY(rno)REFERENCES restaurant(rno),
FOREIGN KEY(cno)REFERENCES customer(cno)
);""")


# In[103]:

db.engine.execute("""CREATE TABLE dish_order(
dono CHAR(4) NOT NULL,
cono CHAR(4) NOT NULL,
dno CHAR(6) NOT NULL,

PRIMARY KEY(dono),
FOREIGN KEY(cono)REFERENCES customer_order(cono),
FOREIGN KEY(dno)REFERENCES dish(dno)
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

