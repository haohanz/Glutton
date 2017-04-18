from flask_wtf import FlaskForm
from wtforms import TextField, BooleanField, StringField, TextAreaField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    search_value = ""

class SignupForm(FlaskForm):
    mobile = TextField('mobile', validators = [DataRequired()])
    nickname = TextField('nickname', validators = [DataRequired()])
    password = TextField('password', validators=[DataRequired()])
    remember_me = BooleanField('remember_me', default = False)
