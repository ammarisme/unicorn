from website.app import create_app
import os

app = create_app({
    'SECRET_KEY': 'secret',
    'OAUTH2_REFRESH_TOKEN_GENERATOR': True,
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///db.sqlite',
})

from flask import Flask

if __name__ == '__main__':
    os.environ['AUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run()

# Client Info
#   client_id: vRBHQ9HxQKZEiuxkwj7wlPyQ
#   client_secret: dv7H11otsloZMEltdk6bzllPwBmo7BzQKioWjIsv8eBLaVjv
#   client_id_issued_at: 1654677976
#   client_secret_expires_at: 0
# Client Metadata
#   client_name: ammar
#   client_uri: localhost:5000
#   grant_types: ['authorization_code', 'password']
#   redirect_uris: ['http://localhost:5000']
#   response_types: ['code']
#   scope: profile
#   token_endpoint_auth_method: client_secret_basic