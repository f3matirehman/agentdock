import asyncio
from logging.config import fileConfig
from alembic import context
from sqlalchemy import pool, engine_from_config
from sqlalchemy.ext.asyncio import async_engine_from_config

from app.models import Base
from app.core.config import settings

config = context.config
fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
target_metadata = Base.metadata


# Determine if we're in offline mode (used by `alembic revision`)
def run_migrations_offline():
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


# Run sync migrations — used by `alembic revision` and `autogenerate`
def run_sync_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


# Run async migrations — used by `alembic upgrade`
async def run_async_migrations():
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.begin() as connection:
        await connection.run_sync(run_sync_migrations)


def run_migrations():
    if context.is_offline_mode():
        run_migrations_offline()
    elif config.cmd_opts and config.cmd_opts.cmd in ("revision", "check"):  # handle revision safely
        sync_engine = engine_from_config(
            config.get_section(config.config_ini_section),
            prefix="sqlalchemy.",
            poolclass=pool.NullPool,
        )
        with sync_engine.connect() as connection:
            run_sync_migrations(connection)
    else:
        asyncio.run(run_async_migrations())


run_migrations()
