## Development Setup
### Database Setup

If the database user is not the `root` user, that user needs the following additional privileges:

SELECT privilege on the `user_variables_by_thread` table in the `performance_schema` database

SHOW VIEW privilege on the `mysql` database

### IDEA Configuration

If you run the project by opening the Cosmic directory directly, you need to set the `Working directory` to `gms-server` in the server's build configuration.
