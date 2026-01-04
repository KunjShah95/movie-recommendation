import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import get_settings

def create_database():
    settings = get_settings()
    
    # Connect to the default 'postgres' database to create the new one
    try:
        conn = psycopg2.connect(
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_HOST,
            port=settings.POSTGRES_PORT,
            dbname="postgres"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{settings.POSTGRES_DB}'")
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute(f'CREATE DATABASE {settings.POSTGRES_DB}')
            print(f"Database '{settings.POSTGRES_DB}' created successfully!")
        else:
            print(f"Database '{settings.POSTGRES_DB}' already exists.")
            
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error creating database: {e}")
        print("\nTIP: Make sure your PostgreSQL server is running and the 'postgres' user has the password 'postgres' (as set in your .env).")

if __name__ == "__main__":
    create_database()
