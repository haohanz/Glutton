import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_LOC = os.path.join(basedir, 'app.db')
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

CSRF_ENABLED = True
SECRET_KEY = 'you-will-never-guess'

# pagination
PAGINATION_PER_PAGE = 5
