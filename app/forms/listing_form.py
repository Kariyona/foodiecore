from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class ListingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    hours = StringField('Hours', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
