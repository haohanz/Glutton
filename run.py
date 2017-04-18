from app import app
app.run(debug=True)


# from gevent.wsgi import WSGIServer
# app = WSGIServer(('', 5000), app)
# app.serve_forever()


# from gevent import monkey 
# monkey.patch_all() 
# from flask import Flask 
# from gevent import pywsgi 

# app = Flask(__name__) 


# app = pywsgi.WSGIServer(('',5000), app) 
# app.serve_forever() 