import time

from flask import Blueprint, request, session, url_for
from flask import render_template, redirect, jsonify
from werkzeug.security import gen_salt
from authlib.integrations.flask_oauth2 import current_token
from authlib.oauth2 import OAuth2Error

from .api.interface.claims import create_batch, load_billable_claims, load_claim
from .api.schema import create_schema, load_all_schemas, get_flags_by_query, get_my_filtered_contacts, \
    get_schema_attributes_by, get_schema_by_pk, get_value_suggesstions, get_rules_by_pk
from .models import db, User, OAuth2Client
from .oauth2 import authorization, require_oauth
from flask_cors import CORS

from .api.reports import  hl7_summary_report
from .api.rules_engine import load_rule_boxes, load_my_collections, load_schema, load_suggesstions, test_rule, \
    load_action_suggesstions, load_bots

bp = Blueprint('home', __name__)
CORS(bp)

def current_user():
    if 'id' in session:
        uid = session['id']
        return User.query.get(uid)
    return None


def split_by_crlf(s):
    return [v for v in s.splitlines() if v]

@bp.route('/', methods=('GET', 'POST'))
def home():
    if request.method == 'POST':
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()
        if not user:
            user = User(username=username)
            db.session.add(user)
            db.session.commit()
        session['id'] = user.id
        # if user is not just to log in, but need to head back to the auth page, then go for it
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)
        return redirect('/')
    user = current_user()
    if user:
        clients = OAuth2Client.query.filter_by(user_id=user.id).all()
    else:
        clients = []

    return render_template('home.html', user=user, clients=clients)


@bp.route('/logout')
def logout():
    del session['id']
    return redirect('/')


@bp.route('/create_client', methods=('GET', 'POST'))
def create_client():
    user = current_user()
    if not user:
        return redirect('/')
    if request.method == 'GET':
        return render_template('create_client.html')

    client_id = gen_salt(24)
    client_id_issued_at = int(time.time())
    client = OAuth2Client(
        client_id=client_id,
        client_id_issued_at=client_id_issued_at,
        user_id=user.id,
    )

    form = request.form
    client_metadata = {
        "client_name": form["client_name"],
        "client_uri": form["client_uri"],
        "grant_types": split_by_crlf(form["grant_type"]),
        "redirect_uris": split_by_crlf(form["redirect_uri"]),
        "response_types": split_by_crlf(form["response_type"]),
        "scope": form["scope"],
        "token_endpoint_auth_method": form["token_endpoint_auth_method"]
    }
    client.set_client_metadata(client_metadata)

    if form['token_endpoint_auth_method'] == 'none':
        client.client_secret = ''
    else:
        client.client_secret = gen_salt(48)

    db.session.add(client)
    db.session.commit()
    return redirect('/')


@bp.route('/oauth/authorize', methods=['GET', 'POST'])
def authorize():
    user = current_user()
    # if user log status is not true (Auth server), then to log it in
    if not user:
        return redirect(url_for('website.routes.home', next=request.url))
    if request.method == 'GET':
        try:
            grant = authorization.validate_consent_request(end_user=user)
        except OAuth2Error as error:
            return error.error
        return render_template('authorize.html', user=user, grant=grant)
    if not user and 'username' in request.form:
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()
    if request.form['confirm']:
        grant_user = user
    else:
        grant_user = None
    return authorization.create_authorization_response(grant_user=grant_user)


@bp.route('/oauth/token', methods=['POST'])
def issue_token():
    return authorization.create_token_response()


@bp.route('/oauth/revoke', methods=['POST'])
def revoke_token():
    return authorization.create_endpoint_response('revocation')


@bp.route('/api/me')
@require_oauth('profile')
def api_me():
    user = current_token.user
    return jsonify(id=user.id, username=user.username)

@bp.route('/api/reports/hl7_summary', methods=['GET'])
def hl7_summary():
    results = hl7_summary_report()
    return jsonify(results)

## Interface routs
@bp.route('/api/interface/new_batch', methods=['GET'])
def new_batch():
    create_batch()
    return "Ok"

## claims
@bp.route('/api/claims/billable_claims/<batch_number>', methods=['GET'])
def get_load_billable_claims(batch_number):
    return load_billable_claims(batch_number)

@bp.route('/api/claims/<claim_id>', methods=['GET'])
def get_claim(claim_id):
    return load_claim(claim_id)

@bp.route('/api/rules-engine/rule-boxes', methods=['GET'])
def get_rule_boxes():
    return load_rule_boxes()

@bp.route('/api/rules-engine/my-collections', methods=['GET'])
def get_my_collections():
    return load_my_collections()

@bp.route('/api/rules-engine/get-schema', methods=['GET'])
def get_schema():
    return load_schema()

@bp.route('/api/rules-engine/get-suggesstions', methods=['POST'])
def get_suggestions():
    latest_input_string  = request.json['latest_input_string']
    query_tree = request.json['query_tree']
    return load_suggesstions(query_tree, latest_input_string)

@bp.route('/api/rules-engine/get-action-suggesstions', methods=['POST'])
def get_action_suggestions():
    latest_input_string  = request.json['latest_input_string']
    return load_action_suggesstions(latest_input_string)

@bp.route('/api/rules-engine/test', methods=['POST'])
def get_test_results():
    query_tree = request.json['query_tree']
    latest_input_string = request.json['test_data']
    return test_rule(query_tree, latest_input_string)

@bp.route('/api/bots', methods=['GET'])
def get_bots():
    return load_bots()

@bp.route('/api/schema', methods=['POST'])
def add_schema():
    schema_structure = request.json['schema_structure']
    schema_name = request.json['schema_name']
    schema_description = request.json['schema_description']
    create_schema(schema_name,schema_description,schema_structure)
    return jsonify({"status": "ok"})

@bp.route('/api/schema', methods=['GET'])
def get_all_schemas():
    query = request.args.get('query', default='*', type=str)
    if query == "":
        all_schemas = load_all_schemas()
        return jsonify(all_schemas)
    else:
        schema = get_schema_by_pk(query)
        return jsonify(schema)

@bp.route('/api/schema/attributes', methods=['GET'])
def get_schema_attributes():
    schema = request.args.get('schema', default='*', type=str)
    query = request.args.get('query', default='*', type=str)
    filtered_attributes = get_schema_attributes_by(schema, query)
    print(filtered_attributes)
    return jsonify(filtered_attributes)

@bp.route('/api/schema/value-suggession', methods=['GET'])
def get_value_suggesstions_api():
    schema = request.args.get('schema', default='*', type=str)
    attribute = request.args.get('attribute', default='*', type=str)
    query = request.args.get('query', default='*', type=str)
    filtered_attributes = get_value_suggesstions(schema,attribute, query)
    print(filtered_attributes)
    return jsonify(filtered_attributes)


@bp.route('/api/flags', methods=['GET'])
def get_flags():
    query = request.args.get('query', default='*', type=str)
    filtered_flags = get_flags_by_query(query)
    return jsonify(filtered_flags)

@bp.route('/api/my-contacts', methods=['GET'])
def get_my_contacts():
    query = request.args.get('query', default='*', type=str)
    filtered_flags = get_my_filtered_contacts(query)
    return jsonify(filtered_flags)


def get_all_rules():
    pass


@bp.route('/api/rules', methods=['GET'])
def get_rules():
    query = request.args.get('query', default='*', type=str)
    if query == "":
        all_rules = get_all_rules()
        return jsonify(all_rules)
    else:
        schema = get_rules_by_pk(query)
        return jsonify(schema)