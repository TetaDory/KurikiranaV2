"""Add quantity, units, and min_stock to Post model

Revision ID: 3890354cb1da
Revises: a0ac12680ede
Create Date: 2025-03-24 20:30:45.197110

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3890354cb1da'
down_revision = 'a0ac12680ede'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('unit_price', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('min_stock', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_column('min_stock')
        batch_op.drop_column('unit_price')
        batch_op.drop_column('quantity')

    # ### end Alembic commands ###
