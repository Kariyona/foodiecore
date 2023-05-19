from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ListingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('Title', validators=[DataRequired()])
    country = StringField('Title', validators=[DataRequired()])
    hours = StringField('Title', validators=[DataRequired()])
    description = StringField('Title', validators=[DataRequired()])
    image_url = StringField('Title', validators=[DataRequired()])
